from flask import Flask
from.routes.login import home_bp
from flask_sqlalchemy import SQLAlchemy
# from.models.user import User

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # Load configurations
    app.config.from_pyfile('config.py')
    
    db.init_app(app)

    # Register blueprints here
    app.register_blueprint(home_bp)
    
    return app
