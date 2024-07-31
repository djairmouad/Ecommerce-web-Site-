import { useQuery } from "@tanstack/react-query";
import BoxProduct from "../../Components/user/BoxProduct";
import fetchProducts, { fetchCategories} from "../../util/http";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CategoryUser(){
const {data}=useQuery({
    queryKey:["products"],
    queryFn:fetchProducts
})
const { data:AllCategories} = useQuery({
    queryKey:["categories"],
    queryFn:fetchCategories,
});
const Allcategory=data?.data;
const category=data?.data.map((item)=>item.category_id);
const category_id=new Set(category) 
const  CategoryUser=Array.from(category_id).map((item)=>{
    return Allcategory.filter(event=>item===event.category_id)
})

    console.log(CategoryUser);
    const categories=AllCategories?.data || [];
    const all=Array.from(category_id).map((item)=>categories.find(event=>event.id===item)) || [];
    console.log(all);

  


return <div id="CategoryUser" style={{backgroundColor: "rgb(235, 238, 242)"}}> 
{
    CategoryUser.map((item,index)=>(
        <div key={index} id="CategoryUserRow" className="flex  flex-col w-full px-10 gap-2 bg-regal-blue text-lg font-bold capitalize ">
        <div className=" flex items-center gap-2">
        <h2 className=" mt-6 text-3xl font-black"> {all.find(cat => cat?.id === item[0]?.category_id)?.name || ""}</h2> 
        <Link to={`${item[0].category_id}?name=${all.find(cat => cat?.id === item[0]?.category_id)?.name || ""}`} className=" normal-case text-base font-medium underline self-end">Show all</Link>
        </div>
        <div className="flex flex-nowrap justify-end flex-row-reverse w-full  flex-wrap  px-10 gap-2 bg-regal-blue text-lg font-bold capitalize">
        <Link to={`${item[0].category_id}?name=${all.find(cat => cat?.id === item[0]?.category_id)?.name || ""}`} className=" bg-gray-300 flex h-36  border-2 border-white rounded-2xl  w-1/4 justify-center items-center mb-7 mt-3">
        <p className="font-normal text-sm">show all  <FontAwesomeIcon icon={faArrowRight} /></p>
        </Link>
        {item.splice(0,3).map((item)=>(
            <BoxProduct key={item.id}  title={item.name} price={item.price} id={item.id} />
        ))}
       
        </div>
       
         
         </div>
    ))
}

</div>

}