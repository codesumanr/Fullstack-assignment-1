const express = require("express");
const router = express.Router();
const adminController = require("./controller");

router.get("/login", adminController.loginForm);
router.post("/login", adminController.login);
router.get("/logout", adminController.logout);
router.get("/register", adminController.registerForm);
router.post("/register", adminController.register);
router.get("/", adminController.adminPage);

module.exports = router;
