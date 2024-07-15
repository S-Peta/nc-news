const express = require("express");
const getTopics = require("../controllers/topics_controller");
const getArticle = require("../controllers/articles_controller")
const endpoints = require("../endpoints.json")

const app = express()

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({endpoints: endpoints})
})

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticle)

module.exports = app
