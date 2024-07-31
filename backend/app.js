
//using express
const express=require("express");
const multer=require("multer")
const path=require("path")
const cors = require('cors');
const app=express();

//using cookies
const cookieParser=require("cookie-parser");
app.use(cors());
app.use(cookieParser());

// forma json
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//
const {authJWT}=require("./middlewares/verifySingUp.js");
//public
app.use(express.static("public"));
// function from router
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

const SignUp=require("./router/SignUp.js");
const login=require("./router/SignIn.js");
const Admin=require("./router/Admin.js")
const User=require("./router/User.js");
app.use("/api/SignUp",SignUp);
app.use("/api/SignIn",login);
app.use("/api/Admin",authJWT,Admin);
app.use("/api/user",User)
app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log(req.body); // Should print the form data
    console.log(req.file); // Should print file metadata if the file upload is successful

    if (!req.files) {
        return res.status(400).json({ success: false, message: "File upload failed" });
    }

    return res.status(200).json({ success: true, file: req.file });
});




const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server is running in PORT ${PORT}`);
})