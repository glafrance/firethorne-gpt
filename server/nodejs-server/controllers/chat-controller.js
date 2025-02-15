const asyncHandler = require('express-async-handler');
const OpenAI = require('openai');
const openaiObj = new OpenAI();
const { v4: uuidv4 } =  require('uuid');

const ChatConversation = require('../models/chat-conversation');

exports.getAllChatConversations = asyncHandler(async (req, res, next) => {
  try {
    const chatConversations = await ChatConversation.find();

    const retVal = {
      conversations: chatConversations
    };

    res.status(200).json(retVal);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat conversations', error });
  }
});

exports.getFirstGoals = asyncHandler(async (req, res, next) => {
  try {
    const chatConversations = await ChatConversation.find();
    const firstGoals = [];

    if (chatConversations?.length) {
      chatConversations.map(conversation => {
        if (conversation?.items?.length) {
          const firstItem = conversation.items[0];
          firstGoals.push({
            id: conversation._id,
            goal: firstItem.prompt.goal},
          );
        }
      });
    }

    const retVal = {
      firstGoals
    };

    res.status(200).json(retVal);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat conversations', error });
  }
});

exports.getConversation = asyncHandler(async (req, res, next) => {
  try {
    let conversation;

    if (req.params?.id) {
      const id = req.params.id;
      const result = await ChatConversation.findById(id);
      conversation = result;
    }

    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat conversations', error });
  }
});
