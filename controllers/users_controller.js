const {listUsers, selectUser} = require("../models/users_model")

function getUsers(req, res, next) {
  listUsers().then((users) => {
    res.status(200).send({users})
  })
}

function getUserByUsername(req, res, next) {
  const {username} = req.params

  selectUser(username).then((user) => {
    res.status(200).send({user})
  }).catch(next)
}

module.exports = {getUsers, getUserByUsername}
