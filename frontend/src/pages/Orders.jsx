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
   return <div id="orders" style={{width:"80%"}}>
    <h1>Orders</h1>
    <div>
    <h4>DATE </h4>
    <h4>RECIPIENT</h4>
    <h4>PRODUCTS</h4>
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