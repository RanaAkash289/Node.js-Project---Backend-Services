const express = require("express");
const {registerUser, loginUser, currentUser} = require("../controllers/userController");
const validateToekn = require("../middleWare/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/current", validateToekn, currentUser);

module.exports = router;