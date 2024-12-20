const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

router.get("/login", userController.loginUser);
router.get("/register",userController.registerUser);
router.post("/register",userController.createUser);

module.exports = router;
