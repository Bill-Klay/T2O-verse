# T2O-verse

# Flask Role Management System

A comprehensive Flask application designed for managing user roles and permissions, featuring secure login, session management, and admin-controlled role assignments. Built with Flask, SQLAlchemy, Flask-Login, Flask-Mail, and Flask-CORS, this project showcases a robust backend infrastructure for web applications requiring granular access control and user management. Flask Secure App is a robust web application built with Flask, designed to demonstrate best practices in web development, including user authentication, CSRF protection, and secure session management. It showcases a modern approach to building secure, scalable web applications with Python's Flask framework, integrating features like user authentication, two-factor authentication (2FA), CSRF protection, and CORS handling for cross-origin requests.

## Features

- **User Authentication**: Secure login and logout functionality with session management.
- **Two-Factor Authentication (2FA)**: Enhances security with OTP-based 2FA for user accounts.
- **CSRF Protection**: Utilizes Flask-WTF for CSRF protection on state-changing requests, ensuring requests are legitimate.
- **CORS Support**: Configured to handle cross-origin requests securely, allowing frontend and backend to communicate seamlessly.
- **Logging**: Comprehensive logging for route access, database queries, and exceptions for monitoring and debugging.
- **Email Notifications**: Sends welcome emails to new users and OTPs for 2FA via Flask-Mail.
- **CSRF Token Management**: Generates and validates CSRF tokens for secure API interactions.
- **Session Management**: Manages user sessions securely, with custom handling for unauthorized access.
- **Environment Configuration**: Supports different configurations for development, testing, and production environments.

## Getting Started

### Prerequisites

- Python 3.6+
- Flask
- Flask-Login for user session management
- Flask-WTF for CSRF protection
- Flask-Mail for email notifications
- Flask-SQLAlchemy for ORM
- Flask-Migrate for database migrations
- Flask-CORS for handling Cross-Origin Resource Sharing
- SQLite3 or any other relational database of choice
  
### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your_username/flask-role-management.git
   cd flask-role-management
   ```

2. Create a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - `FLASK_APP`: Path to your Flask application entry file.
   - `FLASK_ENV`: Set to `development` for development mode.
   - `DATABASE_URL`: Connection string to your database.
   - `SECRET_KEY`: A secret key for Flask session management.
   - `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS`, `MAIL_USERNAME`, `MAIL_PASSWORD`: SMTP settings for Flask-Mail.
   - `YOUR_EMAIL@example.com`: Your email for sending notifications.

5. Initialize the database:
   ```
   flask db init
   flask db migrate
   flask db upgrade
   ```

6. Run the application:
   ```
   flask run
   ```

## Directory Structure

```
/your-flask-app
    /your_flask_app
        __init__.py          # Initializes the Flask app and brings together all components
        /models           # Database models
        /routes          # Route blueprints
            __init__.py   # Registers blueprints
            auth.py      # Authentication routes
        /static         # Static files
        /templates      # HTML templates
    config.py           # Configuration settings
    run.py             # Entry point to run the application
    requirements.txt    # Project dependencies
   .env.sample        # Sample environment variables file
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

### CSRF Token Usage

After login, store the CSRF token and include it in the `X-CSRFToken` header for protected requests:

```javascript
fetch('/protected_endpoint', {
  method: 'POST',
  headers: {
    'X-CSRFToken': sessionStorage.getItem('csrf_token'),
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
```

### Custom Error Handling

The application gracefully handles unauthorized and CSRF validation errors, returning JSON responses for API consumers.

## Configuration

Configure the application through environment variables or a `config.py` file. Key settings include:

- `SECRET_KEY`: Flask's secret key for session management.
- `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`: SMTP settings for Flask-Mail.
- `FLASK_ENV`: Environment setting (development, testing, production).

## Contributing

Contributions are welcome Fork the repository, create a branch, make your changes, and submit a pull request.

## License

Apache 2.0

## Contact

Feel free to reach out for collaborations, suggestions, or just to say hello!

---
