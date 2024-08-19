import { useQuery } from "@tanstack/react-query"
import { fetchOrdersForAdmin } from "../util/http"
import OrderBody from "../Components/OrderBody";

export default function Orders(){
  const {data:orders,isLoading,isError}=useQuery({
    queryKey:["orders"],
    queryFn:fetchOrdersForAdmin
})
console.log(orders);
let allOrders=orders || []
   return <div id="orders" style={{width:"80%"}} className="pt-7 ">
    <h1  className=" text-2xl font-bold mb-3">Orders</h1>
    <div className=" border-2  border-b-0 border-black" style={{borderColor:"black", borderBottom:0}}>
    <h4 className="text-base     font-medium ">DATE </h4>
    <h4 className="text-base     font-medium ">RECIPIENT</h4>
    <h4 className="text-base     font-medium ">PRODUCTS</h4>
    </div>
    <table>
        <tbody style={{border:"1px solid",position:"relative"}}>
        {
          allOrders?.map(item=>{
            return <OrderBody key={item.id}  info={item}/> 
          })
        }
         </tbody>
    </table>
    </div>
}