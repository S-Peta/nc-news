const express = require("express");
const getEndpoints = require("../controllers/endpoints_controller")

const userRoute = require("../routes/user")
const articlesRoute = require("../routes/articles")
const commentsRoute = require("../routes/comments")
const topicsRoute = require("../routes/topics")

const app = express()

app.use(express.json());

app.get("/api", getEndpoints)

app.use('/users', userRoute)
app.use('/articles', articlesRoute)
app.use('/comments', commentsRoute)
app.use('/topics', topicsRoute)


app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  }
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  else {
    // console.log(err);
    next(err);
  }
});


module.exports = app
