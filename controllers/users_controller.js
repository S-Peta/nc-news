const listUsers = require("../models/users_model")

function getUsers(req, res, next) {
  listUsers().then((users) => {
    res.status(200).send({users})
  })
}

module.exports = getUsers
