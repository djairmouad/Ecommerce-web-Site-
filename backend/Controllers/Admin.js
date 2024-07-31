const connection=require("../db/connect.js");
const Profile=(req,res)=>{
const {id}=req.user;
const sql="SELECT * FROM users WHERE id=?";
const value=[id];
connection.query(sql,value,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err});
    }
    res.status(200).json({success:true,data});
})
}
const getProfile=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM users WHERE id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err});
        }
        res.status(200).json({success:true,data});
    })   
}
const EditeProfile=(req,res)=>{
const {id,username,email,first_name,last_name,address,phone_number}=req.body;
console.log(id);
const sql="UPDATE users SET username=?,email=?,first_name=?,last_name=?,address=?,phone_number=? WHERE id=?"
const VALUES=[username,email,first_name,last_name,address,phone_number,id];
connection.query(sql,VALUES,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err})
    }
    res.status(200).json({success:true,data})
})
}
const UpdateProfile=(req,res)=>{
    
    const{id,username, email, first_name, last_name, address, phone_number}=req.body;
    const sql="UPDATE users SET username=?,email=?,first_name=?,last_name=?,address=?,phone_number=? WHERE id=?";
    const value=[username, email, first_name, last_name, address, phone_number,id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err});
        }
        res.status(200).json({success:true,message:"Data has been Updated",data});
        console.log("Edit successfully");
    })
}
const AllAdmins=(req,res)=>{
const sql="SELECT * FROM admins";
connection.query(sql,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err});
    }
    res.status(200).json({success:true,data});
})
}
const saveAdmin=(req,res)=>{
 const {email,password}=req.body;
 const sql="INSERT INTO admins( email, password, type) VALUES (?,?,?)";
 const value=[email,password,"Admin"];
 connection.query(sql,value,(data,err)=>{
    if(err){
        return res.status(500).json({success:false,message:err})
    }
   res.status(200).json({success:true,data})
})
}
const DeleteAdmin=(req,res)=>{
    const {id}=req.params;
    const sql="DELETE FROM admins WHERE id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
        return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"Success Delete"});
    })
}

const InsertCategory=(req,res)=>{
    const {name,description}=req.body;
    const sql="INSERT INTO category (name, description) VALUES (?,?)";
    const VALUES=[name,description];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        return res.status(200).json({success:true,message:"Data has been Inserted",data});
    })

}
const SelectAllCategorys=(req,res)=>{
const sql="SELECT * FROM category";
connection.query(sql,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err});
    }
    res.status(200).json({success:true,message:"name Categorys has been Selected",data});
})
}
const SelectCategory=(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM category WHERE id=?";
    const value=[id];
connection.query(sql,value,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err});
    }
    res.status(200).json({success:true,message:"Category has been Selected",data});
})
}
const DeleteCategory=(req,res)=>{
    const id=req.params.id;
    const sql="DELETE  FROM category WHERE id=?";
    const value=[id];
connection.query(sql,value,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err});
    }
    res.status(200).json({success:true,message:"Category has been Deleted"});
})
}
const ModifyCategory=(req,res)=>{
const {id}=req.params;
const {name, description}=req.body;
const sql="UPDATE category SET name=?,description=? WHERE id=?";
const value=[name, description,id];
connection.query(sql,value,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err})
    }
    res.status(200).json({success:true,data,message:"Category has been  modified"})
})
}
const SelectPropFromProduct=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT id,properties FROM products WHERE category_id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,data})
    })
}
const updatePropProduct=(req,res)=>{
    const {properties,id}=req.body;
    const sql="UPDATE products SET properties=? WHERE id=?";
    const value=[properties,id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,data})
    })
}
const InsertProperty=(req,res)=>{
    const {name, description, id_category}=req.body;
    const sql="INSERT INTO property(name, description, id_category) VALUES (?,?,?)";
    const value=[name, description, id_category];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"Property has been Inserted",data})
    })
}
const fetchProperty=(req,res)=>{
    const {id}=req.params;
    const sql=`SELECT id,name, GROUP_CONCAT(description ORDER BY description SEPARATOR ', ') AS descriptions
FROM property
WHERE id_category = ${id}
GROUP BY name;
`;
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"Propertys has been fetched",data})
    })
}
//fetch prop from properity using Id proprity
const fetchPropertyUseId=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * from property WHERE id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err.message})
        }
       res.status(200).json({success:true,data:data})
    })

}
//fetch prop using id Category
const fetchPropertyUseIdCategory=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * from property WHERE id_category=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err.message})
        }
       res.status(200).json({success:true,data:data})
    })

}
//fetch propy from product using id Product 
const selectPropUseIdPropduct=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT properties from products WHERE  id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err.message})
        }
       res.status(200).json({success:true,data:data})
    })

}
const UpdateProperty=(req,res)=>{
    const {name, description, id_category}=req.body;
    const {id}=req.params;
    const sql="UPDATE property SET name=?,description=?,id_category=? WHERE id=?";
    const value=[name, description, id_category,id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"Property has been Updated",data})
    })
}
const DeleteProperty=(req,res)=>{
    const {name,id}=req.body;
    const sql="DELETE FROM property WHERE name=? AND id_category=?";
    const value=[name,id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"Property has been Deletd",data})
    })
}
const InsertProduct=(req,res)=>{
    const {name, description, price, stock_quantity, category_id,properties}=req.body;
    const sql="INSERT INTO products( name, description, price, stock_quantity, category_id,properties) VALUES (?,?,?,?,?,?)"
    const VALUES=[name, description, price, stock_quantity, category_id,properties];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"the product has been inserted",data});
    })
}
const GetAllProducts=(req,res)=>{
    const sql="SELECT * FROM products ";
    connection.query(sql,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        if(data.length===0){
           return res.status(200).json({success:false,data,message:"No Data Data"})
        }
        res.status(200).json({success:true,data,message:"All product has fteched"})
    })
}
const GetProduct=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * from products WHERE id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err.message})
        }
       res.status(200).json({success:true,data:data})
    })
}
// select Product id use CategoryID
const selectProductUseCateg=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT id from products WHERE category_id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err.message})
        }
       res.status(200).json({success:true,data:data})
    })
}
const DeleteProduct=(req,res)=>{
    const {id}=req.params;
    const sql="DELETE from products WHERE id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err.message})
        }
       res.status(200).json({success:true,message:"product has been deleted"})
    })
}
const ModifyProduct=(req,res)=>{
    const {id}=req.params;
    const {name,description,price,stock_quantity,category_id,properties}=req.body;
    const sql="UPDATE products SET name=?,description=?,price=?,stock_quantity=?,category_id=?,properties=? WHERE id=?";
    value=[name,description,price,stock_quantity,category_id,properties,id];
      connection.query(sql,value,(err,data)=>{
        if(err){
           return res.status(500).json({success:false,message:err});
        }
        res.status(200).json({success:true,data,message:"the product has been modify"})
       })
}
const InsertImage=(req,res)=>{
    try{
        if(req.file){
            const name=req.file.filename;
            const id=req.params.id;
            const sql="INSERT INTO image_product (product_id , name) VALUES (?,?)";
            const value=[id,name];
            connection.query(sql,value,(err,data)=>{
                if(err){
                    return res.status(500).json({success:false,message:err})
                }
               return res.status(200).json({success:true,message:"image hase been insterted",data})
            })
        }else{
          return res.status(200).json({success:true,message:"no image hase been insterted"})
        }
        
    }catch(err){
        console.log(err.message);
        return res.status(500).json({success: false, message: "An error occurred"});
    }
    
}
const fetchImages=(req,res)=>{
    const id=req.params.id;
    const sql="SELECT * FROM image_product WHERE product_id=?";
    const value=[id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        } 
        res.status(200).json({success:true,data,message:"images has been fetched"})
    })
}
const DeleteImage=(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM image_product WHERE id=?";
    const values=[id];
    connection.query(sql,values,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"image has been deleted",data})
    })
}
const orders=(req,res)=>{
    const id=req.user.id
    const sql="SELECT * FROM orders WHERE user_id=?";
    const value=[id]
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"all orders",data})
    })
}
const orderForAdmin=(req,res)=>{
    const sql="SELECT * FROM orders";
    connection.query(sql,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,message:"all orders",data})
    })
}
const saveOrders=(req,res)=>{
    const {id}=req.user;
    const {date_order,status,total_amount}=req.body;
    const sql="INSERT INTO  orders( user_id , date_order , status, total_amount) VALUES (?,?,?,?)";
    const value=[id,date_order,status,total_amount];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,data,message:"order has been inserted"})
    })
}
const orderId=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM orders WHERE id=?";
    const VALUES=[id];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        if(data.length===0){
            return res.status(404).json({success:true,message:"there is no order"})
        }
        res.status(200).json({success:true,message:"the order",data});
    })
}
const orderItem=(req,res)=>{
    const {id}=req.params;
    const sql="SELECT * FROM order_items WHERE order_id=?";
    const VALUES=[id];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        if(data.length===0){
            return res.status(404).json({success:true,message:"there is no order"})
        }
        res.status(200).json({success:true,message:"the order",data});
    })
}
const saveOrderItem=(req,res)=>{
const {id}=req.params;
const {product_id, quantity, price}=req.body;
const sql="INSERT INTO order_items( order_id, product_id, quantity, price) VALUES (?,?,?,?)"
const value=[id, product_id, quantity, price];
connection.query(sql,value,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err})
    }
    res.status(200).json({success:true,data,message:"save orderItem"})
})
}
const fetchIdPropByName=(req,res)=>{
    const {name}=req.params;
    const {id}=req.query;
    console.log(id);
    const sql="SELECT id FROM property WHERE (name=? AND id_category=?)";
    const VALUES=[name,id];
    connection.query(sql,VALUES,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,data});
    })
}
// Update Properity on product After Delete
const UpdatePropAfterDelet=(req,res)=>{
    const {id}=req.params;
    const {properties}=req.body;
    const sql="UPDATE products SET  properties=? WHERE id=?";
    const value=[properties,id];
    connection.query(sql,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,data})
    })
}
/// handel Product for page home 
const updatePage=(req,res)=>{
    const {id}=req.params;
const sql1="UPDATE `products` SET `show`=null"
const sql2="UPDATE `products` SET `show`=1 WHERE id=?;"
const value=[id];
connection.query(sql1,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err})
    }
    connection.query(sql2,value,(err,data)=>{
        if(err){
            return res.status(500).json({success:false,message:err})
        }
        res.status(200).json({success:true,data})
    })
    
})
}
/// handel product who has show=1
const fetchProductShow=(req,res)=>{
const sql="SELECT * FROM products WHERE `show`=1 ";
connection.query(sql,(err,data)=>{
    if(err){
        return res.status(500).json({success:false,message:err})
    }
    res.status(200).json({success:true,data})
})
}
module.exports={Profile,EditeProfile,AllAdmins,saveAdmin,DeleteAdmin,UpdateProfile,getProfile,
    InsertCategory,SelectAllCategorys,SelectCategory,ModifyCategory,DeleteCategory
    ,InsertProduct,GetAllProducts,ModifyProduct,GetProduct,DeleteProduct,
    selectProductUseCateg,selectPropUseIdPropduct,
    InsertImage,fetchImages,DeleteImage,
    InsertProperty,fetchProperty,UpdateProperty,DeleteProperty,fetchPropertyUseId,
    fetchPropertyUseIdCategory,
    SelectPropFromProduct,updatePropProduct
    ,orders,orderForAdmin,saveOrders,orderId,saveOrderItem,orderItem,
    fetchIdPropByName,UpdatePropAfterDelet,
    updatePage,fetchProductShow
}