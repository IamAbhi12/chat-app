const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'offline' },
    picture: { type: String, default: 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png' },
});

module.exports = mongoose.model('User', userSchema);