import {  useQuery } from "@tanstack/react-query";
import Button from "./Ui-user/Button"
import { fetchImages} from "../../util/http";
import { useDispatch } from "react-redux";
import { productAction } from "../../../store/product.Redux";
import { useNavigate } from "react-router-dom";
export default function BoxProduct({title,price,id}){
    
    const { data:AllImages,isLoading:loadImage,isError:errorImages}=useQuery({
        queryKey:["images",id],
        queryFn:()=>fetchImages(id),
       });
     const navigate=useNavigate()
    const image=AllImages?.data[0] || {};
    const dispatch=useDispatch();
    function handelProduct(id,title,price){
    const counter=1
    const totalPrice=price;
    const info={id,title,price,counter,totalPrice};
    dispatch(productAction.HandelProduct({id,info,act:"add"}))
    }
    function GoToPage(){
        navigate("/user/product/"+id)
    }
    if(loadImage){
        return <p>loading..</p>
    }
    if(errorImages){
        return <p>errorImages..</p>
    }
    return  <div id="box-product"  className="flex flex-col w-1/4 items-center mb-7 mt-3 ">
    <div onClick={GoToPage} id="image-box" className="flex justify-center items-center w-full bg-white  border-2 border-white rounded-2xl h-36">
     <img src={`http://localhost:5000/image/`+image.name} className=" w-20 h-20"/>
    </div>
    <div id="price" className=" w-full pl-3">
    <p className="text-base	 min-w-full mt-3">{title}</p>
    <div className="flex flex-row gap-3 items-center">
       <h3 className="">${price}</h3>
       <Button className="bg-green-600 text-white font-medium  text-base" onClick={()=>handelProduct(id,title,price)}>Add to Cart</Button>
    </div>
    </div>
    </div>
}