import os

DEBUG = True
SECRET_KEY = 'your_secret_key'
# Add more configurations as needed
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')