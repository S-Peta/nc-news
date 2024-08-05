const express = require("express");
const getEndpoints = require("../controllers/endpoints_controller")
const cors = require('cors');

const userRoute = require("../routes/user")
const articlesRoute = require("../routes/articles")
const commentsRoute = require("../routes/comments")
const topicsRoute = require("../routes/topics")

const app = express()

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints)

app.use('/api/users', userRoute)
app.use('/api/articles', articlesRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/topics', topicsRoute)


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
