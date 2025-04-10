const User = require('../models/user');
const bcrypt = require('bcrypt');

// use in admin add user and signups
const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log('Creating user with:', username, email);
  
      if (!username || !email || !password) {
        console.log('Missing fields:', { username, email, password });
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);
  
      const user = await User.create({ username, email, password: hashedPassword });
      console.log('User created:', user.username);
  
      res.status(201).json(user);
    } catch (error) {
      console.error("Error in createUser:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

// in admin delete user button or in user settings delete account (unimplemented yet)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login
const getUserByCredentials = async (req, res) => {
  try {
    const { inputUsername, inputPassword } = req.body;
    const userByUsername = await User.findOne({ where: { username: inputUsername } });
    const userByEmail = await User.findOne({ where: { email: inputUsername } });

    const user = userByUsername || userByEmail;
    if (!user) return res.status(404).json({ error: 'wrong username or password' });

    const validate = await bcrypt.compare(inputPassword, user.password);
    if (!validate) {
      return res.status(404).json({ error: 'wrong username or password' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async(req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.name },  attributes: ['username', 'isAuthor', 'bio', 'profilePicture']});
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { createUser, deleteUser, getUserByCredentials , getAllUsers, getUserDetails};
