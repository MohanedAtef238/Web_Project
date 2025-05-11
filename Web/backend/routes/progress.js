const express = require('express');
const router = express.Router();

const { getReadingProgress, updateReadingProgress } = require('../controllers/progressController');

router.get('/:userId/:bookId', getReadingProgress);
router.post('/', updateReadingProgress);

module.exports = router;