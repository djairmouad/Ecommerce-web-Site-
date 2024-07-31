import { useMutation } from "@tanstack/react-query"
import {SaveProperty, queryClient} from "../util/http";
export default function EditProperty({handelClose,id}){
    const {mutate,isLoading,isError}=useMutation({
        mutationFn:SaveProperty,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["property",id]
            }),
            handelClose();
        }
    })

    function handelSaveProperty(event){
        event.preventDefault();
        const fd=new FormData(event.target);
        const formData=Object.fromEntries(fd.entries());
        const data={...formData,id_category:id};
        console.log(data);
        mutate({formData:data})
    }
    return <form id="newProperity" onSubmit={handelSaveProperty} >
        <div id="info">
        <label htmlFor="name" >Name of Property:</label>
        <input id="name" name="name" required/>
        </div>
        <div id="info">
        <label htmlFor="description">Description:</label>
        <input id="description" name="description" required/>
        </div>
        <div id="info">
        <button onClick={()=>handelClose()}>Close</button>
        <button disabled={isLoading}>{isLoading?"Submiting..":"Save"}</button>
        </div>
    </form>
}