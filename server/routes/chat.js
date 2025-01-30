const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/count', chatController.chat_count);
router.get('/history', chatController.chat_history);
router.post('/create', chatController.chat_create);

module.exports = router;