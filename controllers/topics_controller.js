const listTopics = require("../models/topic_model")

function getTopics(req, res) {
  console.log('from controller');
  listTopics()
  .then((result) => {
    console.log(result, 'result controller');
    res.status(200).json(result)
  })
  .catch(err => {
    console.error('Error in controller:', err);
    res.status(500).json({ error: err.message });
  });
}


module.exports = getTopics;
