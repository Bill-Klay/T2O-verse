from flask import Blueprint, request, jsonify
from flask_server import db
from flask_server.models.logs import LogEntry
from flask_server.models.user import User
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_required, current_user

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def index():
    return jsonify(message="Hello Friend!")

@home_bp.route('/logs', methods=['GET'])
@login_required
def get_logs():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)  # Limit max items per page

    # Calculate offsets for pagination
    offset = (page - 1) * per_page

    # Check if the user is an admin
    if current_user.has_role('Admin'):
        query = LogEntry.query
    else:
        query = LogEntry.query.filter_by(user_email=current_user.email)

    # Query the database with offset and limit for pagination
    paginated_logs = query.offset(offset).limit(per_page).all()

    # Calculate total items for pagination
    total_items = query.count()
    total_pages = (total_items - 1) // per_page + 1

    logs_data = [log.to_dict() for log in paginated_logs]

    return jsonify(logs=logs_data, total_pages=total_pages, current_page=page)

@home_bp.route('/current_user_details', methods=['GET'])
@login_required
def current_user_details():
    return jsonify(success=True, message=current_user.user_to_dict()), 200

@home_bp.route('/update_profile', methods=['POST'])
@login_required
def update_profile():
    data = request.get_json()
    
    # Extract user ID from the request
    user_id = data.get('user_id')
    
    # Fetch the user based on the provided user ID
    user = User.query.filter_by(id=user_id).first()
    
    # Check if the user exists
    if not user:
        return jsonify({"error": "User not found."}), 404
    
    # Extract updated fields from the request
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    # Validate input (you may add more comprehensive validation as needed)
    if not first_name or not last_name or not email or not username:
        return jsonify({"error": "First name, last name, username, and email are required."}), 400

    # Check if email or username is already taken by another user
    existing_user_email = User.query.filter(User.email == email, User.id != user.id).first()
    existing_username = User.query.filter(User.username == username, User.id != user.id).first()  # Ensure uniqueness
    if existing_user_email:
        return jsonify({"error": "Email already in use."}), 400
    if existing_username:
        return jsonify({"error": "Username already exists."}), 400

    # Update user details
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.username = username

    # Update password if provided
    if password:
        user.password = password

    db.session.commit()

    return jsonify({"success": True, "message": "Profile updated successfully."}), 200

@home_bp.route('/all_user_profiles', methods=['GET'])
@login_required
def all_user_profiles():
    if not current_user.has_role('Admin'):
        return jsonify({'error': 'Unauthorized access'}), 403
    # Query the database for all users
    users = User.query.all()
    
    # Serialize user data
    user_data_list = []
    for user in users:
        user_data_list.append(user.user_to_dict())
    
    # Return serialized user data as JSON
    return jsonify(success=True, message=user_data_list), 200
