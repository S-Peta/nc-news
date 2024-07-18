const {listArticles, selectArticle, updateArticle} = require("../models/article_model")

function getArticles(req, res, next) {
  const {sort_by, order, topic} = req.query
  listArticles(sort_by, order, topic).then((articles) => {
    res.status(200).send({articles})
  }).catch(next)
}

function getArticleById(req, res, next) {
  const {article_id} = req.params
  selectArticle(article_id).then((article) => {
    res.status(200).send({article})
  }).catch(next)
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
  }).catch(next)
}

module.exports = {getArticles, getArticleById, patchArticle}
