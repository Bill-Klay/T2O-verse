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
def get_logs():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)  # Limit max items per page
    # Calculate offsets for pagination
    offset = (page - 1) * per_page

    # Query the database with offset and limit for pagination
    paginated_logs = LogEntry.query.offset(offset).limit(per_page).all()

    # Optionally, calculate total pages if needed
    total_items = LogEntry.query.count()
    total_pages = (total_items - 1) // per_page + 1

    logs_data = [log.to_dict() for log in paginated_logs]

    return jsonify(logs=logs_data, total_pages=total_pages, current_page=page)

@home_bp.route('/current_user_details', methods=['GET'])
@login_required
def current_user_details():
    return jsonify(success=True, message=current_user.user_to_dict()), 200
