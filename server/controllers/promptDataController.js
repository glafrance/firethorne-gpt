const PromptData = require('../models/promptData');
const asyncHandler = require('express-async-handler');

exports.promptData_set = asyncHandler(async (req, res, next) => {
  const promptData = req.body;
  res.send('NOT IMPLEMENTED - promptData_set');
});
