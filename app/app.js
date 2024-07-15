const express = require("express");
const getTopics = require("../controllers/topics_controller");
const db = require("../db/data/test-data/index")
const topicData = require("../db/data/test-data/topics")
const app = express()

app.use(express.json());

app.get("/api/topics", (req, res) => {
  console.log(topicData);
  res.status(200).send({topics: {topicData}})
});

module.exports = app
