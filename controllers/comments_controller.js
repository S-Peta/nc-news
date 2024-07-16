const listComments = require("../models/comment_model")

function getCommentsByArticleId(req, res, next) {
  const {article_id} = req.params
  listComments(article_id).then((comments) => {
    res.status(200).send({comments})
  }).catch((err) => {
    next(err)
  })
}

module.exports = getCommentsByArticleId
