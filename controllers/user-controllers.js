const userService = require("../services/user-service");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validateOwner = (userId, token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user.id.toString() === userId.toString()
  };

const getUsers = async (req, res) => {
    try {
        
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        if(!user){
            throw new Error("User does not exist!")
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const addUser = async (req, res) => {
    const user = req.body;
  
    if (!user.email) {
      res.status(404).send('Email can not be empty!').end();
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newUser = await userService.addUser(user);
  
        res.status(201).send(newUser);
      } catch (e) {
        res.status(500).send({ message: e.message }).end();
      }
    } 
  };

const editUser = async (req, res) => {
    const { id } = req.params;
  const newUser = req.body;
  const token = req.header('x-auth-token');

  try {
    if (newUser.password) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    const user = await userService.getUser(id);
    if (!user) {
     return res.status(404).send({ message: "User doesn't exist!" }).end();
    }
    if (validateOwner(user.id, token)) {

      await userService.editUser(id, newUser);

      const editedUser = await userService.getUser(id);
      res.send(editedUser).end();
    } else {
      res
        .status(403)
        .send({ message: 'You are not owner of this user!' })
        .end();
    }
  } catch (e) {
    res.status(500).send({ message: e.message }).end();
  }
};

const deleteUser = async (req, res) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).send({ message: 'User not found!' }).end();
        return;
      }
      res.send({ message: 'User is deleted!' }).end();
    } catch (e) {
        res.status(500).send({ message: e.message }).end();
    }
  };

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
};