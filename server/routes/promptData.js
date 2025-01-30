const express = require('express');
const router = express.Router();
const promptDataController = require('../controllers/promptDataController');

router.post('/set', promptDataController.promptData_set);

module.exports = router;