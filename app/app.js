const express = require("express");
const getTopics = require("../controllers/topics_controller");
const {getArticles, getArticleById} = require("../controllers/articles_controller")
const getEndpoints = require("../controllers/endpoints_controller")
const {getCommentsByArticleId, postComment}= require("../controllers/comments_controller")

const app = express()

app.use(express.json());

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postComment)

app.use((err, req, res, next) => {
  if(err.status && err.msg) {
    res.status(err.status).send({msg: err.msg})
  }

  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else next(err);
});

module.exports = app
