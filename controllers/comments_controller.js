const {listComments, insertComment} = require("../models/comment_model")


function getCommentsByArticleId(req, res, next) {
  const {article_id} = req.params
  listComments(article_id).then((comments) => {
    res.status(200).send({comments})
  }).catch((err) => {
    next(err)
  })
}

function postComment(req, res, next) {
  const { article_id } = req.params
  const commentData = req.body

  insertComment(article_id, commentData).then((comment) => {
    res.status(201).send({ comment })
  })
  .catch((err) => {
    next(err)
  })
}


module.exports = {getCommentsByArticleId, postComment}
