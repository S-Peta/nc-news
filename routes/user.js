const express = require("express");
const router = express.Router()

const {getUsers, getUserByUsername} = require("../controllers/users_controller")

router.get("/", getUsers)
router.get("/:username", getUserByUsername)

module.exports = router;
