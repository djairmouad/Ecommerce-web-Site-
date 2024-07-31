//connection
const connection=require("../db/connect");

const SignUp =(req,res)=>{
const {username, email, password, first_name, last_name, address, phone_number, type}=req.body;
const sql="INSERT INTO `users`( `username`, `email`, `password`, `first_name`, `last_name`, `address`, `phone_number`, `type`) VALUES (?,?,?,?,?,?,?,?)";
const VALUES=[username, email, password, first_name, last_name, address, phone_number, type];
connection.query(sql,VALUES,(err,data)=>{
    if(err){
       return res.status(500).json({success:false});
    }
    res.status(200).json({success:true});
})
}

module.exports={SignUp};