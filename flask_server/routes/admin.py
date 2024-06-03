from flask import Blueprint, request, jsonify
from flask_server.models.roles import Role, Permission
from flask_server import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/create_role', methods=['POST'])
def create_role():
    data = request.json
    new_role = Role(name=data['name'])
    db.session.add(new_role)
    db.session.commit()
    return jsonify({'message': 'New role created'}), 201

@admin_bp.route('/assign_permission_to_role', methods=['POST'])
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
