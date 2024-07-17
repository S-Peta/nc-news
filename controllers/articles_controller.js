const {listArticles, selectArticle} = require("../models/article_model")

function getArticles(req, res) {
  listArticles().then((articles) => {
    res.status(200).send({articles})
  })
}

function getArticleById(req, res, next) {
  const {article_id} = req.params
  selectArticle(article_id).then((article) => {
    res.status(200).send({article})
  }).catch((err) => {
    next(err)
  })
}

module.exports = {getArticles, getArticleById}
