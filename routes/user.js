const express = require("express");
const router = express.Router()

const getUsers = require("../controllers/users_controller")

router.get("/", getUsers)

module.exports = router;
