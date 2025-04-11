const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const connectMongoDB = require('./config/mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

require('./config/database'); // initialize PostgreSQL
connectMongoDB(); // initialize MongoDB

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; 