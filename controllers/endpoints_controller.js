const endpoints = require("../endpoints.json")

function getEndpoints(req, res) {
  res.status(200).send({endpoints: endpoints})
}

module.exports = getEndpoints
