const db = require("../db/connection")

function listUsers() {
  return db.query(`SELECT * FROM users`)
  .then(({rows}) => {
    return rows
  })
}

module.exports = listUsers
