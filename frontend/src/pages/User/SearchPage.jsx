import { useState } from "react"
import BoxProduct from "../../Components/user/BoxProduct";
import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../../util/http";

export default function SearchPage(){
    const [search,setSearch]=useState([]);
    const {data,isError,isLoading}=useQuery({
        queryKey:["products"],
        queryFn:fetchProducts,
    })
    function handelSearch(event){
    const product=data?.data;
    const find=product.filter((item)=>item.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setSearch([...find]);
    if(event.target.value.length<=0){
        setSearch([]);
    }
    }
    return <div className="mt-10">
    <div className="flex justify-center items-center gap-6">
        <h1 className=" text-xl font-medium">Search</h1>
        <input type="name" className=" p-1 h-8 outline-cyan-500 rounded-md w-3/5" onChange={()=>handelSearch(event)}/>
    </div>
    <div id="New Arrivals" className="mt-5" style={{backgroundColor: "rgb(235, 238, 242)"}}>
    <div id="All-product" style={{backgroundColor: "rgb(235, 238, 242)"}} className="flex flex-wrap flex-row w-full px-10    gap-1/10 bg-regal-blue text-lg font-bold capitalize ">
     {search.map((item)=>(
        <BoxProduct key={item.id} title={item.name} price={item.price} id={item.id} />
     ))}
    </div>
   </div>
    </div>
}