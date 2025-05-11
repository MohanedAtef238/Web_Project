const express = require('express');
const router = express.Router();
const {
    getUserFavorites,
    toggleFavorite,
    isFavorited
} = require('../controllers/favoriteController');

router.get('/user/:userId', getUserFavorites);

router.get('/user/:userId/book/:bookId', isFavorited);

router.put('/user/:userId/book/:bookId', toggleFavorite);

module.exports = router; 