from flask_server import create_app
from flask_socketio import SocketIO

app, socketio = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True)
