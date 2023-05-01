const Message = require('../models/message');

const chatController = {};

chatController.getChatHistory = async (req, res) => {
    try {
        const messages = await Message.find().sort('-createdAt').limit(50);
        res.render('chat', { messages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

chatController.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const message = await Message.create({
            text,
            user: req.session.user._id
        });
        res.send(message);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = chatController;
