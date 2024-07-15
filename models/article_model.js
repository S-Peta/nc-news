const db = require("../db/connection")

function selectArticle(id) {
  return db.query(`SELECT * FROM articles WHERE $1 = article_id`, [id])
    .then((result) => {
      return result.rows
    })

}

module.exports = selectArticle;
