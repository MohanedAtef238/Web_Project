const express = require('express');
const router = express.Router();
const { getUserRecommendations, addUserInteraction } = require('../controllers/recommendationsController');

router.get('/:userId', getUserRecommendations);
router.post('/interact', addUserInteraction);

module.exports = router; 