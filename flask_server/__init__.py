import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager, login_required
from.config import get_logging_config
from flask_wtf.csrf import generate_csrf, validate_csrf

db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in upon page load."""
    from.models.user import User
    return User.query.get(user_id)

@login_manager.unauthorized_handler
def unauthorized():
    print("Invalid access... please log in")
    return jsonify(success=False, message="Please log in to access this resource."), 401

def get_client_ip(request):
    if 'X-Forwarded-For' in request.headers:
        # Assuming the first IP is the client's IP, but this may vary
        client_ip = request.headers['X-Forwarded-For'].split(',')[0].strip()
    else:
        client_ip = request.remote_addr
    return client_ip

def create_app():
    app = Flask(__name__)

    # Load configurations
    app.config.from_pyfile('config.py')
    allowed_origins = [
        'http://localhost:3000',
        'http://192.168.100.236:3000'
    ]
    CORS(app, resources={r'*': {'origins': allowed_origins, 'supports_credentials': True, 'allow_headers': ['Content-Type', 'X-CSRFToken']}})
    logging_config = get_logging_config(app.config['ENV'])
    logging.basicConfig(
        level=getattr(logging, logging_config['level'].upper()),
        # filename=logging_config['file'],
        format=logging_config['format'],
        datefmt='%Y-%m-%d %H:%M:%S',
        # filemode=logging_config['filemode'],
        force=True  # Reconfigure logging if called multiple times
    )

    db.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)  # Initialize Flask-Mail
    migrate = Migrate(app, db)

    @app.route('/get_csrf_token', methods=['GET'])
    @login_required
    def get_csrf_token():
        return jsonify(csrf_token=generate_csrf())

    # Route access logs
    if logging_config['log_route_access']:
        @app.before_request
        def log_request_info():
            # CSRF verification
            if request.method in ['POST', 'PUT', 'DELETE', 'PATCH']:
                skip_csrf_check = request.endpoint in app.config.get('CSRF_EXEMPT_ENDPOINTS', [])
                if not skip_csrf_check:
                    try:
                        validate_csrf(request.headers.get('X-CSRFToken'))
                    except Exception as e:
                        app.logger.warning(f"CSRF validation failed for endpoint {request.endpoint}: {str(e)}")
                        return jsonify(success=False, message='CSRF token validation failed'), 403
            # Pre route logging
            # Skip logging for static files or CSRF token generation
            # if request.path.startswith('/static') or request.path == '/get_csrf_token':
            #     return
            client_ip = get_client_ip(request)
            user_agent = request.headers.get('User-Agent', 'Unknown')
            log_message = f"Before Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}"

            # Insert log entry into the database
            new_log_entry = LogEntry(log_level='INFO', message=log_message, client_ip=client_ip, user_agent=user_agent)
            db.session.add(new_log_entry)
            db.session.commit()

            app.logger.info(log_message)

        @app.after_request
        def log_response_info(response):
            client_ip = get_client_ip(request)
            user_agent = request.headers.get('User-Agent', 'Unknown')
            log_message = f"After Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}"
            new_log_entry = LogEntry(log_level='INFO', message=log_message, client_ip=client_ip, user_agent=user_agent)
            db.session.add(new_log_entry)
            db.session.commit()
            app.logger.info(log_message)
            return response

        @app.errorhandler(Exception)
        def log_exceptions(e):
            client_ip = get_client_ip(request)
            user_agent = request.headers.get('User-Agent', 'Unknown')
            log_message = f'Unhandled error: {e} - Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}'
            new_log_entry = LogEntry(log_level='INFO', message=log_message, client_ip=client_ip, user_agent=user_agent)
            db.session.add(new_log_entry)
            db.session.commit()
            app.logger.error(f'Unhandled error: {e} - Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}', exc_info=e)
            return jsonify(success=False, message="Oops, somehting went wrong"), 500

    # Database ORM events log
    if logging_config['log_database_queries']:
        def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
            app.logger.info(f"Start Query:\n{statement}\nwith {parameters}")
        
        def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
            app.logger.info("Query Complete")

    # Add SMTPHandler for mailing critical logs
    if logging_config.get('smtp_handler'):
        smtp_handler = logging.handlers.SMTPHandler(
            mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
            fromaddr=app.config['MAIL_USERNAME'],
            toaddrs=logging_config['smtp_handler']['to_addrs'],
            subject='[Critical] Your Application Error',
            credentials=(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD']),
            secure=() if app.config['MAIL_USE_TLS'] else None,
        )
        smtp_handler.setLevel(logging.CRITICAL)
        app.logger.addHandler(smtp_handler)

    # Register blueprints here
    with app.app_context():
        from.models.logs import LogEntry
        # Event listener for query logging
        if logging_config['log_database_queries']:
            event.listens_for(db.engine, "before_cursor_execute")(before_cursor_execute)
            event.listens_for(db.engine, "after_cursor_execute")(after_cursor_execute)

        # Import parts of our application
        from .routes import init_routes
        init_routes(app)

    return app
