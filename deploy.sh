#!/bin/bash

# Set error handling
set -e
set -o pipefail

# Function to handle errors
error_handler() {
    local exit_code=$?
    echo "Error occurred on line $1: $2" >&2
    exit $exit_code
}

# Trap errors and call error_handler
trap 'error_handler $LINENO "$BASH_COMMAND"' ERR

# Setting up environment variables
export FLASK_APP=app_run.py
export FLASK_ENV=development
export FLASK_DEBUG=1
export DATABASE_URL=sqlite:///default.db

echo "Environment variables set."

# Database operations
flask db init || error_handler $LINENO "Failed to initialize database"
flask db migrate -m "initial migration" || error_handler $LINENO "Failed to migrate database"
flask db upgrade || error_handler $LINENO "Failed to upgrade database"

echo "Database initialized and migrated."

# Run Python script to execute initialization
python create_initial_data.py || error_handler $LINENO "Failed to create initial users"

echo "Initial users created successfully."

# Starting the Flask application
flask run || error_handler $LINENO "Failed to start Flask application"
