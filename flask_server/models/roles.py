from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.orm import relationship
from flask_server import db

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)

    # Relationship to permissions
    permissions = relationship("Permission", back_populates="role")

class Permission(db.Model):
    __tablename__ = 'permissions'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)
    role_id = db.Column(db.Integer(), ForeignKey('roles.id', name='fk_permissions_role'))

    # Relationship to role
    role = relationship("Role", back_populates="permissions")
