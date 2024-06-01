from flask import Blueprint, request, jsonify, session, redirect, url_for
from flask_server.models.user import User
from flask_server import db
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
    
    user = User(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify(success=True, message='Account created successfully'), 201

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_or_email = request.form['username_or_email']
        password = request.form['password']

        user = User.query.filter_by(username=username_or_email).first() or \
               User.query.filter_by(email=username_or_email).first()
        
        if user and user.verify_password(password):
            session['user_id'] = user.id
            return jsonify(success=True, message='Login successful'), 200
        else:
            return jsonify(success=False, message='Invalid credentials'), 401
    else:
        # Redirect to login page or handle GET request differently
        pass  # Implement rendering the login form here
