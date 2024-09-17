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
   git clone https://github.com/Bill-Klay/T2O-verse.git
   cd T2O-verse
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

##### The deploy script takes care of the following steps for you. Please adjust the environment variables prior to execution

```
chmod +x deploy
./deploy
```

4. Set up environment variables:
   - `FLASK_APP`: Path to your Flask application entry file.
   - `FLASK_ENV`: Set to `development` for development mode.
   - `DATABASE_URL`: Connection string to your database.
   - `SECRET_KEY`: A secret key for Flask session management.
   - `MAIL_SERVER`, `MAIL_PORT`, `MAIL_USE_TLS`, `MAIL_USERNAME`, `MAIL_PASSWORD`: SMTP settings for Flask-Mail.
   - `YOUR_EMAIL@example.com`: Your email for sending notifications.
   - `SESSION_COOKIE`: User session cookies
   - `STRIPE_KEY`: Stripe account API keys

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
    app_run.py             # Entry point to run the application
    deploy              # Deploy and execution script Linux
    deploy.bat          # Deploy and execution script Windows
    requirements.txt    # Project dependencies
   .env.sample        # Sample environment variables file (not required)
```

## Usage

### Endpoints

#### Signup Routes

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

- **Update 2FA Settings**: `/update_twofa`
  - Method: `POST`
  - Payload: json { "enabled": true, "token": "123456" }
  - Response: json { "success": true, "message": "2FA updated successfully" }

- **Get 2FA URI**: `/twofa_uri`
  - Method: `GET`
  - Response: json { "success": true, "message": "2FA confirmation", "uri": "otpauth://totp/YourAppName:johndoe?secret=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&issuer=YourAppName" }

- **Logout User**: `/logout`
  - Method: `GET`
  - Response: json { "success": true, "message": "Logout successful" }

- **Check Login Status**: `/check_auth_status`
  - Method: `GET`
  - Response: json { "success": true, "message": "User is currently logged in" }

- **Request Password Reset**: `/forgot_password`
  - Method: `POST`
  - Payload: json { "email": "john.doe@example.com" }
  - Response: json { "success": true, "message": "Password reset email sent" }

- **Reset User Password**: `/reset_password/<token>`
  - Method: `POST`
  - Payload: json { "email": "john.doe@example.com", "password": "newsecurepassword" }
  - Response: json { "success": true, "message": "Password has been reset" }
  - Status Code: - Status Code: `200` on successful password reset

#### Admin Routes

- **Get All Roles**: `/admin/roles`
  - Method: `GET`
  - Response: JSON array of role objects, status code `200`
  - Example Response: json { "roles": [ {"id": 1, "name": "Admin"}, {"id": 2, "name": "Moderator"}, {"id": 3, "name": "User"} ] }

- **Create New Role**: `/admin/create_role`
  - Method: `POST`
  - Payload: `{ "name": "NewRoleName" }`
  - Response: Success message, status code `201` on successful creation
  - Example Request: json { "name": "NewRoleName" }

- **Get All Permissions**: `/admin/permissions`
  - Method: `GET`
  - Response: JSON array of permission objects, status code `200`
  - Example Response: json { "permissions": [ {"id": 1, "name": "Create Post"}, {"id": 2, "name": "Edit Post"}, {"id": 3, "name": "Delete Post"} ] }

- **Assign Permission**: `/admin/assign_permission_to_role`
  - Method: `POST`
  - Payload: `{ "permission_name": "PermissionName", "role_name": "RoleName" }`
  - Response: Success message, status code `200` on successful assignment
  - Example Request: json { "permission_name": "Create Post", "role_name": "Admin" }
  - Example Response: json { "message": "Permission assigned to role" }

- **Create New Permission**: `/admin/create_permission`
  - Method: `POST`
  - Payload: `{ "name": "NewPermissionName" }`
  - Response: Success message, status code `201` on successful creation
  - Example Request: json { "name": "NewPermissionName" }
  - Example Response: json { "message": "Permission "NewPermissionName" created successfully" }

- **Get All Users**: `/admin/users/details`
  - Method: `GET`
  - Response: JSON array of user objects, status code `200`
  - Example Response: json { "users": [ {"id": 1, "first_name": "John", "last_name": "Doe", "username": "johndoe", "email": "john@example.com"}, {"id": 2, "first_name": "Jane", "last_name": "Smith", "username": "jsmith", "email": "jane@example.com"} ] }

- **Delete Permission**: `/admin/delete_permission`
  - Method: `DELETE`
  - Payload: `{ "permission_id": 1 }`
  - Response: Success message, status code `200` on successful deletion
  - Example Request: json { "permission_id": 1 }
  - Example Response: json { "message": "Permission deleted successfully" }

- **Delete Role**: `/admin/delete_role`
  - Method: `DELETE`
  - Payload: `{ "role_id": 1 }`
  - Response: Success message, status code `200` on successful deletion
  - Example Request: json { "role_id": 1 }
  - Example Response: json { "message": "Role deleted successfully" }

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
- `SESSION_COOKIE`: User session cookies
- `STRIPE_KEY`: Stripe account API keys

# Boiler-Plate Components On NextJS

A Front-End designed for the Flask Role Management System. The application allows for secure Login, Signup, Profile/User Management, Kanban Board, Log Tables (Some features may be restricted to the role of Admin).The Front-End application is built using [NextJs](https://nextjs.org/), [TailwindCss](https://tailwindcss.com/), along with additional libraries to assist with the application features.

## Features

- User Authentication
- Two-Factor Authentication
- Profile Interface
- Log Table Interface
- Kanban Board
- Profile/Users Update Interface
- Role Management (Admin only)

## Getting Started

### Pre-Requisites

> [NodeJs](https://nodejs.org/en)
>
> [Git](https://git-scm.com/)

### Installation

1. Clone Repository:

   ```
   git clone https://github.com/Bill-Klay/T2O-verse.git
   cd T2O-verse
   ```

2. Switch to Branch _next-client_:

   ```
   cd next-client
   ```

3. Install Dependencies:
   ```
   npm install
   ```
4. Add Server Url For API Calls:

   > Create a **lib** folder in **next-client** folder.
   >
   > In the **lib** folder create a file **Constants.ts**
   >
   > In the file created add: export const base_url = "url_of_server"

5. Run Application:
   ```
   npm run dev
   ```

## Project Structure

```
- */next_client*: The main client-side application built with Next.js.

  - */app*: Contains the main application logic and components.
  
    - *(Auth)*: Handles authentication-related components and logic.
      - */Login*: Component for user login functionality.
      - */Signup*: Component for user registration.
      - */TwoFA*: Component for two-factor authentication.
      - */Forgot Password*: Component for password recovery.
    
    - *(Main)*: Contains the main features of the application.
      - */Dashboard*: Main user interface for accessing different features.
        - */Profile*: User profile management.
        - */Logs*: User activity logs.
        - */Kanban*: Kanban board for task management.
        - */Stripe*: Integration with Stripe for payment processing.
        - */Settings*: User settings and preferences.

- */Components*: Reusable UI components used throughout the application.

- */handlers*: Contains logic for handling specific features.
  - */Kanban Handlers*: Logic for managing Kanban board actions.
  - */Settings Handlers*: Logic for managing user settings.

- */hooks*: Custom React hooks for managing state and logic.
  - */Auth Hook*: Hook for managing authentication state.
  - */Kanban Context Hook*: Hook for managing Kanban board state.

- */lib*: Contains utility libraries and constants.
  - */Constants.ts*: File for storing application-wide constants.

- */Providers*: Context providers for managing global state.
  - */Toast Provider*: Provider for managing toast notifications.

- */public*: Public assets accessible by the client.
  - */Images*: Image assets used in the application.

- */utils*: Utility functions used across the application.
  - */Change Board Util*: Functions for managing board changes.
  - */Form Validation*: Functions for validating form inputs.
  - */Toasts Functions*: Functions for displaying toast notifications.
```

## Contributing

Contributions are welcome Fork the repository, create a branch, make your changes, and submit a pull request.

## License

Apache 2.0

## Contact

Feel free to reach out for collaborations, suggestions, or just to say hello!

---
