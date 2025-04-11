const express = require('express');
const router = express.Router();
const { createUser, getUserByCredentials, getAllUsers , getUserDetails } = require('../controllers/userController');

router.post('/', getUserByCredentials);
router.get('/:name', getUserDetails);
router.post('/signup', createUser);

router.post('/admin/adduser', createUser);
router.get('/admin/users', getAllUsers);

module.exports = router; 