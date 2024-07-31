const express=require("express");
const router=express.Router();
const {SignUp}=require("../Controllers/SignUp");
router.route("/").post(SignUp);

module.exports=router;