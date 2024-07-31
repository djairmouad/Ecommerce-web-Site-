import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import BoxProduct from "../../Components/user/BoxProduct";
import Button from "../../Components/user/Ui-user/Button";
import { useQuery } from "@tanstack/react-query";
import fetchProducts, { fetchImages } from "../../util/http";
import IsLoading from "../../Components/UI/IsLoading";
import { useDispatch } from "react-redux";
import { productAction } from "../../../store/product.Redux";
import { useNavigate } from "react-router-dom";


export default function Home(){
    const navigate=useNavigate()
    const {data,isError,isLoading}=useQuery({
        queryKey:["products"],
        queryFn:fetchProducts,
    })
    const dispatch=useDispatch();
    const products=data?.data || []
    const show=products?.filter((item)=>{
        return item.show===1;
    })
     const id=show?.[0]?.id;
    const { data:AllImages,isLoading:loadImage,isError:errorImages}=useQuery({
        queryKey:["images",id],
        queryFn:()=>fetchImages(id),
       });
       const image=AllImages?.data[0] || {};
       function handelProduct(show){
        const{id,title,price}=show[0];
       const counter=1
       const totalPrice=price;
       const info={id,title,price,counter,totalPrice};
       dispatch(productAction.HandelProduct({id,info,act:"add"}))
       }
       function GoToPage(){
        navigate("/user/product/"+id)
    }
    if(isError){
        return <p>isError</p>;
    }
    return(
     <div id="home" className=" h-lvh">
     {show.map((item)=>{
        return <div key={item.id} id="home-product" className="flex  flex-row items-center w-full h-3/5  gap-12  bg-black   overflow-hidden">
        <div id="product-description" className="flex flex-col w-7/12 h-full justify-center gap-4 pl-5">
            <h1 className=" text-red-50  text-5xl">{item.name}</h1>
            <div id="description" className=" text-customGray">
                <p className="text-sm">   
                 {item.description}
                </p>
            </div>
            <div id="button-user" className=" flex flex-row gap-3 w-8/12 justify-center">
                <Button className=" text-red-50" onClick={GoToPage}>Read More</Button>
                 <Button className=" bg-white text-black" onClick={()=>handelProduct(show)} >
                    <FontAwesomeIcon icon={faCartShopping} />
                    Add to Cart
                 </Button>
            </div>
        </div>
        <div id="image-user" className=" flex justify-center rounded-full  h-fit p-3  w-fit bg-white mr-4" style={{boxShadow: "0px 0px 10px 4px white"}}>
            <img className=" w-3/5 mix-blend-multiply" src={"http://localhost:5000/image/"+image.name}/>
        </div>
       </div>
     })}
       <div id="New Arrivals">
        <h1 className="text-2xl pl-4 font-bold my-4">New Arrivals</h1>
        <div id="All-product" style={{backgroundColor:"#ebeef2"}} className="flex flex-wrap flex-row w-full px-10 gap-1/10   text-lg font-bold capitalize ">
        {isLoading && <IsLoading/>}
         {products.map((item)=>(
            <BoxProduct key={item.id} title={item.name} price={item.price} id={item.id} />
         ))}
        </div>
       </div>
    </div>
    )
}