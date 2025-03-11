const express = require("express");
const {registerUser, loginUser, currentUser} = require("../controllers/userController");
const validateToekn = require("../middleWare/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);

//Here we add validatetoekn fucntion to check that the customer who try to perform operation has valid token.
router.get("/current", validateToekn, currentUser);

module.exports = router;