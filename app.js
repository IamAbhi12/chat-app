// Require necessary modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

// Require routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const groupChatRoutes = require('./routes/group-chat');

// Require controllers
const authController = require('./controllers/auth');
const chatController = require('./controllers/chat');
const groupChatController = require('./controllers/group-chat');

// Set up database connection
mongoose.connect('mongodb+srv://abhinavc270:bicv9b4wPESWrYWc@cluster0.ol9stee.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://abhinavc270:bicv9b4wPESWrYWc@cluster0.ol9stee.mongodb.net/?retryWrites=true&w=majority' }),
})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', authRoutes);
app.use('/', chatRoutes);
app.use('/', groupChatRoutes);

// Set up socket.io
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ roomId, userId }) => {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
        socket.leave(roomId);
        console.log(`User ${userId} left room ${roomId}`);
    });

    socket.on('sendMessage', ({ roomId, message }) => {
        io.to(roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start server
server.listen(3000, () => {
    console.log('Server started on port 3000');
});
