const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRouter = require('./routes/chat');

mongoose.set("strictQuery", false);
const mongoDB = 'mongodb://127.0.0.1/firethorne_gpt';

main().catch(err => console.log(err));
async function main() {
  console.log('connecting to mongoDB database - firethorne_gpt');
  await mongoose.connect(mongoDB);
}

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3100;

app.use('/chat', chatRouter);


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

