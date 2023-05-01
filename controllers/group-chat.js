const Group = require('../models/chat');
const Message = require('../models/message');

const groupChatController = {};

groupChatController.getGroupChatHistory = async (req, res) => {
    try {
        const groupId = req.params.id;
        const group = await Group.findById(groupId);
        const messages = await Message.find({ group: groupId }).sort('-createdAt').limit(50);
        res.render('group-chat', { group, messages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

groupChatController.sendGroupMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const groupId = req.params.id;
        const message = await Message.create({
            text,
            user: req.session.user._id,
            group: groupId
        });
        res.send(message);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = groupChatController;
