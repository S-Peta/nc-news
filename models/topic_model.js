const db = require("../db/connection")


function listTopics() {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows
  }).catch(err => {
    console.error('Error executing query:', err);
    throw err;
  });
}

module.exports =  listTopics;
