const express = require("express");
const router = express.Router();

const upload = require("../libs/storage");
const user = require("../controllers/user.controller");

const { tokenVerification } = require("../middlewares/authentication");

router.get("/:id", user.getUser);
router.post("/", upload, user.createUser);
router.put("/:id", [tokenVerification, upload], user.editUser);

module.exports = router;
