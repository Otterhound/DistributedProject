const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user'); 

// Register User
router.post('/register', async (req, res, next) => {
  let newUser = new User ({
      ...req.body
  });

  // Check if username has been taken
  let dublicateCheck = await User.findOne({username: newUser.username});
  if (dublicateCheck) {
      return res.json({success: false, msg: 'Username alredy in use'})
  }

  addUser(newUser, (err, user) => {
      if(err) {
          res.json({success: false, msg: 'Failed to register user', err: err});
      } else {
          res.json({success: true, msg: 'User registered'});
      }
  });
});

// Password hashed
const addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

// User login
router.post('/login', async (req, res, next) => {
  const name = req.body.username;
  const password = req.body.password;

  // Check if user exits
  let user = await User.findOne({username: name});
  if (!user) {
      return res.json({success: false, msg: 'User not found'})
  }

  comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
          res.json({
              success: true,
              user: user
      })
  } else {
      return res.json({success: false, msg: 'Wrong password'});
  }
});
});

comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
  });
}

// Log out
router.get("/logout", async (req, res) => {
  res.json({message: "User logout"});
});

module.exports = router;
