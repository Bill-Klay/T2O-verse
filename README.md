# T2O-verse

# Flask Role Management System

A comprehensive Flask application designed for managing user roles and permissions, featuring secure login, session management, and admin-controlled role assignments. Built with Flask, SQLAlchemy, Flask-Login, Flask-Mail, and Flask-CORS, this project showcases a robust backend infrastructure for web applications requiring granular access control and user management.

## Features

- **User Authentication**: Secure login and logout functionality with two-factor authentication (2FA) support.
- **Role-Based Access Control**: Manage roles and permissions dynamically, assigning roles to users through an admin panel.
- **Session Management**: Utilizes Flask-Login for maintaining user sessions and protecting routes.
- **Admin Panel**: Dedicated section for administrators to manage roles and permissions.
- **Email Notifications**: Sends welcome emails to new users and OTPs for 2FA via Flask-Mail.
- **Cross-Origin Resource Sharing (CORS)**: Configured to work seamlessly with frontend frameworks hosted on different domains.

## Getting Started

### Prerequisites

- Python 3.x
- PostgreSQL (or another compatible database supported by SQLAlchemy)
- Node.js (for frontend development, optional)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your_username/flask-role-management.git
   cd flask-role-management
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - `FLASK_APP`: Path to your Flask application entry file.
   - `FLASK_ENV`: Set to `development` for development mode.
   - `DATABASE_URL`: Connection string to your database.
   - `SECRET_KEY`: A secret key for Flask session management.
   - `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS`, `MAIL_USERNAME`, `MAIL_PASSWORD`: SMTP settings for Flask-Mail.
   - `YOUR_EMAIL@example.com`: Your email for sending notifications.

4. Initialize the database:
   ```
   flask db upgrade
   ```

5. Run the application:
   ```
   flask run
   ```

## Usage

### Endpoints

- **Signup**: `/signup`
  - Method: `POST`
  - Payload: `{ "first_name": "John", "last_name": "Doe", "username": "johndoe", "email": "john.doe@example.com", "password": "securepassword" }`
  - Response: Success message and status code `201` on successful registration.

- **Login**: `/login`
  - Method: `POST`
  - Payload: `{ "username_or_email": "johndoe", "password": "securepassword", "token": "optional_otp_token" }`
  - Response: Success message and status code `200` on successful login.

- **Assign Role to User**: `/assign_role_to_user` (Protected, requires admin role)
  - Method: `POST`
  - Payload: `{ "user_id": 1, "role_id": 1 }`
  - Response: Confirmation message and status code `200` on successful role assignment.

### Admin Panel

Access the admin panel to manage roles and permissions. Protected routes require authentication and admin privileges.

## Contributing

Contributions are welcome Fork the repository, create a branch, make your changes, and submit a pull request.

## License

Apache 2.0

## Contact

Feel free to reach out for collaborations, suggestions, or just to say hello!

---
