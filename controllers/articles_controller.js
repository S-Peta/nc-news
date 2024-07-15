const selectArticle = require("../models/article_model")

function getArticle(req, res) {
  const {article_id} = req.params

  selectArticle(article_id).then((article) => {
    res.status(200).send({article})
  })
}

module.exports = getArticle
