from.auth import auth_bp
from.home import home_bp
from.admin import admin_bp
from.user_roles import user_role_bp
from.board import board_bp
from.stripe import stripe_bp

def init_routes(app):
    app.register_blueprint(auth_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(user_role_bp)
    app.register_blueprint(board_bp)
    app.register_blueprint(stripe_bp)
    # Register other blueprints here
