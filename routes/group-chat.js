const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/group-chat');

router.get('/:id', groupChatController.getGroupChatHistory);

router.post('/:id', groupChatController.sendGroupMessage);

module.exports = router;
