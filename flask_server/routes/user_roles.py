from flask import Blueprint, request, jsonify
from.models import User, Role
from flask_server import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/assign_role_to_user', methods=['POST'])
def assign_role_to_user():
    data = request.json
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    role = Role.query.get(data['role_id'])
    if not role:
        return jsonify({'error': 'Role not found'}), 404
    
    user.roles.append(role)
    db.session.commit()
    return jsonify({'message': 'Role assigned to user'}), 200
