import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../util/http";


export default function Confirmation({title,message,heandelClose,onDelete,type}){
   const {mutate,isPending}=useMutation({
    mutationFn:onDelete,
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:[type]
      });
      heandelClose("remove")
    }
   })
   function handelDelete(){
    mutate();
   }
    return <div id="confirmation" >
        <h1>{title}</h1>
        <h2>{message}</h2>
        <div id="info">
          <button onClick={()=>heandelClose("remove")}>Close</button>
          <button onClick={handelDelete} disabled={isPending}>{isPending?"Deleteing...":"OK"}</button>
        </div>
        </div>
}