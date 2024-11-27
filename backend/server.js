const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('./config/passportConfig');

const app = express();

// Middleware
app.use(express.json());
// Configure session middleware
app.use(
    session({
        secret: 'googletest', // Replace with a strong secret key
        resave: false, // Avoid saving session if unmodified
        saveUninitialized: false, // Don't save empty sessions
        cookie: { secure: false }, // Set `true` if using HTTPS
    })
);
app.use(cors());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => console.error('Database Connection Failed:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
