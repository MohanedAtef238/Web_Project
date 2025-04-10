const express = require('express');
const cors = require('cors');
const { createUser, getUserByCredentials } = require('./src/database/sql_controllers/userController.js');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };

app.use(cors());
app.use(express.json());

app.post('/', getUserByCredentials);
app.post('/signup', createUser);
app.post('/admin/adduser', createUser);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
