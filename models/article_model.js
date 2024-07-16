const db = require("../db/connection")

function listArticles() {
  return db.query(`SELECT * FROM articles`).then((articlesData) => {
    console.log(articlesData.rows);
    return articlesData.rows;
  })
}

function selectArticle(id) {
  return db.query(`SELECT * FROM articles WHERE $1 = article_id`, [id])
    .then((result) => {
      return result.rows
    })

}

module.exports = {listArticles, selectArticle};
