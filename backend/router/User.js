const express=require("express");
const router=express.Router();

const {saveReview,fetchReviews,
    SelectProductUsingCategory
}=require("../Controllers/User")
router.route("/review").post(saveReview);
router.route("/review/:id").get(fetchReviews);
router.route("/product/:id").get(SelectProductUsingCategory)
module.exports=router;