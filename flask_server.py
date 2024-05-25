"""
Author: bILAL kHAN
Date: 26th of May 2024
Update: 26th of May 2024
Purpose: A Flask-RESTx application for managing user authentication through login and signup operations.
PEP Standards Followed: PEP-8 for code formatting and style, PEP-484 for type hinting, PEP-257 for docstring conventions.
Core Python Modules Used: Flask, flask_restx, werkzeug, tinydb, re
"""

from typing import Any, Dict, List
from flask import Flask, request
from flask_restx import Api, Resource, fields
from werkzeug.security import generate_password_hash, check_password_hash
from tinydb import TinyDB, Query
import re
from flask import session

app = Flask(__name__)
api = Api(app, version='1.0', title='User Authentication API',
          description='A simple User Authentication API',
          doc='/docs')

# App session management using server file system
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'

# Define the model for our users
ns = api.namespace('users', description='Operations related to users')
user_model = ns.model('User', {
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})

# Initialize TinyDB
db = TinyDB('db.json')
User = Query()

def is_strong_password(password: str) -> bool:
    """
    Check if the password meets the strong password criteria.

    Args:
        password (str): The password to validate.

    Returns:
        bool: True if the password meets the criteria, False otherwise.
    """
    # Regex pattern for strong password
    pattern = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$"
    return bool(re.match(pattern, password))

@ns.route('/')
class UserList(Resource):
    @ns.marshal_list_with(user_model)
    def get(self) -> List[Dict[str, Any]]:
        """Returns all users."""
        return db.all()

    @ns.expect(user_model)
    @ns.marshal_with(user_model, code=201)
    def post(self) -> Dict[str, Any]:
        """Creates a new user."""
        data = request.get_json()
        if not is_strong_password(data['password']):
            ns.abort(400, message="Password does not meet the required strength.")
        
        hashed_password = generate_password_hash(data['password'])
        data['password'] = hashed_password
        db.insert(data)
        return data, 201

@ns.route('/<string:email>')
@ns.param('email', 'The user identifier')
@ns.response(404, 'User not found')
class UserItem(Resource):
    @ns.marshal_with(user_model)
    def get(self, email: str) -> Dict[str, Any]:
        """Fetch a given resource"""
        result = db.search(User.email == email)
        if not result:
            ns.abort(404, message=f"User {email} doesn't exist")
        return result[0]

auth_ns = api.namespace('auth', description='Authentication Operations')

login_parser = api.parser()
login_parser.add_argument('email', type=str, required=True, help='Email address of the user.')
login_parser.add_argument('password', type=str, required=True, help='Password of the user.')

# Login class
@api.expect(login_parser)
@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.doc(responses={200: 'Success', 401: 'Unauthorized'})
    def post(self) -> Dict[str, Any]:
        """Handles user login.

        Returns:
            dict: A dictionary containing a message indicating the outcome of the login attempt.
            int: HTTP status code corresponding to the response.
        """
        args = login_parser.parse_args()
        email = args['email']
        password = args['password']

        # Search for the user in the database
        user = db.search(User.email == email)

        if not user:
            return {'message': 'Invalid credentials'}, 401

        user = user[0]
        if not check_password_hash(user['password'], password):
            return {'message': 'Invalid credentials'}, 401

        # Set session variables
        session['logged_in'] = True
        session['user_email'] = user['email']

        return {'message': 'Login successful'}, 200

# Add a Logout route
logout_parser = api.parser()
logout_parser.add_argument('user_email', type=str, required=True, help='Email address of the user to be logged out.')

@api.expect(logout_parser)
@auth_ns.route('/logout')
class Logout(Resource):
    @auth_ns.doc(responses={200: 'Success', 401: 'Unauthorized'})
    def post(self) -> Dict[str, Any]:
        """Handles user logout.

        Returns:
            dict: A dictionary containing a message indicating the outcome of the logout attempt.
            int: HTTP status code corresponding to the response.
        """
        args = logout_parser.parse_args()
        user_email = args['user_email']

        if 'logged_in' not in session or not session['logged_in']:
            return {'message': 'Not logged in'}, 401

        if session['user_email']!= user_email:
            return {'message': 'Unauthorized'}, 401

        # Clear the session
        session.clear()

        return {'message': 'Logout successful'}, 200

if __name__ == '__main__':
    app.run(debug=True)
