const express = require('express');
const router = express.Router();
const {
    getUserBooks,
    getBookDetails,
    addAdminBook,
    getAdminBookList,
    deleteBook,
} = require('../controllers/bookController');

router.get('/user/:username', getUserBooks);

router.get('/details/:bookId', getBookDetails);

// router.post('/user/:username', addBook); add this later
router.post('/delete/:bookId', deleteBook);
router.post('/admin/book/add', addAdminBook);

router.get('/admin/books', getAdminBookList);

module.exports = router; 