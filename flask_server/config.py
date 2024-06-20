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
SECRET_KEY = 'your_secret_key'
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'None'
PERMANENT_SESSION_LIFETIME = timedelta(days=1)
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')
SQLALCHEMY_ECHO = True
ENV = os.getenv('FLASK_ENV', 'development').lower()
MAIL_SERVER = 'sandbox.smtp.mailtrap.io'
MAIL_PORT = 2525
MAIL_USERNAME = 'acf7606c86c045'
MAIL_PASSWORD = 'a94237314a7a25'
MAIL_USE_TLS = True
MAIL_USE_SSL = False
CSRF_EXEMPT_ENDPOINTS = [
    'auth.logout',
    'auth.signup',
    'auth.login',
    'get_csrf_token'
]