import { QueryClient } from "@tanstack/react-query";
import axios from 'axios';
import getAuthToken from "./auth";
import getCarts from "./getCarts";


export const queryClient=new QueryClient();
const token=getAuthToken();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

export default async function fetchProducts(){
const token=getAuthToken();
const response=await fetch("http://localhost:5000/api/Admin/product",{
    method:"GET",
    headers:{
        "Authorization": `Bearer ${token}`
    }
});
const data=await response.json();
return data;
} 


export async function fetchProduct(id){
    const token=getAuthToken();
const response=await fetch(`http://localhost:5000/api/Admin/product/${id}`,{
    method:"GET",
    headers:{
        "Authorization": `Bearer ${token}`
    }
})
const data=response.json();
return data;
}


export async function fetchCategories(){
    const token=getAuthToken();
    const response=await fetch("http://localhost:5000/api/Admin/category",{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });
    const data=response.json();
    return data
}

export async function SaveCategories(data) {
    const token = getAuthToken();
    const response = await fetch("http://localhost:5000/api/Admin/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
        // Handle error here
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
}


export async function fetchCategory(id){
    const token=getAuthToken();
    const response=await fetch("http://localhost:5000/api/Admin/category/"+id,{
        method:"GET",
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    );
    const data=response.json();
    console.log(data)
    return data
}

export async function UpdateCategory({id,formData}){
    const token=getAuthToken();
    await fetch("http://localhost:5000/api/Admin/category/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(formData)
        }
    );
    return null
}

export async function DeleteData({name,id,type}){
    const token=getAuthToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
let url="http://localhost:5000/api/Admin/";
if(name){
    try{
        //SELECT all id of properityes from prop using name and id-category
        let response = await fetch(`http://localhost:5000/api/Admin/prop/name/${encodeURIComponent(name)}?id=${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const data=await response.json();
        const Allprop=data?.data.map(item=>item.id);
        console.log(Allprop);
        // fetch all id of product using id_category to now all product who has category 
        response=await axios.get("http://localhost:5000/api/Admin/product/category/"+id);
        let idProducts=response?.data?.data ;
        let info=idProducts.map(item=>item.id);
        console.log(info);
        let verify=info.map(async(item)=>{
            //select all prop from product using id of product 
            response=await fetch("http://localhost:5000/api/Admin/product/propUseId/"+item,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                },
            });
            let data=await response.json();
            data=data.data[0].properties;
            data=data.split(",");
            data=data.map((item)=>{
                return +item
            })
            data=data.filter(ele=> !Allprop.includes(ele))
            data=data.filter(ele=> ele!==0);
            data=data.join(",")
            response=await axios.put("http://localhost:5000/api/Admin/product/properties/"+item,{properties:data})
            return data;
        })
        verify=await Promise.all(verify);
        console.log(verify);
        await fetch(url+type,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({name,id})
        })
    }catch(err){
        console.log(err);
    }
       
}else{
    await fetch(url+type+"/"+id,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
    })
}

return null
}

export async function DeletePropertyFromProdcut({id_product,id}){
    const token=getAuthToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
let response=await fetch("http://localhost:5000/api/Admin/product/propUseId/"+id_product,{
    method:"GET",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
    },
});
let data=await response.json();
data=data.data[0].properties;
console.log(data);
data=data.split(",");
console.log(data);
data=data.map((item)=>{
    return +item
})
data=data.filter((item)=>item!==id);
console.log(data);
data=data.join(",")
console.log(data)
console.log(id_product);
response=await axios.put("http://localhost:5000/api/Admin/product/properties/"+id_product,{properties:data})
return data;
}
export async function SaveProperty({formData}){
    const token=getAuthToken();
    let url="http://localhost:5000/api/Admin/property";
    let response=await fetch(url,{
        method:"POST",
        headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(formData)
    })
    let data =await response.json();
    const id=data?.data.insertId;
    console.log(id);
    const id_category=formData.id_category;
    response=await fetch("http://localhost:5000/api/Admin/product/property/"+id_category,{
        method:"GET",
        headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
    });
    data=await response.json();
    const info=data?.data.map((item)=>{
        const newProperties=item.properties+","+id;
        return {id:item.id,properties:newProperties}
    });
     info.forEach(async(element) => {
        response=await fetch("http://localhost:5000/api/Admin/product/property",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            },
            body:JSON.stringify(element)
        })
        data=response.json();
        console.log(data);
     }); 
    
    return null ;
}

export async function fetchProperties(id){
    const token=getAuthToken();
  const response=await fetch("http://localhost:5000/api/Admin/property/"+id,{
    method:"GET",
    headers:{
        "Authorization": `Bearer ${token}`
    }
  })
  const data=await response.json();
  return data;
}
export async function fetchPropertyUseId(prop){
 const token=getAuthToken();
 const info=prop.map(async(item)=>{
    const id=+item;
    const response=await fetch("http://localhost:5000/api/Admin/property/product/"+id,{
        method:"GET",
        headers:{
           "Content-Type":"application/json",
           "Authorization":"Bearer "+token 
        }
    }
    )
    const data=await response.json();
    return data.data[0];
 })
  let infoProp=await Promise.all(info);
  infoProp=infoProp.filter((ele)=>ele!==undefined);
  console.log(infoProp);
  let AllProp=new Set(infoProp.map(item=>item.name));
  AllProp=[...AllProp];
  return {property:[...infoProp],AllProp:AllProp};
}
export async function fetchPropUseCategoryId(name,id_Category){
    const token=getAuthToken();
    axios.defaults.headers.common["Authorization"]="Bearer "+token;
    let response=await axios.get("http://localhost:5000/api/Admin/property/propId/"+id_Category);
    let data=response?.data?.data;
    data=data.find(item=>item.description===name);
    return data

}
export async function fetchAllAdmins(){
    const token=getAuthToken();
const response= await fetch("http://localhost:5000/api/Admin/AllAdmins",{
    method:"GET",
    headers:{
        "Authorization": `Bearer ${token}`
    }
});
 const data= await response.json();
 return data
}


export async function updateProduct(data, method, id) {
    let url = "http://localhost:5000/api/Admin/product";
    const id_Category=data.get("category_id");
    try {
        let response;
        response= await axios.get("http://localhost:5000/api/Admin/property/propId/"+id_Category);
        let properties=response?.data?.data 
        let info=properties.map(item=>item.id).join(",");
        const fd={
            name:data.get("name"),
            description:data.get("description"),
            price:data.get("price"),
            stock_quantity:data.get("stock_quantity"),
            category_id:data.get("category_id"),
            properties:info
           }
        if (method === "POST") {
            response = await axios.post(url,fd,{
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const id=response.data.data.insertId;
            response= await axios.post("http://localhost:5000/api/Admin/image/"+id, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        } else 
        if (method === "PUT") {
            response = await axios.put(url+"/"+id, fd);
            response= await axios.post("http://localhost:5000/api/Admin/image/"+id, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        }
        queryClient.invalidateQueries(["products"]); // Assuming queryClient is correctly defined
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error; // Optional: re-throw the error for the caller to handle
    }
}

export async function fetchImages(id){
    const token=getAuthToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    let data=[];
    try{
        const response=await axios.get("http://localhost:5000/api/Admin/image/"+id);
         data= await response.data;
        return data;
    }catch(error){
        console.log(error.message);
        return null
    }
    
   
    
}


export async function handelDeleteImage(id){
try{
   const response=await fetch("http://localhost:5000/api/Admin/image/"+id,{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
   });
   const data=await response.json();
   return data;
}catch(error){
  return error.message;
}
}

export async function SaveReview(formData,id){
    const token=getAuthToken();
    const response=await fetch("http://localhost:5000/api/User/review",{
        method:"POST",
        headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " +token
        },
        body:JSON.stringify(formData),
    })
    queryClient.invalidateQueries(["Reviews",id])
    return null;
}

export async function fetchReviews(id){
    const response=await fetch("http://localhost:5000/api/User/review/"+id);
    const data= await response.json();
    return data;
}

export async function fetchProductCategory(id){
    try{
        const response=await fetch(`http://localhost:5000/api/User/product/${id}`);
        const data=await response.json();
        console.log(data);
        return data;
    }catch(err){
     console.log(err);
     return null
    }

}


export async function SaveOrder(formData){
const token=getAuthToken();
const allCarts=getCarts();
axios.defaults.headers.Authorization="Bearer "+token;
try{
    let data= await axios.post("http://localhost:5000/api/Admin/order",formData);
    let idOrder=data.data.data.insertId;
    console.log(idOrder);
    let carts=allCarts.map(async(item)=>{
        let {id,price,counter}=item;
        console.log(id);
        let data={product_id:id, quantity:counter, price:price}
        let response=await axios.post("http://localhost:5000/api/Admin/orderItem/"+idOrder,data);
        return response;
    })
    return await Promise.all(carts);
}catch(err){
    console.log(err)
}

}

export async function fetchOrders(){
    const token=getAuthToken();
    axios.defaults.headers.Authorization="Bearer "+token;
    try{
        let response=await axios.get("http://localhost:5000/api/Admin/order");
        let data= response.data.data;
        return data;
    }catch(err){
        console.log(err);
        return null
    }
}
export async function fetchOrdersForAdmin(){
    const token=getAuthToken();
    axios.defaults.headers.Authorization="Bearer "+token;
    try{
        let response=await axios.get("http://localhost:5000/api/Admin/orderForAdmin");
        let data= response.data.data;
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        return null
    }
}

export async function fetchOrdersItem(id){
    const token=getAuthToken();
    axios.defaults.headers.Authorization="Bearer "+token;
    try{
        let response=await axios.get("http://localhost:5000/api/Admin/orderItem/"+id);
        let data=[...response.data.data]
         response=data.map(async (item)=>{
            let id=item.product_id;
            return await axios.get(`http://localhost:5000/api/Admin/product/${id}`)
         });
         response= await Promise.all(response);
         data = {
            data: [...data],
            product: [...response]
          };
          
         
        return data;
    }catch(err){
        console.log(err);
        return null
    }
}

export async function updatePage({id}){
    console.log(id);
    const token=getAuthToken();
    axios.defaults.headers.common["Authorization"]="Bearer "+token;
    const response=await axios.put("http://localhost:5000/api/Admin/pageHome/"+id);
    return response;
}
export async function fetchProductShow(){
    const token=getAuthToken();
    axios.defaults.headers.common["Authorization"]="Bearer "+token;
    const response =await axios.get("http://localhost:5000/api/Admin/pageHome");
    const data=response.data.data;
    return data
}

export async function fetchProfile(id){
    const token=getAuthToken();
    axios.defaults.headers.common["Authorization"]="Bearer "+token;
    const response =await axios.get("http://localhost:5000/api/Admin/profile/"+id);
    const data=response.data.data;
    return data

}

export async function saveAdmin({email,password}){
    const token=getAuthToken();
    axios.defaults.headers.common["Authorization"]="Bearer "+token;
    const response= await axios.post("http://localhost:5000/api/Admin/Save",{email,password});
    return response.data;
}