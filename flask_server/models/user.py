from werkzeug.security import generate_password_hash, check_password_hash
from flask_server import db
import pyotp

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(60))
    last_name = db.Column(db.String(60))
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    twofa_secret = db.Column(db.String(60), unique=True, nullable=True)  # Allow null for users without 2FA
    twofa_enabled = db.Column(db.Boolean, nullable=False, default=False)

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
