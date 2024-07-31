
import { fetchImages, fetchProduct } from "../../util/http"
import PresentProduct from "../../Components/user/PresentProduct";
import Reviews from "../../Components/user/Reviews";
export default function ProductUser(){
    return <div id="ProductUser" className="flex flex-col gap-5">
      <PresentProduct/>
      <h1 className=" relative left-1/10 w-fit  font-medium text-2xl">Reviews</h1>
      <Reviews/>
    </div>
}

export async function loader({params}){
    const id=params.id;
    const data= await fetchProduct(id)
    const images=await fetchImages(id)
    return {data,images}
}