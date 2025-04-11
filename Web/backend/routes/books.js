const express = require('express');
const router = express.Router();
const {
    getUserBooks,
    getBookDetails,
    addBook,
    getAdminBookList
} = require('../controllers/bookController');

router.get('/user/:username', getUserBooks);

router.get('/details/:bookId', getBookDetails);

router.post('/user/:username', addBook);

router.get('/admin/books', getAdminBookList);

module.exports = router; 