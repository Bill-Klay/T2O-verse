import logging
from flask import Flask, has_request_context, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from.config import get_logging_config

db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in upon page load."""
    from.models.user import User
    return User.query.get(user_id)

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
    CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})
    logging_config = get_logging_config(app.config['ENV'])
    logging.basicConfig(
        level=getattr(logging, logging_config['level'].upper()),
        filename=logging_config['file'],
        format=logging_config['format'],
        datefmt='%Y-%m-%d %H:%M:%S',
        filemode=logging_config['filemode'],
        force=True  # Reconfigure logging if called multiple times
    )

    db.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)  # Initialize Flask-Mail
    migrate = Migrate(app, db)

    # Route access logs
    if logging_config['log_route_access']:
        @app.before_request
        def log_request_info():
            client_ip = get_client_ip(request)
            user_agent = request.headers.get('User-Agent', 'Unknown')
            app.logger.info(f"Before Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}")

        @app.after_request
        def log_response_info(response):
            client_ip = get_client_ip(request)
            user_agent = request.headers.get('User-Agent', 'Unknown')
            app.logger.info(f"Before Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}")
            return response

        @app.errorhandler(Exception)
        def log_exceptions(e):
            client_ip = get_client_ip(request)
            user_agent = request.headers.get('User-Agent', 'Unknown')
            app.logger.error(f'Unhandled error: {e} - Request: {request.method} {request.url} - Client IP: {client_ip} - User Agent: {user_agent}', exc_info=e)
            return "Oops Something went wrong.", 500

    # Database ORM events log
    if logging_config['log_database_queries']:
        def before_cursor_execute(conn, cursor, statement, parameters, context, executemany):
            app.logger.info(f"Start Query:\n{statement}\nwith {parameters}")
        
        def after_cursor_execute(conn, cursor, statement, parameters, context, executemany):
            app.logger.info("Query Complete")

    # Register blueprints here
    with app.app_context():
        # Event listener for query logging
        if logging_config['log_database_queries']:
            event.listens_for(db.engine, "before_cursor_execute")(before_cursor_execute)
            event.listens_for(db.engine, "after_cursor_execute")(after_cursor_execute)

        # Import parts of our application
        from .routes import init_routes
        init_routes(app)

    return app
