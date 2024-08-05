const express = require("express");
const router = express.Router()

const {getTopics, postTopic} = require("../controllers/topics_controller");

router.get("/", getTopics)

router.post("/", postTopic)

module.exports = router;
