import { useDispatch} from "react-redux";
import { productAction } from "../../../store/product.Redux";
import CartUse from "../../Components/user/CartUse"
import getCarts from "../../util/getCarts"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Button from "../../Components/user/Ui-user/Button";
import {  SaveOrder } from "../../util/http";
export default function CartUser(){
    const [carts,setCart]=useState(getCarts());
    const dispatch=useDispatch();
    const data=useLoaderData();
    const profile=data.data[0];
    const totalPrice=carts?.reduce((acc,curr)=>{
        return +acc + +curr.totalPrice ;
    },0)
    console.log(Number.parseInt(totalPrice));
    function handelProduct(act,info){
        dispatch(productAction.HandelProduct({info:info,act:act}));
        console.log(carts);
        setCart(()=>getCarts());
      }
      
    function handelBuyProducts(){
     const date_order=new Date().toISOString();
     const status="Confirmed"
     const formData={date_order,status,total_amount:totalPrice};
     SaveOrder(formData);
     localStorage.removeItem("cart");
     dispatch(productAction.removeProduct())
     setCart(getCarts());
    }
    console.log(carts);
    return <div id="CartUser" className="flex flex-row  justify-around  items-start   w-full h-full ">
        <div id="Cart" className=" w-1/2 bg-white my-10 rounded-xl flex flex-col py-5 px-10 bg-wight h-4/5">
        <h1 className=" font-extrabold text-2xl mb-3">Cart</h1>
        <div className="flex flex-row justify-between w-full border-b-2 border-gray-300  mb-10">
            <p className=" text-gray-300">Product</p>
            <p className=" text-gray-300">Quantity</p>
            <p className=" text-gray-300">price</p>
        </div>
        {
           carts?.map((item)=>{
              return <div key={item.id} className="flex h-1/3 mb-5 gap-5   justify-between items-center">
              <CartUse  info={item} handelProduct={handelProduct}/>
              </div>
            })
        }
        <div className="flex justify-around w-full border-t mt-5 pt-2">
            <h1 className=" text-xl font-extrabold">Total</h1>
            <h1 className=" text-xl font-extrabold text-green-500">${totalPrice}</h1>
        </div>
        </div>
        <div id="OrderInformation" className=" h-4/5 mt-10 flex flex-col p-4 py-7 rounded-lg  justify-center w-2/5 bg-white items-center">
        <div>
            <h1 className=" font-extrabold text-2xl mb-3">Order Information</h1>
        </div>
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
         <Button className=" bg-black text-white w-3/5   mt-5" onClick={handelBuyProducts}>Continue To Payment</Button>
        </div>
    </div>
}