const express = require("express");
const getTopics = require("../controllers/topics_controller");
const db = require("../db/data/test-data/index")
const topicData = require("../db/data/test-data/topics")
const endpoints = require("../endpoints.json")

const app = express()

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({endpoints: endpoints})
})

app.get("/api/topics", (req, res) => {
  res.status(200).send({topics: {topicData}})
});

module.exports = app
