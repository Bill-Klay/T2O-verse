from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail
from flask_login import LoginManager

db = SQLAlchemy()
mail = Mail()
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in upon page load."""
    print(f"Loading-user: {user_id}")
    from.models.user import User
    return User.query.get(user_id)

def create_app():
    app = Flask(__name__)
    
    # Load configurations
    app.config.from_pyfile('config.py')
    CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})

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
