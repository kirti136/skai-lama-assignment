const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller.js");
const {
  validate,
  registerValidationRules,
  loginValidationRules,
} = require("../middlewares/validation.js");
const { verifyToken } = require("../middlewares/authentication.js");

// Register route
router.post(
  "/register",
  registerValidationRules(),
  validate,
  userController.register
);

// Login route
router.post("/login", loginValidationRules(), validate, userController.login);

// Me route
router.get("/me", verifyToken, userController.me);

// Logout route
router.post("/logout", verifyToken, userController.logout);

module.exports = router;
