const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat-controller');

router.get('/first-goals', chatController.getFirstGoals);
router.get('/conversations', chatController.getAllChatConversations);
router.get('/conversations/:id', chatController.getConversation);


// app.post('/chat', async (req, res) => {
//   const promptData = req.body;
//   console.log(promptData);

//   let prompt = promptData.prompt;

//   const chatResponse = await sendChatData(prompt);

//   if (chatResponse?.choices?.length) {
//     const item = chatResponse.choices[0];

//     if (item) {
//       const response = item.message?.content;

//       if (response) {
//         chatHistory.push({
//           id: uuidv4(),
//           prompt,
//           response
//         });

//         res.send({ "result": 'ok' });      
//       } else {
//         sendErrorResponse();
//       }
//     } else {
//       sendErrorResponse();  
//     }
//   } else {
//     sendErrorResponse();
//   }
// });

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

module.exports = router;