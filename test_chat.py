import pytest
from flask_socketio import SocketIOTestClient
from flask_server import create_app  # Adjust import path as necessary

user_connections = {}

@pytest.fixture(scope='module')
def test_client():
    app, socketio = create_app()
    client = SocketIOTestClient(app, socketio)
    return client

def test_direct_messaging(test_client):
    # Mock session data or adjust server-side logic to allow connection without session
    # This example assumes server-side adjustments to allow a 'test_mode' query parameter to bypass session checks

    # Connect with a test_mode query parameter to bypass session checks
    test_client.connect('/chat', query_string='test_mode=1')  # Use namespace if applicable
    test_client.socketio.sleep(1)  # Ensure connection is established

    # Emit a message
    test_client.emit('message', {'recipient_user_id': 'another_test_user', 'message': 'Hello, server!'}, namespace='/chat')

    # Wait for processing
    test_client.socketio.sleep(1)

    # Check received messages
    received_messages = test_client.get_received(namespace='/chat')  # Adjust namespace as needed
    assert len(received_messages) == 1
    assert received_messages[0]['args'][0] == 'Hello, server!'
