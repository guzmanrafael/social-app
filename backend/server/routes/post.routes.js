const express = require("express");
const router = express.Router();

const post = require("../controllers/post.controller");
const upload = require("../libs/storage");

const { tokenVerification } = require("../middlewares/authentication");

router.get("/", tokenVerification, post.getPosts);
router.post("/", [tokenVerification, upload], post.createPost);
router.delete("/:id", tokenVerification, post.deletePost);
router.put("/:id", [tokenVerification, upload], post.editPost);

module.exports = router;
