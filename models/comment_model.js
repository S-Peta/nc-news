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

function insertComment(article_id, commentData) {
  const {author, body} =  commentData

  return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
  .then((article) => {
    if (article.rows.length === 0) {
      return Promise.reject(
        {status: 404, msg: 'Article not found'})
    } else {
      return db.query(`INSERT INTO comments (author, article_id, body) VALUES
        ($1, $2, $3)
        RETURNING *;`, [author, article_id, body]
      ).then((result) => {
        return result.rows[0];
      })
    }
  })
}

function removeComment(comment_id) {
  return db.query(
    `DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
    [comment_id]
  ).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'Comment not found' });
    }
  });
}


module.exports = {listComments, insertComment, removeComment}
