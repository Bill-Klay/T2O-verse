from flask import Blueprint, request, jsonify
from flask_server.models.roles import Role, Permission
from flask_server.models.user import User
from flask_server import db
from flask_login import login_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/roles', methods=['GET'])
@login_required
def get_roles():
    roles = Role.query.all()
    roles_list = [{"id": role.id, "name": role.name} for role in roles]
    return jsonify({'roles': roles_list}), 200

@admin_bp.route('/permissions', methods=['GET'])
@login_required
def get_permissions():
    permissions = Permission.query.all()
    permissions_list = [{"id": permission.id, "name": permission.name} for permission in permissions]
    return jsonify({'permissions': permissions_list}), 200

@admin_bp.route('/create_role', methods=['POST'])
@login_required
def create_role():
    data = request.json
    new_role = Role(name=data['name'])
    db.session.add(new_role)
    db.session.commit()
    return jsonify({'message': 'New role created'}), 201

@admin_bp.route('/assign_permission_to_role', methods=['POST'])
@login_required
def assign_permission_to_role():
    data = request.json
    permission = Permission.query.filter_by(name=data['permission_name']).first()
    if not permission:
        return jsonify({'error': 'Permission does not exist'}), 404
    
    role = Role.query.filter_by(name=data['role_name']).first()
    if not role:
        return jsonify({'error': 'Role does not exist'}), 404
    
    role.permissions.append(permission)
    db.session.commit()
    return jsonify({'message': 'Permission assigned to role'}), 200

@admin_bp.route('/create_permission', methods=['POST'])
@login_required
def create_permission():
    data = request.json
    permission_name = data.get('name')
    if not permission_name:
        return jsonify({'error': 'Permission name is required'}), 400

    existing_permission = Permission.query.filter_by(name=permission_name).first()
    if existing_permission:
        return jsonify({'error': f'Permission "{permission_name}" already exists'}), 409

    new_permission = Permission(name=permission_name)
    db.session.add(new_permission)
    db.session.commit()
    return jsonify({'message': f'Permission "{permission_name}" created successfully'}), 201

@admin_bp.route('/users/details', methods=['GET'])
@login_required
def get_all_user_details():
    users = User.query.all()
    user_details = [{"id": user.id, "first_name": user.first_name, "last_name": user.last_name, "username": user.username, "email": user.email} for user in users]
    return jsonify({'users': user_details}), 200
