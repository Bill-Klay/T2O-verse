@echo off

SET FLASK_APP=../app_run.py
SET FLASK_ENV=development
SET FLASK_DEBUG=1
SET DATABASE_URL=sqlite:///default.db

echo Environment variables set.

flask db init
flask db migrate
flask db upgrade

if %ERRORLEVEL% NEQ 0 (
    echo Database migration failed
    exit /b 1
)

echo Database initialized and migrated.

flask run
if %ERRORLEVEL% NEQ 0 (
    echo Failed to start Flask application
    exit /b 1
)
