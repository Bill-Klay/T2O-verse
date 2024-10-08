from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.hybrid import hybrid_property
from.roles import Role, Permission
from datetime import datetime
from flask_server import db
import pyotp

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60))
    last_name = db.Column(db.String(60))
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    twofa_secret = db.Column(db.String(60), unique=True, nullable=True)
    twofa_enabled = db.Column(db.Boolean, nullable=False, default=False)
    stripe_customer_id = db.Column(db.String(60), nullable=True)
    verified = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Many-to-many relationship with Role
    roles = db.relationship('Role', secondary='user_roles', backref=db.backref('users', lazy='dynamic'))

    def has_role(self, *roles):
        return not set(role.name for role in self.roles).isdisjoint(set(roles))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_totp_uri(self):
        return pyotp.totp.TOTP(self.twofa_secret).provisioning_uri(self.email, issuer_name="T2Overse")

    def verify_totp(self, token):
        return pyotp.TOTP(self.twofa_secret).verify(token)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'
    
    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return True

    def is_active(self):
        """Return True if this is an active user."""
        return True

    def is_anonymous(self):
        """Return True if this is an anonymous user."""
        return False

    def get_id(self):
        """Return the user's ID."""
        return str(self.id)

    def update_twofa(self, enabled, token):
        """
        Enable or disable 2FA for the user.
        :param enabled: Boolean indicating whether to enable 2FA.
        """
        if token and self.verify_totp(token):
            if enabled:
                # Enable 2FA
                self.twofa_enabled = True
            else:
                # Disable 2FA
                self.twofa_secret = None
                self.twofa_enabled = False
            db.session.commit()
            return True
        else:
            # Token is invalid or not provided
            return False
    
    def fetch_twofa_uri(self):
        # Generate a new secret if 2FA is being enabled
        self.twofa_secret = pyotp.random_base32()
        db.session.commit()
        return self.get_totp_uri()

    def user_to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'twofa_enabled': self.twofa_enabled,
            'roles': [role.name for role in self.roles]  # Assuming Role model has a name attribute
        }
        
# Association table for the many-to-many relationship between users and roles
user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id', name='fk_user_roles_user'), primary_key=True),
    db.Column('role_id', db.Integer(), db.ForeignKey('roles.id', name='fk_user_roles_role'), primary_key=True)
)