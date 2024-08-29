from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_required, current_user
from ..models.roles import Role
from ..models.user import User
from flask_server import db

user_role_bp = Blueprint('user_role', __name__)

@user_role_bp.route('/assign_role_to_user', methods=['POST'])
@login_required
def assign_role_to_user():
    if not current_user.has_role('Admin') or not current_user.has_role('Super Admin'):
        return jsonify({'error': 'Unauthorized access'}), 403

    data = request.json
    try:
        user_id = data.get('user_id')
        role_id = data.get('role_id')
        if not user_id or not role_id:
            raise ValueError("User ID and Role ID must be provided")

        user = User.query.get(user_id)
        if not user:
            raise ValueError("User not found")

        role = Role.query.get(role_id)
        if not role:
            raise ValueError("Role not found")

        user.roles.append(role)
        db.session.commit()
        return jsonify({'message': 'Role assigned to user'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

