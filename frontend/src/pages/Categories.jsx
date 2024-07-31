import { useDispatch, useSelector } from "react-redux"
import TableProducts from "../Components/TableProducts"
import { categoriesAction } from "../../store/categories"
import Modal from "../Components/UI/Modal"
import EditCategories from "../Components/EditCategories"
import Confirmation from "../Components/Confirmation"
import {  useMutation, useQuery } from "@tanstack/react-query"
import { DeleteData, SaveCategories, fetchCategories} from "../util/http"
import IsLoading from "../Components/UI/IsLoading"
import { json } from "react-router-dom"
import { queryClient } from "../util/http"

export default function Categories(){
    const {show,Delete,showId}=useSelector((state)=>state.categorie);
    const {data,isLoading,isError}=useQuery({
        queryKey:["categories"],
        queryFn:fetchCategories,
    })
    const {mutate,isPending,isError:errorSave}=useMutation({
        mutationFn:SaveCategories,
        onSuccess:()=>{
            queryClient.invalidateQueries(["categories"])
        }
    })
    const dispatch=useDispatch();
    function handelSave(event){
    event.preventDefault();
    const fd=new FormData(event.target);
    const data=Object.fromEntries(fd.entries());
    console.log(data);
    mutate(data);
    }
    function heandelEdit(act,id){
        dispatch(categoriesAction.showEdit({act,id}))
    }
    function heandelDelete(act,id){
        dispatch(categoriesAction.deleteEdit({act,id}))
    }
      function onDelete(){
        DeleteData({id:showId,type:"category"});
        queryClient.invalidateQueries(["categories"]);
    }
    if(isLoading){
        return <IsLoading/>
    }
    if (isError) {
        throw json({ message: "Cannot find Categories" }, { status: 500 });
      }
    
    const categories=data?.data || []
    return <div id="categories">
     <h1>Categories</h1>
     <form onSubmit={handelSave}>
     <div id="newCategories">
     <p>Creat a new Categorie</p>
     <input type="text" name="name" placeholder="Name"/>
     <input type="text" name="description" placeholder="Description"/>
     </div>
      {errorSave?"can't save Categories":<button disabled={isPending} className="bg-[var(--third-color)] border-none p-2.5 px-12 text-white" >{isPending?"Saving...":"Save"}</button>}
      </form>
      <TableProducts 
      title={["PRODUCTS NAME"]}  
      DUMMyPRODUCT={[...categories]} 
      heandelEdite={heandelEdit}
      heandelDelete={heandelDelete}
      />
      <Modal open={show || Delete} onClose={show? ()=>heandelEdit("remove"):()=>heandelDelete("remove")}>
      {show && <EditCategories title="Categories" id={showId}  heandelClose={()=>heandelEdit("remove")}/>}
      {Delete && <Confirmation type="categories"  id={showId} onDelete={onDelete} message="Are you sure delete??" heandelClose={heandelDelete}/>}
      </Modal>
      </div>
}

export async function loader(){
    return queryClient.fetchQuery({
        queryKey:["categories"],
        queryFn:fetchCategories,
        
    })
}
