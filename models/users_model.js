const db = require("../db/connection")

function listUsers() {
  return db.query(`SELECT * FROM users`)
  .then(({rows}) => {
    return rows
  })
}

function selectUser(username) {
  return db.query(`SELECT * FROM users WHERE username = $1`, [username])
  .then(({rows}) => {
    if(rows.length === 0) {
      return Promise.reject({status: 400, msg: 'Invalid input'})
    }
    return rows[0]
  })
}

module.exports = {listUsers, selectUser}
