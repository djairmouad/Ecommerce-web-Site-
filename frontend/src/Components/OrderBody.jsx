import { useQuery } from "@tanstack/react-query";
import { fetchOrdersItem, fetchProfile } from "../util/http";

export default function OrderBody({info}){
    let {date_order:date,id,user_id}=info;
    
    const {data:Orders,isLoading,isError}=useQuery({
        queryKey:["orderItem",id],
        queryFn:()=>fetchOrdersItem(id)
    })
    const {data:profile,isPending,isError:errorProfile}=useQuery({
        queryKey:["profile",user_id],
        queryFn:()=>fetchProfile(user_id)
    })
    const product=Orders?.product?.map((item)=>{
        return item.data.data[0];
    })
     date= new Date(date).toLocaleString();
    return <>
    <tr>
    <td style={{borderBottom: "1px solid"}}>{date}</td>
    <td style={{textAlign:"justify",borderBottom: "1px solid"}}>
    <p>{profile?.[0]?.username}</p>
     <p>{profile?.[0]?.email}</p>
     <p>{profile?.[0]?.address}</p>
     <p>{profile?.[0]?.phone_number}</p>
    </td>
    <td style={{borderBottom: "1px solid"}}>{
        Orders?.data?.map((item)=>{
        return<div key={item.id} style={{display:"flex", justifyContent:"flex-start" ,flexDirection:"row", border:"none"}}>
        <p className=" text-sm font-normal">{`${item.quantity}x `}</p>
        <p>{` ${product?.filter(ele=> +ele.id === +item.product_id).map(event=>event.name)}`}</p>
        </div>
        
      })}
    </td>
    </tr>
    {/* <span style={{display: 'block',width: '100%',height: '1px',backgroundColor: 'black',position: 'absolute'}}></span> */}
 </>
}