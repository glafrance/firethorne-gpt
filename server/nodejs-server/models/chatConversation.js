const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatConversationSchema = new Schema({
  chatHistory: [{
    id: String,
    prompt: String,
    response: String
  }]
});

const ChatConversation = mongoose.model("ChatConversation", ChatConversationSchema);