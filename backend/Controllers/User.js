const  connection = require("../db/connect");


const saveReview=(req,res)=>{
    const{title, description, date, stars,product_id}=req.body;
    const sql="INSERT INTO  reviews (  title ,  description ,  date , stars ,product_id ) VALUES (?,?,?,?,?)";
    const VALUES=[title, description, date, stars,product_id];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"review has been inserted"})
    })
}
const fetchReviews=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM reviews WHERE product_id=?";
    const VALUES=[id];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"review has been inserted",data})
    })
}
const SelectProductUsingCategory=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM products WHERE category_id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
     return res.status(200).json({success:true,data:data})
    })
}
module.exports={saveReview,fetchReviews,
    SelectProductUsingCategory
}