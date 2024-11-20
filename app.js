const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const allowedOrigins = [
    'http://localhost:3000',  //Development
    'https://my-production-url.com' //Production
    ];
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
    }
));


// Define routes
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/user', require('./routes/userRoutes'));

app.use('/api/thread', require('./routes/threadRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
