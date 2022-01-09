const bcrypt = require('bcryptjs');
const passport = require('passport');
const { UserModel } = require('../models');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.login = async (req, res) => {
  try {
    res.json({
      status: true,
      message: 'Logged in successfully',
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error Occured'
    });
  }
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      status: false,
      message: 'Please enter all fields'
    });
  }

  try {
    const user = await UserModel.findOne({ username, email });

    if (user)
      res.json({
        status: false,
        message: 'User Already Exists'
      });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      status: true,
      message: 'User Created Successfully',
      data: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username
      }
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Error Occured'
    });
  }
};

exports.logout = (req, res) => {
  req.logout();
  // delete req.user;
  req.session.destroy();
  // res.clearCookie('session');
  res.status(200).json({
    status: true,
    message: 'Logged out successfully'
  });
};

exports.loggedInUser = (req, res) => {
  res.status(200).send(req.user);
};
