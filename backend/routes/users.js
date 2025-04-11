const express = require('express');
const router = express.Router();
const { createUser, getUserByCredentials } = require('../controllers/userController');

// Login route
router.post('/', getUserByCredentials);

// Sign up route
router.post('/signup', createUser);

// Admin add user route
router.post('/admin/adduser', createUser);

module.exports = router; 