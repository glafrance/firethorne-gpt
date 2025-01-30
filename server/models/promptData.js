const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromptDataSchema = new Schema({
  role: String,
  perspective: String,
  prompt: String
});

const PromptData = mongoose.model("PromptData", PromptDataSchema);