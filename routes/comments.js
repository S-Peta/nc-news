const express = require("express");
const router = express.Router()

const {deleteComment, patchComment}= require("../controllers/comments_controller")


router.patch("/:comment_id", patchComment)
router.delete("/:comment_id", deleteComment)

module.exports = router;
