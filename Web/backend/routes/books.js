const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
    getUserBooks,
    getBookDetails,
    addAdminBook,
    getAdminBookList,
    deleteBook,
    editBook,
    getBooksByGenre
} = require('../controllers/bookController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'coverImage' ? '/app/uploads/covers' : '/app/uploads/audio';
        // Ensure the directories exist
        const fs = require('fs');
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.get('/user/:username', getUserBooks);

router.get('/details/:bookId', getBookDetails);

// router.post('/user/:username', addBook); add this later
router.post('/delete/:bookId', deleteBook);
router.post('/admin/editbook', editBook)

router.post('/admin/book/add',
    upload.fields([
        { name: 'coverImage', maxCount: 1 },// to make sure we dont get bombarded with files with a single upload, we probably need better ratelimiting in the future to handle this more elegantly but for now this will do
        { name: 'audioFile', maxCount: 1 }
    ]),
    addAdminBook
);

router.get('/admin/books', getAdminBookList);

router.get('/genre/:genre', getBooksByGenre);

module.exports = router; 