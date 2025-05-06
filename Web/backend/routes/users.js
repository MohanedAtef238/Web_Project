const express = require('express');
const router = express.Router();
const { createUser, getUserByCredentials, getAllUsers , getUserDetails, deleteUser, editUser } = require('../controllers/userController');

router.post('/', getUserByCredentials);
router.get('/:name', getUserDetails);
router.delete('/admin/:id', deleteUser)
router.get('/admin', getAllUsers);

// Sign up route
router.post('/signup', createUser);

router.post('/admin/adduser', createUser);
router.post('/admin/edit', editUser)

router.get('/admin/users', getAllUsers);

router.get('/:name', getUserDetails);

module.exports = router; 