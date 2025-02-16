const OpenAI = require('openai');
const openaiObj = new OpenAI();
const { v4: uuidv4 } =  require('uuid');
const asyncHandler = require('express-async-handler');

const ChatConversation = require('../models/chat-conversation');

exports.getAllChatConversations = asyncHandler(async (req, res) => {
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

exports.getFirstGoals = asyncHandler(async (req, res) => {
  try {
    const chatConversations = await ChatConversation.find();
    const firstGoals = [];

    if (chatConversations?.length) {
      chatConversations.map(conversation => {
        if (conversation?.items?.length) {
          const firstItem = conversation.items[0];
          firstGoals.push({
            id: conversation._id,
            goal: firstItem.promptData.goal},
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

exports.getConversation = asyncHandler(async (req, res) => {
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


exports.createConversation = asyncHandler(async (req, res) => {
  try {
    const input = req.body;
  
    if (input?.prompt && input?.promptData) {
      const promptText = input.prompt;
    
      const chatResponse = await sendChatData(promptText);
    
      if (chatResponse?.choices?.length) {
        const item = chatResponse.choices[0];
    
        if (item) {
          const response = item.message?.content;
    
          if (response) {
            const id = uuidv4();

            const conversation = new ChatConversation({
              items: [
                {
                  promptData: input.promptData,
                  prompt: input.prompt,
                  response    
                }                
              ]
            });
          
            await conversation.save();

            res.send(
              { 
                result: 'ok',
                id
              }
            );      
          } else {
            sendErrorResponse();
          }
        } else {
          sendErrorResponse();  
        }
      } else {
        sendErrorResponse();
      }
    } else {
      sendErrorResponse();
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating new chat conversation', error });
  }
});
  
const sendErrorResponse = (response) => {
  response.send({ "result": "Error processing chat data." });
};
  
const sendChatData = async (data) => {
  const completion = await openaiObj.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "user",
            content: data,
        },
    ],
    store: true,
  });

  return completion;
};
