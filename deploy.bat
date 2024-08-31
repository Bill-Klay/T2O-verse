@echo off

REM Setting up environment variables
REM Add more configurations as needed
set FLASK_APP=app_run.py
set FLASK_ENV=development
set FLASK_DEBUG=1
set DATABASE_URL=sqlite:///default.db

echo Environment variables set.

REM Database operations
flask db init
if %ERRORLEVEL% NEQ 0 (
    echo Database initialization failed
    exit /b 1
)

flask db migrate -m "initial migration"
if %ERRORLEVEL% NEQ 0 (
    echo Database migration failed
    exit /b 1
)

flask db upgrade
if %ERRORLEVEL% NEQ 0 (
    echo Database upgrade failed
    exit /b 1
) else (
    echo Database initialized and migrated.
)

REM Run Python script to execute initialization
python create_initial_data.py
if %ERRORLEVEL% NEQ 0 (
    echo Failed to create initial users
    exit /b 1
) else (
    echo Initial users created successfully.
)

REM Starting the Flask application
flask run
if %ERRORLEVEL% NEQ 0 (
    echo Failed to start Flask application
    exit /b 1
)
