import logging
from flask import Flask, has_request_context, request
from flask.logging import default_handler
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager
from.config import get_logging_config
from logging.handlers import SMTPHandler

db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()
logger = logging.getLogger(__name__)

@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in upon page load."""
    from.models.user import User
    return User.query.get(user_id)

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

    # Register blueprints here
    with app.app_context():
        # Import parts of our application
        from .routes import init_routes
        init_routes(app)

    return app
