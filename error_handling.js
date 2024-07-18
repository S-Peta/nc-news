
const express = require("express");
const app = express()

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
