const Chat = require('../models/chat');
const asyncHandler = require('express-async-handler');

exports.chat_count = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED - chat_count');
});

exports.chat_history = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED - chat_history');
});

exports.chat_create = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED - chat_create');
});