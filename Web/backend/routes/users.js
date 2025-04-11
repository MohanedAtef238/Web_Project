const express = require('express');
const router = express.Router();
const { createUser, getUserByCredentials, getAllUsers, deleteUser } = require('../controllers/userController');

// Login route
router.post('/', getUserByCredentials);


router.delete('/admin/:id', deleteUser);

// Sign up route
router.post('/signup', createUser);

// Admin add user route
router.post('/admin/adduser', createUser);

router.get('/admin', getAllUsers);


module.exports = router; 