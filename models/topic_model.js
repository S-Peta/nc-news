const db = require("../db/data/development-data/index")


function listTopics() {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    console.log(result, 'result model');
    return result.rows
  }).catch(err => {
    console.error('Error executing query:', err);
    throw err;
  });
}

module.exports =  listTopics;
