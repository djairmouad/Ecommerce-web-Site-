import { useQuery } from "@tanstack/react-query";
import { fetchImages} from "../../util/http";

export default function CartUse({info,handelProduct}){
    const {title,totalPrice,counter,id}=info;
    const { data:AllImages,isLoading,isError}=useQuery({
        queryKey:["images",id],
        queryFn:()=>fetchImages(id),
       });
    const image=AllImages?.data[0] || {} ;  
    return  <>
    <div id="imageOrder" className=" w-1/2">
        <div id="image-order" className=" w-full bg-white h-full w-4/5  h-32 py-7 border ">
        { isLoading && <p>loading...</p>}
        {image &&  <img className=" w-24 m-auto" src={`http://localhost:5000/image/`+image.name}></img>}
        </div>
        <h1 className=" text-center capitalize text-xl w-full font-medium">{title}</h1>
    </div>
    <div id="operation" className=" flex flex-row items-center  gap-1/10 "> 
    <button className="flex justify-center rounded-lg  w-11 h-8 bg-gray-300"  onClick={()=>handelProduct("add",info,id)}>
    <p className=" text-lg font-extrabold" >+</p>
    </button>
    <p className=" text-lg font-normal ">{counter}</p>
    <button className="flex justify-center rounded-lg w-11 h-8 bg-gray-300" onClick={()=>handelProduct("remove",info,id)}>
    <p  className=" text-lg font-extrabold">-</p>
    </button>
    </div> 
    <div className=" text-xl font-medium w-1/5 text-end">
        ${totalPrice}
    </div>
</>
}