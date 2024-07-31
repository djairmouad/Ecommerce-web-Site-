import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { fetchOrdersItem } from "../../util/http";

export default function OrderUser({info}){
    let profile=useLoaderData();
    let {date_order:date,id}=info;
    const {data:Orders,isLoading,isError}=useQuery({
        queryKey:["orderItem",id],
        queryFn:()=>fetchOrdersItem(id)
    })
    const product=Orders?.product?.map((item)=>{
        return item.data.data[0];
    })
    console.log(product);
    console.log(Orders?.data);
    profile=profile.data[0] || {};
    date= new Date(date).toLocaleString();
    if(isLoading){
        <p>Loading....</p>
    }
    return <div className=" flex flex-row w-full border-b pb-2 mt-4" >
     <div className=" text-sm w-1/2 text-gray-400  ">
     <h1 className=" text-black text-lg">{date}</h1>
     <p>{profile?.username}</p>
     <p>{profile?.email}</p>
     <p>{profile?.address}</p>
     <p>{profile?.phone_number}</p>
     </div>
     <div className=" content-center">
      {Orders?.data?.map((item)=>{
        return<div key={item.id} className="flex flex-row">
        <p className=" text-gray-400">{`${item.quantity}x `}</p>
        <p>{` ${product?.filter(ele=> +ele.id === +item.product_id).map(event=>event.name)}`}</p>
        </div>
        
      })}
     </div>
    </div>
}