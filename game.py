from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chaos is order'
socketio = SocketIO(app)

numUsers = 0


@app.route('/')
def index():
    return render_template('game.html')


@app.route('/chat')
def chat():
    return render_template('chat.html')


@socketio.on('connection', namespace='/chat')
def user_connected():
    print('User connected')


@socketio.on('new message', namespace='/chat')
def new_message(data):
    emit('new message', {
        'username': session['username'],
        'message': data,
    }, broadcast=True)


@socketio.on('add user', namespace='/chat')
def add_user(data):
    print('adding user')
    global numUsers

    session['username'] = data

    numUsers += 1

    emit('login', {'numUsers': numUsers})
    emit('user joined', {
        'username': session['username'],
        'numUsers': numUsers
    }, broadcast=True)


@socketio.on('typing', namespace='/chat')
def typing():
    emit('typing', {'username': session['username']}, broadcast=True)


@socketio.on('stop typing', namespace='/chat')
def stop_typing():
    emit('stop typing', {'username': session['username']}, broadcast=True)


@socketio.on('disconnect', namespace='/chat')
def disconnect():
    global numUsers

    numUsers -= 1
    emit('user left', {
        'username': session['username'],
        'numUsers': numUsers
    }, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
