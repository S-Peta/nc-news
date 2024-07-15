const listTopics = require("../models/topic_model")

function getTopics(req, res) {
  listTopics()
  .then((topics) => {
    res.status(200).send({topics})
  })
  .catch(err => {
    res.status(500).send({ error: err.message });
  });
}


module.exports = getTopics;
