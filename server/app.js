const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const openaiObj = new OpenAI();
const { v4: uuidv4 } =  require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3100;

const chatHistory = [];

app.get('/chat', async (req, res) => {
  res.send(chatHistory);
});

app.get('/chat-count', async (req, res) => {
  res.send({count: chatHistory.length});
});

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;

  const chatResponse = await sendChatData(prompt);

  if (chatResponse?.choices?.length) {
    const item = chatResponse.choices[0];

    if (item) {
      const response = item.message?.content;

      if (response) {
        chatHistory.push({
          id: uuidv4(),
          prompt,
          response
        });

        res.send({ "result": 'ok' });      
      } else {
        sendErrorResponse();
      }
    } else {
      sendErrorResponse();  
    }
  } else {
    sendErrorResponse();
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

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

