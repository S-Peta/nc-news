const db = require("../db/connection")

function listArticles(sort_by = "created_at") {
  const validOptions = ["author", "topic", "created_at"]

  if(!validOptions.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid input' })
  }

  const queryStr = `
    SELECT
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.${sort_by} DESC;
    `;

  return db.query(queryStr).then((articlesData) => {
    return articlesData.rows;
  });
}

function selectArticle(article_id) {
  return db.query(`SELECT * FROM articles WHERE $1 = article_id`, [article_id])
  .then((article) => {
    if(article.rows.length === 0) {
      return Promise.reject(
        {status: 404, msg: 'No article found'});
    }
    return article.rows
  })
}

function updateArticle(inc_votes, article_id) {
    return db.query( `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
    .then(({rows}) => {
      return rows[0]
    })
  }


module.exports = {listArticles, selectArticle, updateArticle};
