const listTopics = require("../models/topic_model")

function getTopics(req, res, next) {
  listTopics()
  .then((topics) => {
    res.status(200).send({topics})
  })
  .catch((err) => {
    next(err)
  });
}


module.exports = getTopics;
