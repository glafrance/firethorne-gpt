const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation-controller');

router.get('/first-prompts', conversationController.getFirstPrompts);
router.get('/:id', conversationController.getConversation);
router.post('/', conversationController.createConversation);

module.exports = router;