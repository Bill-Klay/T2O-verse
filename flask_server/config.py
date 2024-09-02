import os
from datetime import timedelta

def get_logging_config(env):
    configs = {
        'development': {
            'filemode': 'a',
            'level': 'DEBUG',
            'file': 'dev.log',
            'log_route_access': True,
            'log_database_queries': True,
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        },
        'production': {
            'filemode': 'a',
            'level': 'INFO',
            'file': 'prod.log',
            'log_route_access': False,
            'log_database_queries': False,
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            'smtp_handler': {
                'to_addrs': ['admin@example.com'],  # List of recipients for critical logs
                'subject_prefix': '[Critical] Your Application Error',
                # Additional SMTP handler settings can be added here
            }
            
        },
        'testing': {
            'filemode': 'a',
            'level': 'WARNING',
            'file': 'test.log',
            'log_route_access': False,
            'log_database_queries': False,
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        }
    }

    return configs.get(env, configs['development'])  # Default to 'development' if env is not found

# Add more configurations as needed
# Get the value of an environment variable
# Provide a default value if the variable isn't set

SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
PASSWORD_RESET_SALT = os.getenv('PASSWORD_RESET_SALT', 'unique_salt_for_password_reset')
STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY', 'stripe_public_key_from_env')
STRIPE_PRIVATE_KEY = os.getenv('STRIPE_PRIVATE_KEY', 'stripe_private_key_from_env')
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
PERMANENT_SESSION_LIFETIME = timedelta(days=1)
# WTF_CSRF_TIME_LIMIT = timedelta(days=1)
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')
SQLALCHEMY_ECHO = False
ENV = os.getenv('FLASK_ENV', 'development').lower()
MAIL_SERVER = os.getenv('MAIL_SERVER', 'sandbox.smtp.mailtrap.io')
MAIL_PORT = os.getenv('MAIL_PORT', 2525)
MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'acf7606c86c045')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'a94237314a7a25')
MAIL_USE_TLS = True
MAIL_USE_SSL = False
EMAIL_SENDER = 'noreply@yourdomain.com'
CSRF_EXEMPT_ENDPOINTS = [
    'auth.logout',
    'auth.signup',
    'auth.login',
    'auth.forgot_password',
    'auth.reset_password',
    'auth.verify_token',
    'get_csrf_token'
]