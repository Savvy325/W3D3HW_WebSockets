from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

# socket events
@socketio.on('connect')
def handle_connect():
    print('Client(React Frontend): Connected.')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client(React Frontend): Disconnected.')

@socketio.on('message')
def handle_message(message):
    print(f'Recieved Message: {message}')
    socketio.emit('message', message)

if __name__ == '__main__':
    socketio.run(app)