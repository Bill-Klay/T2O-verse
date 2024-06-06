import os

def get_logging_config(env):
    configs = {
        'development': {
            'filemode': 'a',
            'level': 'DEBUG',
            'file': 'dev.log',
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        },
        'production': {
            'filemode': 'a',
            'level': 'INFO',
            'file': 'prod.log',
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        },
        'testing': {
            'filemode': 'a',
            'level': 'WARNING',
            'file': 'test.log',
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        }
    }

    return configs.get(env, configs['development'])  # Default to 'development' if env is not found


DEBUG = True
SECRET_KEY = 'your_secret_key'
# Add more configurations as needed
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')
ENV = os.getenv('FLASK_ENV', 'development').lower()
MAIL_SERVER = 'sandbox.smtp.mailtrap.io'
MAIL_PORT = 2525
MAIL_USERNAME = 'acf7606c86c045'
MAIL_PASSWORD = 'a94237314a7a25'
MAIL_USE_TLS = True
MAIL_USE_SSL = False