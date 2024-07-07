const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));