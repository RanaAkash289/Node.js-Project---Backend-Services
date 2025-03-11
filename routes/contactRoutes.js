const express = require("express");
const router = express.Router();
const {getContact, createContact,getIndiContact, putContact, deleteContact} = require('../controllers/contactController');
const validateToekn = require("../middleWare/validateTokenHandler");

//defining api route seprately
// router.route("/").get(getContact);
// router.route("/").post(createContact);
// router.route("/:id").get(getIndiContact);
// router.route("/:id").put(putContact);
// router.route("/:id").delete(deleteContact);

//Here now it validate the token, if it is true then only user perform any operation
router.use(validateToekn);
//defining api route in group by analyzing path
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getIndiContact).put(putContact).delete(deleteContact);

module.exports = router;