require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const socketIo = require('socket.io');
const http = require("node:http");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);



io.on('connection', (socket) => {
    console.log('An user connected');
})
module.exports.io = io


// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
