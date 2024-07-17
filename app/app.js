const express = require("express");
const getTopics = require("../controllers/topics_controller");
const {getArticles, getArticleById, patchArticle} = require("../controllers/articles_controller")
const getEndpoints = require("../controllers/endpoints_controller")
const {getCommentsByArticleId, postComment, deleteComment}= require("../controllers/comments_controller")

const app = express()

app.use(express.json());

app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id", getArticleById)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticle)

app.delete("/api/comments/:comment_id", deleteComment)

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  }
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  else {
    next(err);
  }
});


module.exports = app
