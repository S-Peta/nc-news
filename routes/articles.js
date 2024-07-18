const express = require("express");
const router = express.Router()

const {getArticles, getArticleById, patchArticle} = require("../controllers/articles_controller")
const {getCommentsByArticleId, postComment}= require("../controllers/comments_controller")

router.get("/", getArticles)

router.get("/:article_id", getArticleById)

router.get("/:article_id/comments", getCommentsByArticleId)

router.post("/:article_id/comments", postComment)

router.patch("/:article_id", patchArticle)

module.exports = router;
