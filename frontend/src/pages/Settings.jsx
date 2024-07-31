import { useMutation, useQuery } from "@tanstack/react-query";
import fetchProducts, { fetchProductShow, updatePage } from "../util/http"
import { useEffect, useRef, useState } from "react";


export default function Settings(){
   const select=useRef();
   const [selectedProductId, setSelectedProductId] = useState("");
   const {data,isLoading,isError}=useQuery({
      queryKey:["products"],
      queryFn:fetchProducts,
       },) 
      const {data:ProductShow}=useQuery({
         queryKey:["ProductShow"],
         queryFn:fetchProductShow
      })
      useEffect(()=>{
         if(ProductShow && ProductShow.length){
            setSelectedProductId(ProductShow[0].id)
         }
      },[ProductShow])
      // const ProductId = productShowData?.[0]?.id || "";
   const {mutate}=useMutation({
      mutationFn:updatePage
   })
       const product=data?.data || [];
       function handelUpdatePage(){
         const id=select.current.value;
         mutate({id});
       }
       console.log(selectedProductId);
    return <div id="Settings" className=" flex flex-col gap-10">
        <h1>Settings</h1>
        <h1 className=" text-xl mb-3 font-medium ">Select A product For Home page:</h1>
        <div className=" flex flex-row  w-1/2 ">
         <select className=" border border-gray-400 w-32" ref={select} onChange={(e) => setSelectedProductId(e.target.value)} value={selectedProductId}>
         {product.map((item)=>{
            return <option key={item.id} value={item.id}>{item.name}</option>
         })}
         </select>
         <button className=" w-1/3 ml-3 h-8  bg-black text-white" onClick={handelUpdatePage}>Edite</button>
        </div>
    </div>
}

