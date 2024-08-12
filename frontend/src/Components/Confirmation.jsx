import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../util/http";
import {motion} from "framer-motion"

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
          <motion.button whileHover={{scale:1.1}} 
          onClick={()=>heandelClose("remove")}>Close</motion.button>
          <motion.button whileHover={{scale:1.1}}
          onClick={handelDelete} disabled={isPending}>{isPending?"Deleteing...":"OK"}</motion.button>
        </div>
        </div>
}