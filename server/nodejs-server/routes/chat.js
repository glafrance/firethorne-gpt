const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat-controller');

router.get('/first-goals', chatController.getFirstGoals);
router.get('/conversations', chatController.getAllChatConversations);
router.get('/conversations/:id', chatController.getConversation);
router.post('/', chatController.createConversation);

module.exports = router;