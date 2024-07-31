const express=require("express");
const multer=require("multer")
const path=require("path")
const router=express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/image");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
});


const {Profile,UpdateProfile,AllAdmins,saveAdmin,DeleteAdmin,getProfile,
    InsertCategory,SelectAllCategorys,SelectCategory,ModifyCategory,DeleteCategory
    ,InsertProduct,GetAllProducts,ModifyProduct,GetProduct,DeleteProduct,
    selectProductUseCateg,selectPropUseIdPropduct,
    InsertImage,fetchImages,DeleteImage,
    InsertProperty,fetchProperty,UpdateProperty,DeleteProperty,fetchPropertyUseId,
    fetchPropertyUseIdCategory,
    SelectPropFromProduct,updatePropProduct
    ,orders,orderForAdmin,saveOrders,orderId,saveOrderItem,orderItem,
    fetchIdPropByName,UpdatePropAfterDelet
    ,updatePage,fetchProductShow
}=require("../Controllers/Admin.js");

    
router.route("/profile").get(Profile).put(UpdateProfile);
router.route("/profile/:id").get(getProfile);
router.route("/Save").post(saveAdmin);
router.route("/pageHome/:id").put(updatePage);
router.route("/pageHome").get(fetchProductShow);
router.route("/AllAdmins").get(AllAdmins)
router.route("/DeleteAdmin/:id").delete(DeleteAdmin)
router.route("/category").post(InsertCategory).get(SelectAllCategorys);
router.route("/category/:id").put(ModifyCategory).get(SelectCategory).delete(DeleteCategory);
router.route("/property").post(InsertProperty).delete(DeleteProperty);
router.route("/property/:id").put(UpdateProperty).get(fetchProperty);
//Select Prop form products using id properties 
router.route("/property/product/:id").get(fetchPropertyUseId);
// select all id prop  from prop using id_Category
router.route("/property/propId/:id").get(fetchPropertyUseIdCategory);
//Select Prop form products using id category 
router.route("/product/property/:id").get(SelectPropFromProduct);
router.route("/product/propUseId/:id").get(selectPropUseIdPropduct);
// Update Prop in product using id of product 
router.route("/product/property").put(updatePropProduct)
router.route("/product").post(InsertProduct).get(GetAllProducts);
router.delete("/product/:id",DeleteProduct);
router.get("/product/:id",GetProduct);
router.get("/product/category/:id",selectProductUseCateg);
router.put("/product/:id",ModifyProduct);
router.put("/product/properties/:id",UpdatePropAfterDelet);
router.post("/image/:id",upload.single("imageProduct"), InsertImage);
router.route("/image/:id").delete(DeleteImage);
router.get("/image/:id",fetchImages);
router.route("/order").get(orders);
router.route("/orderForAdmin").get(orderForAdmin);
router.route("/order").post(saveOrders);
router.route("/order/:id").get(orderId);
router.route("/orderItem/:id").post(saveOrderItem);
router.route("/orderItem/:id").get(orderItem);

/// fetch id prop by name 
router.route("/prop/name/:name").get(fetchIdPropByName);
module.exports=router;
