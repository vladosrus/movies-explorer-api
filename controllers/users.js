const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = (req, res) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => res.send(err));
};

module.exports = {
  createUser,
};
