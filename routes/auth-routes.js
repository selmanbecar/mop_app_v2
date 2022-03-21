const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controllers");

// Routes for auth /api/

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/validate", authController.validate);

module.exports = router;