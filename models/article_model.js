const db = require("../db/connection")

function listArticles() {
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
      ORDER BY articles.created_at DESC;
    `;

  return db.query(queryStr).then((articlesData) => {
    console.log(articlesData.rows);
    return articlesData.rows;
  });
}

function selectArticle(id) {
  return db.query(`SELECT * FROM articles WHERE $1 = article_id`, [id])
  .then((result) => {
    return result.rows
  })

}

module.exports = {listArticles, selectArticle};
