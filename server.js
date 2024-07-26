const express = require('express');
const path = require('path');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(require('./config/checkToken'));
// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/posts', ensureLoggedIn, require('./routes/api/posts'));


//catch all
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('postCreated', (postCreated) => {
        io.emit('postCreated', postCreated);
    })
});