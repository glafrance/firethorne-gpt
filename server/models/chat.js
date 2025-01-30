const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  chatHistory: [{
    id: String,
    prompt: String,
    response: String
  }]
});

const Chat = mongoose.model("Chat", ChatSchema);