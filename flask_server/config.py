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
PASSWORD_RESET_SALT = 'unique_salt_for_password_reset'
LEMONSQUEEZY_SECRET_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIwMTc0YTdjODJiNDMyZWY2YmIxY2IzYWIxZmFlMjhjNGQzNTIxN2NiNmI4NjkxYzM3YmM1MzRjZjM3MDVmNTNkNjEzZTBiMWQzN2ZkMjFkMiIsImlhdCI6MTcyMzQwMzM5NS4yMDk3MDksIm5iZiI6MTcyMzQwMzM5NS4yMDk3MTEsImV4cCI6MjAzODkzNjE5NS4xNjg2MzksInN1YiI6IjMwMjQzODEiLCJzY29wZXMiOltdfQ.Q5fO1bRqjsEPtbZX_7rxlcyX0q30B53q-pps95sVv1luVWtJpo_LBBWq-NyVIhJLitiyd_6YlknmA1nKgpN3AUr65wPCb3S4IiscnW6nIhpysEQf2oknavrEyBR0x5tIFADLTwFqYaOi3-NIL8lsRKjogdJlCd98RDW61pA3UJDiM4NqjLMZNS7weF_KWCBVBgh8YBa80bd3G6r65xYXlf7q8OsRJE46Z5pHK916g75POstPQFAE1IdNbjULRAS8qWdLZzKxw2xy1ZeGxLa5XZ73CR440WZ0IKg5XZA1_zDr2jjpSQmgZKAn8_nGSago3VM9Gfp-8rFh-wSc8I5LcaH1z4q_Y-F2spNqG-_LxXSaDkJvRL_i9aq0GWuByqedP13UGpnRQyMWYF72btgcoIr7icbCNO-99HiGGuVVfKBZPY-oESdwesq4K29IfM8f_uv9vpChCqZYzrHLuH59xfOAGViPKZQBAJEX5QnDHU7oZvkW12E53V-uqScapsrs'
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
PERMANENT_SESSION_LIFETIME = timedelta(days=1)
# WTF_CSRF_TIME_LIMIT = timedelta(days=1)
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')
SQLALCHEMY_ECHO = False
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
    'auth.forgot_password',
    'auth.reset_password',
    'auth.verify_token',
    'get_csrf_token'
]