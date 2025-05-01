const express = require('express');
const router = express.Router();
const {
    getUserFavorites,
    addToFavorites,
    removeFromFavorites
} = require('../controllers/favoriteController');

router.get('/user/:username', getUserFavorites);
router.post('/user/:username', addToFavorites);
router.delete('/user/:username/:bookId', removeFromFavorites);

module.exports = router; 