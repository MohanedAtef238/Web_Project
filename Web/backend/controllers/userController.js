const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

// use in admin add user and signups
const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log('Creating user with:', username, email);
  
      if (!username || !email || !password) {
        console.log('Missing fields:', { username, email, password });
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: username },
            { email: email }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({
          error: existingUser.username === username ? 
            'Username already taken' : 
            'Email already registered'
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({ 
        username, 
        email, 
        password: hashedPassword,
        isAuthor: false 
      });

      // Create token payload
      const tokenPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.username.toLowerCase() === 'admin',
        isAuthor: user.isAuthor || false
      };

      // Sign token
      const token = jwt.sign(
        tokenPayload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      res.status(201).json({ token, user: tokenPayload });
    } catch (error) {
      console.error("Error in createUser:", error);
      res.status(500).json({ error: error.message });
    }
};
  

// in admin delete user button or in user settings delete account (not implemented yet)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log('delete user reached controller');
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log('db from controller found the user to delete');
    console.log('');
    await user.destroy();
    console.log('user deleted in controller')
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

    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.username.toLowerCase() === 'admin',
      isAuthor: user.isAuthor || false
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

    console.log('Login successful, sending response:', { token, user: tokenPayload });
    res.status(200).json({ token, user: tokenPayload });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async(req, res) => { 
  try {
    console.log('fetch users reached controller')
    const users = await User.findAll();
    console.log("if this logs then issue is not in controller");
    res.status(200).json(users);
  } catch (error) {
    console.log("controller error in fetch users")
    res.status(500).json({ error: error.message });
  }
}

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.name },  attributes: ['id', 'username', 'isAuthor', 'bio']});
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  console.log('if in admin ignore, user edit profile tho reached, req.body is: ', req.body);
  try {
    const { id, username, email } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.username = username;
    user.email = email;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userEditUser = async (req, res) => {
  console.log("edit user controller, this is the request body: ", req.body)
  try {
    const { id, bio } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
      
    if(bio !== null)
      user.bio = bio;
    console.log("user before changing: ", user);
    await user.save();
    console.log("user after changing: ", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserEditProfile = async (req, res) => {
  console.log("hi, reached controller, this is the request body: ", req.body," and \nuser id: ", req.body.id)
  try {
    const { id } = req.body;
    const user = await User.findByPk(id);//, {attributes: ['username', 'email', 'firstname', 'lastname', 'password', 'bio']});
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async  (req, res) => {
  console.log("reached password contorller, rewuest: ", req.body);
  try {
    const { id, oldpass, newpass } = req.body;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const validate = await bcrypt.compare(oldpass, user.password);
    if(!validate) return res.status(400).json({ error: "Wrong password"});
    const hashedPassword = await bcrypt.hash(newpass, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

userEditUser, getUserEditProfile, changePassword
module.exports = { createUser, deleteUser, getUserByCredentials , getAllUsers, getUserDetails, editUser, userEditUser, getUserEditProfile, changePassword};
