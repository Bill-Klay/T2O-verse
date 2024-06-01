from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Load configurations
    app.config.from_pyfile('config.py')
    CORS(app, resources={r'*': {'origins': 'http://localhost:3000'}})

    db.init_app(app)
    migrate = Migrate(app, db)

    # Register blueprints here
    with app.app_context():
        # Import parts of our application
        from.routes import init_routes
        init_routes(app)

    return app
