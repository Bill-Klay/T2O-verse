from flask_server import create_app, db  # Ensure this import matches your application structure

app = create_app()

def initialize_database():
    with app[0].app_context():
        from sqlalchemy.exc import IntegrityError, OperationalError
        from flask_server.models.roles import Role, Permission
        from flask_server.models.user import User
        from flask import current_app

        try:
            # Empty User, Role, and Permission table
            Permission.query.delete()
            Role.query.delete()
            User.query.delete()
            print("User permission and roles tables truncated.")
            
            # Create admin role
            admin_role = Role(name='Super Admin')
            db.session.add(admin_role)
            
            # Create super admin role
            super_admin_role = Role(name='Admin')
            db.session.add(super_admin_role)

            # Add permissions to roles
            admin_permissions = [
                Permission(name='view_dashboard', role_id=2),
                Permission(name='manage_users', role_id=2),
                Permission(name='view_reports', role_id=2),
                Permission(name='edit', role_id=2)
            ]
            super_admin_permissions = [
                Permission(name='view_dashboard', role_id=1),
                Permission(name='manage_users', role_id=1),
                Permission(name='view_reports', role_id=1),
                Permission(name='manage_settings', role_id=1),
                Permission(name='access_logs', role_id=1),
                Permission(name='manage_admin', role_id=1),
                Permission(name='edit', role_id=1)
            ]

            for permission in admin_permissions:
                db.session.add(permission)
                admin_role.permissions.append(permission)
            
            for permission in super_admin_permissions:
                db.session.add(permission)
                super_admin_role.permissions.append(permission)

            # Create admin and super admin users
            admin_user = User(first_name="admin", last_name="admin", username="admin", email="admin@example.com", password="SecureP@ssw0rd")  # Default password
            db.session.add(admin_user)

            super_admin_user = User(first_name="super", last_name="admin", username="superadmin", email="superadmin@example.com", password="SecureP@ssw0rd")
            db.session.add(super_admin_user)

            # Create user and role association
            admin_user.roles.append(admin_role)
            super_admin_user.roles.append(super_admin_role)

            db.session.commit()

        except IntegrityError as ie:
            current_app.logger.warning(f"Database integrity error occurred: {str(ie)}")
            print("Warning: Database integrity error occurred. Skipping user creation.")

        except OperationalError as oe:
            current_app.logger.error(f"Database operational error occurred: {str(oe)}")
            print("Error: Database operational error occurred. Skipping user creation.")

        except Exception as e:
            current_app.logger.exception(f"Unexpected error occurred during initial user creation: {str(e)}")
            print(f"Error: An unexpected error occurred during initial user creation. Skipping user creation.")

        finally:
            db.session.remove()

if __name__ == '__main__':
    initialize_database()
