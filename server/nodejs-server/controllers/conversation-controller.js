const OpenAI = require('openai');
const openaiObj = new OpenAI();
const asyncHandler = require('express-async-handler');

const Conversation = require('../models/conversation');

exports.getFirstPrompts = asyncHandler(async (req, res) => {
  try {
    const conversations = await Conversation.find();
    const firstPrompts = [];

    if (conversations?.length) {
      conversations.map(conversation => {
        if (conversation?.items?.length) {
          const firstItem = conversation.items[0];

          firstPrompts.push({
            id: conversation._id,
            prompt: firstItem.prompt},
          );
        }
      });
    }

    const retVal = {
      firstPrompts
    };

    res.status(200).json(retVal);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving first prompts from history of conversations', error });
  }
});

exports.getConversation = asyncHandler(async (req, res) => {
  try {
    let conversation;

    if (req.params?.id) {
      const id = req.params.id;
      const result = await Conversation.findById(id);
      conversation = result;
    }

    res.status(200).json({ conversation });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat conversation', error });
  }
});


exports.createConversation = asyncHandler(async (req, res) => {
  try {
    const input = req.body;
  
    if (input?.prompt) {
      const prompt = input.prompt;
      const chatResponse = await sendChatData(prompt);
    
      if (chatResponse?.choices?.length) {
        const item = chatResponse.choices[0];
    
        if (item) {
          const response = item.message?.content;
    
          if (response) {
            const conversation = new Conversation({
              items: [
                {
                  prompt,
                  response    
                }                
              ]
            });
          
            await conversation.save();

            res.send(
              { 
                result: 'ok',
                conversation
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
    res.status(500).json({ message: 'Error creating new chat conversation', err });
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
