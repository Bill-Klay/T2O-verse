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
    echo Database initialization failed, maybe migration already exists
    goto :error
)

flask db migrate -m "initial migration"
if %ERRORLEVEL% NEQ 0 (
    echo Database migration failed
    goto :error
)

flask db upgrade
if %ERRORLEVEL% NEQ 0 (
    echo Database upgrade failed
    goto :error
) else (
    echo Database initialized and migrated.
)

REM Run Python script to execute initialization
python create_initial_data.py
if %ERRORLEVEL% NEQ 0 (
    echo Failed to create initial users
    goto :error
) else (
    echo Initial users created successfully.
)

REM Starting the Flask application
flask run
if %ERRORLEVEL% NEQ 0 (
    echo Failed to start Flask application
    goto :error
)

goto :eof

:error
echo Deployment failed. Please check the logs for more information.
exit /b 1
