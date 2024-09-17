from flask import request, session
from flask_socketio import SocketIO, emit, join_room, disconnect, leave_room
user_connections = {}

@socketio.on('connect', namespace='/chat')
def connect_handler():
    global user_connections
    user_id = session.get('user_id')
    if not user_id:
        disconnect()  # Disconnect unauthenticated users
    else:
        user_connections[user_id] = request.sid  # Store mapping of user_id to SocketIO session ID

@socketio.on('message', namespace='/chat')
def message_handler(json):
    global user_connections
    recipient_user_id = json.get('recipient_user_id')
    if recipient_user_id in user_connections:
        # Send message directly to the specified user
        emit('message', json['message'], room=user_connections[recipient_user_id])

# Example event handler for a new WebSocket connection
# @socketio.on('connect')
# def test_connect():
#     print('Client connected')

@socketio.on('disconnect', namespace='/chat')
def test_disconnect():
    print('Client disconnected')

@socketio.on('join', namespace='/chat')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', room=room)

@socketio.on('leave', namespace='/chat')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)

# @socketio.on('message')
# def handleMessage(msg):
#     print('Message: ' + msg)
#     send(msg, broadcast=True)
