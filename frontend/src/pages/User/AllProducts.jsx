import { useQuery } from "@tanstack/react-query";
import fetchProducts from "../../util/http";
import BoxProduct from "../../Components/user/BoxProduct";
import IsLoading from "../../Components/UI/IsLoading";

export default function AllProducts(){
    const {data,isError,isLoading}=useQuery({
        queryKey:["products"],
        queryFn:fetchProducts,
    })

    if(isError){
        return <p>isError</p>;
    }
    const products=data?.data || []
    return  <div id="New Arrivals" className="mt-5" style={{backgroundColor: "rgb(235, 238, 242)"}}>
    <h1 className="text-2xl px-11 font-black  my-4 mt-0 pt-3">All Products</h1>
    <div id="All-product" style={{backgroundColor: "rgb(235, 238, 242)"}} className="flex flex-wrap flex-row w-full px-10    gap-1/10 bg-regal-blue text-lg font-bold capitalize ">
    {isLoading && <IsLoading/>}
     {products.map((item)=>(
        <BoxProduct key={item.id} title={item.name} price={item.price} id={item.id} />
     ))}
    </div>
   </div>
}