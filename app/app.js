const express = require("express");
const getTopics = require("../controllers/topics_controller");
const {getArticles, getArticleById} = require("../controllers/articles_controller")
const getEndpoints = require("../controllers/endpoints_controller")
const getCommentsByArticleId = require("../controllers/comments_controller")

const app = express()

app.use(express.json());

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

module.exports = app
