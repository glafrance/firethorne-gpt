const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  items: [
    {
      prompt: { type: String, required: true },
      response: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
