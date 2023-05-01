const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

router.get('/', chatController.getChatHistory);

router.post('/', chatController.sendMessage);

module.exports = router;
