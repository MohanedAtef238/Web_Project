const express = require('express');
const router = express.Router();
const {
    getUserFavorites,
    addToFavorites,
    removeFromFavorites
} = require('../controllers/favoriteController');

router.get('/user/:username', getUserFavorites);
<<<<<<< HEAD

router.get('/user/:userId/book/:bookId', isFavorited);

router.put('/user/:userId/book/:bookId', toggleFavorite);
=======
router.post('/user/:username', addToFavorites);
router.delete('/user/:username/:bookId', removeFromFavorites);
>>>>>>> parent of be6c1ec (Merge branch 'main' of https://github.com/MohanedAtef238/Web_Project)

module.exports = router; 