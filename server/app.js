const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const openaiObj = new OpenAI();

const app = express();
app.use(cors());
app.use(express.json());

const port = 3100;

app.post('/chat', async (req, res) => {
  const chatData = req.body.chatData;

  const chatResponse = await sendChatData(chatData);
  console.log(chatResponse);

  if (chatResponse?.choices?.length) {
    res.send({ "result": chatResponse.choices[0].message });    
  } else {
    res.send({ "result": "Error processing chat data." });
  }
});

const sendChatData = async (data) => {
  const completion = await openaiObj.chat.completions.create({
    model: "gpt-4o",
    messages: [
        { role: "developer", content: "You are a helpful assistant." },
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

