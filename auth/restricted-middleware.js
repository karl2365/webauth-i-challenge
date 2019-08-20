const bcrypt = require('bcryptjs');

const Users = require('../project/project-model.js');

module.exports = function restricted(req, res, next) {

  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: 'you shall not pass!' });
  }


};
