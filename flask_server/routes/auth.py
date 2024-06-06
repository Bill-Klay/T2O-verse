from flask import Blueprint, request, jsonify, session, redirect, url_for
from flask_server.models.user import User
from flask_server import db, mail
from flask_mail import Message
from flask_login import login_user, logout_user,login_required, current_user
import re

auth_bp = Blueprint('auth', __name__)

def is_valid_password(password):
    """
    Check if password meets certain criteria:
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    - At least one special character
    - Minimum length of 8 characters
    """
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$"
    return bool(re.match(pattern, password))

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not is_valid_password(password):
        return jsonify(success=False, message='Password does not meet the criteria'), 400
    
    # Check if the username or email already exists
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        if existing_user.username == username:
            return jsonify(success=False, message='Username already exists'), 409
        if existing_user.email == email:
            return jsonify(success=False, message='Email already exists'), 409

    user = User(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    # Send welcome email
    msg = Message("Welcome to Our Service!",
                  sender="your_email@example.com",
                  recipients=[email])
    msg.body = f"Hello {first_name},\n\nThank you for signing up with our service. We are excited to have you on board!"
    mail.send(msg)

    return jsonify(success=True, message='Account created successfully'), 201

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_or_email = request.form['username_or_email']
        password = request.form['password']
        token = request.form.get('token')  # OTP from the user

        user = User.query.filter((User.username == username_or_email) | (User.email == username_or_email)).first()
        
        if user and user.verify_password(password):
            if user.twofa_enabled:
                if token is None or not user.verify_totp(token):
                    # Optionally send OTP via email
                    msg = Message("Your OTP", sender="your_email@example.com", recipients=[user.email])
                    msg.body = f"Your OTP is: {pyotp.TOTP(user.twofa_secret).now()}"
                    mail.send(msg)
                    return jsonify(success=False, message='2FA token required'), 400
                else:
                    # session['user_id'] = user.id
                    login_user(user)
                    return jsonify(success=True, message='Login successful'), 200
            else:
                # session['user_id'] = user.id
                login_user(user)
                return jsonify(success=True, message='Login successful'), 200
        else:
            return jsonify(success=False, message='Invalid credentials'), 401
    else:
        # Redirect to login page or handle GET request differently
        pass  # Implement rendering the login form here

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(success=True, message='Logout successful'), 200

@auth_bp.route('/check_auth_status')
def check_auth_status():
    # Use current_user instead of user
    if current_user.is_authenticated:
        print(current_user.is_authenticated)
        print(f"Logged in user: {current_user.username}")
        return jsonify(success=True, message='User is currently logged in')
    else:
        print("No user is logged in.")
        return jsonify(success=False, message='User is not logged in')
