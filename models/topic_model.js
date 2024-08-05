const db = require("../db/connection")

function listTopics() {
  return db.query(`SELECT * FROM topics`)
  .then((result) => {
    return result.rows
  })
}

function insertTopic(topicData) {
  const {description, slug} = topicData
  return db.query(`INSERT INTO topics (description, slug) VALUES
    (1$, $2) RETURNING*`, [description, slug])
    .then(({rows}) => {
      return rows
    })
}

module.exports =  {listTopics, insertTopic};
