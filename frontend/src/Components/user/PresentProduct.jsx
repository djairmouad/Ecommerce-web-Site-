import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Ui-user/Button";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productAction } from "../../../store/product.Redux";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function PresentProduct(){
    const dispatch=useDispatch();
    const {id}=useParams();
    const data=useLoaderData();
    function handelProduct(){
        const counter=1
      const totalPrice=product.price;
      const info={id:+id,title:product.title,price:product.price,counter,totalPrice};
        dispatch(productAction.HandelProduct({id,info,act:"add"}))
      }
    
    const product=data?.data.data[0] || {};
    const images=data?.images.data;

    return <div id="PresentProduct" className="flex justify-center m-11 mb-0  h-1/2 gap-20 ">
       <div id="images" className=" w-fit h-fit p-7 flex gap-5 flex-col bg-white border-white rounded-xl ">
        <div id="firstImage" className=" w-52">
        {images[0] && <img src={`http://localhost:5000/image/`+images[0].name}/>}
        </div>
        <div id="secondImage" className="  w-16 flex gap-4">
        {images[1] && <img src={`http://localhost:5000/image/`+images[1].name}/>}
        {images[2] && <img src={`http://localhost:5000/image/`+images[2].name}/>}
        </div>  
       </div>
       <div id="descriptionProduct" className=" w-1/2 h-full">
        <h1 className="text-5xl font-bold mb-7">{product.name}</h1>
         <p id="description" className="mb-6 font-medium ">
           {product.description}
         </p>
         <div id="priceProductUser" className="flex gap-7 items-center">
            <h3 className=" text-lg font-medium">${product.price}</h3>
            <Button onClick={handelProduct} className=" bg-green-600 text-white flex items-center justify-center p-1 gap-2">
            <FontAwesomeIcon icon={faCartShopping} />
            <p>Add To Cart</p>
            </Button>
         </div>
       </div>
      </div>
}