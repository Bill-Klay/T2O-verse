import os

DEBUG = True
SECRET_KEY = 'your_secret_key'
# Add more configurations as needed
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')
MAIL_SERVER = 'sandbox.smtp.mailtrap.io'
MAIL_PORT = 2525
MAIL_USERNAME = 'acf7606c86c045'
MAIL_PASSWORD = 'a94237314a7a25'
MAIL_USE_TLS = True
MAIL_USE_SSL = False