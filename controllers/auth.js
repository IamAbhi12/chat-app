const bcrypt = require('bcrypt');
const User = require('../models/user');

const authController = {};

authController.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    req.session.user = user;
    res.redirect('/chat');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

authController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid password');
    }
    req.session.user = user;
    res.redirect('/chat');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

authController.logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = authController;
