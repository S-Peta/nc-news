const {listArticles, selectArticle, updateArticle} = require("../models/article_model")

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

function patchArticle(req, res, next) {
  const {article_id} = req.params
  const {inc_votes} = req.body

  updateArticle(inc_votes, article_id).then((article) => {
    if(article === undefined) {
      return Promise.reject({status: 404, msg: 'Article not found'})
    } else {
      res.status(200).send({article})
    }
  }).catch((err) => {
    next(err)
  })
}

module.exports = {getArticles, getArticleById, patchArticle}
