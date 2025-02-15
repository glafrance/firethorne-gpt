const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatConversationSchema = new Schema({
  items: [
    {
      prompt: {
        role: { type: String, default: '' },
        perspective: { type: String, default: '' },
        goal: { type: String, required: true },
        additionalInfo: { type: String, default: '' },
      },
      response: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const ChatConversation = mongoose.model('ChatConversation', chatConversationSchema);

module.exports = ChatConversation;
