const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
