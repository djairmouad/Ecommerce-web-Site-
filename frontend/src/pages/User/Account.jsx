import { useQuery } from "@tanstack/react-query";
import { Form, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { fetchOrders } from "../../util/http";
import OrderUser from "../../Components/user/OrderUser";
import Button from "../../Components/user/Ui-user/Button";
import getAuthToken from "../../util/auth";


export default function Account(){
    const {data:orders,isLoading,isError}=useQuery({
        queryKey:["orders"],
        queryFn:fetchOrders
    })
    let allOrders=orders || []
    let profile=useLoaderData();
    const navigate = useNavigate();
     profile=profile.data[0];
    if(isLoading){
        return <p>Loading..</p>
    }
    
    function handelLogout(){
        console.log("hello")
        navigate("/admin/logout");
    }
    return  <div id="CartUser" className="flex flex-row  justify-around  items-start   w-full h-full ">
            <div id="Cart" className="  w-2/5 bg-white my-10 rounded-xl flex flex-col py-5 px-10 bg-wight h-4/5">
        <h1 className=" font-extrabold text-2xl mb-3">Orders</h1>
        {allOrders?.map((item)=>{
            return <OrderUser key={item.id} info={item}/>
        })}
        </div>
        <div id="OrderInformation" className=" h-4/5 mt-10 flex flex-col p-4 py-7 rounded-lg  justify-center w-2/5 bg-white items-center">
        <div>
            <h1 className=" font-extrabold text-2xl mb-3">Account Details</h1>
        </div>
        <Form method="PUT" className=" w-full flex flex-col items-center">
        <div id="box" className="flex flex-col w-4/5 items-center" >
            <label htmlFor="username">USERNAME:</label>
            <input className=" rounded-lg w-3/4 pl-1 bg-slate-300"  id="username" name="username" defaultValue={profile.username}/>
         </div>
         <div id="box" className="flex flex-col w-4/5 items-center">
            <label htmlFor="email">EMAIL:</label>
            <input className=" rounded-lg w-3/4 pl-1 bg-slate-300" id="email" name="email" defaultValue={profile.email}/>
         </div>
         <div id="box" className="flex flex-col w-4/5 items-center">
            <label htmlFor="first_name">First Name:</label>
            <input className=" rounded-lg w-3/4 pl-1 bg-slate-300" id="first_name" name="first_name" defaultValue={profile.first_name}/>
         </div>
         <div id="box" className="flex flex-col w-4/5 items-center">
            <label htmlFor="last_name">LAST NAME:</label>
            <input className=" rounded-lg w-3/4 pl-1 bg-slate-300" id="last_name" name="last_name" defaultValue={profile.last_name}/>
         </div>
         <div id="box" className="flex flex-col w-4/5 items-center">
            <label htmlFor="address">ADDRESS:</label>
            <input className=" rounded-lg w-3/4 pl-1 bg-slate-300" id="address" name="address" defaultValue={profile.address}/>
         </div>
         <div id="box" className="flex flex-col w-4/5 items-center">
            <label htmlFor="phone_number">PHONE NUMBER:</label>
            <input className=" rounded-lg w-3/4 pl-1 bg-slate-300" id="phone_number" name="phone_number" defaultValue={profile.phone_number}/>
         </div>
         <input type="hidden" name="id" value={profile.id}/>
         <button className=" bg-black text-white w-5/12 mt-3 h-8 rounded ">EDIT</button>
         </Form>
         <div className="w-full flex justify-center">
         <Button onClick={handelLogout} className=" w-5/12 bg-green-800  text-white mt-5">Logout</Button>
         </div>
        </div>
    </div>
}
export async function action({request}){
    const formData= await request.formData();
    const method=request.method;
    const token=getAuthToken();
    const data={
        id:formData.get("id"),
        username:formData.get("username"),
        email:formData.get("email"),
        first_name:formData.get("first_name"),
        last_name:formData.get("last_name"),
        address:formData.get("address"),
        phone_number:+formData.get("phone_number")
       }
    await fetch("http://localhost:5000/api/Admin/profile",{
        method:method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(data)

    })
      
    return null
}