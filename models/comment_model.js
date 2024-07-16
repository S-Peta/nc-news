const db = require("../db/connection")

function listComments(article_id) {
  return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [article_id])
  .then((article) => {
    if(article.rows.length === 0) {
      return Promise.reject(
        {status: 404, msg: `No article found`});
    }
    return article.rows
  })
}

module.exports = listComments
