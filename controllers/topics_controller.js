const {listTopics, insertTopic} = require("../models/topic_model")

function getTopics(req, res, next) {
  listTopics()
  .then((topics) => {
    res.status(200).send({topics})
  })
  .catch((err) => {
    next(err)
  });
}

function postTopic(req, res, next) {
  const topicData = req.body

  insertTopic(topicData).then((topic) => {
    res.status(201).send({topic})
  }).catch(next)
}


module.exports = {getTopics, postTopic};
