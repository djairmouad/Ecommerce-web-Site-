
import { useMutation, useQuery } from "@tanstack/react-query";
import {  DeleteData, UpdateCategory, fetchCategory, fetchProperties, queryClient } from "../util/http";
import IsLoading from "./UI/IsLoading";
import { useDispatch, useSelector } from "react-redux";
import { categoriesAction } from "../../store/categories";
import Modal from "./UI/Modal";
import EditProperty from "./EditeProperty";
import { motion } from "framer-motion";

export default function EditCategories({title,id,heandelClose}){
  
  const{data,isLoading,isError}=useQuery({
    queryKey:["categories",id],
    queryFn:()=>fetchCategory(id)
  })
  const {mutate,isPending,isError:errorCategory}=useMutation({
    mutationFn:UpdateCategory,
    onSuccess:()=>{
      queryClient.invalidateQueries(["categories"])
      heandelClose();
    }
  });
 let {data:GetAllProperty,isLoading:PropertyLoading}=useQuery({
  queryKey:["property",id],
  queryFn:()=>fetchProperties(id),
 })
 const{mutate:mutateDelete}=useMutation({
  mutationFn:DeleteData,
  onSuccess:()=>{
    queryClient.invalidateQueries({
        queryKey:["property",id]
    })
  },
 })
  const {showProperty}=useSelector((state)=>state.categorie);
  const dispatch=useDispatch();
  function handelUpdate(event){
  event.preventDefault();
  const fd=new FormData(event.target);
  const data=Object.fromEntries(fd.entries());
  mutate({id:id,formData:{...data}});
  }
  function handelAddProperty(act){
    dispatch(categoriesAction.ShowProperty({act}))
  }
  function HandelDelete(name){
    mutateDelete({name:name,id,type:"property"});
    queryClient.invalidateQueries({
      queryKey:["property",id]
    })
  }
  if(isLoading){
    return <IsLoading/>
  }
  if(isError){
    return  <p>error</p>
  }
   const categorie=data?.data[0] || {}
    return <div className=" p-2  rounded-sm">
    {errorCategory && <p>Error</p>}
    <h1 className=" text-2xl font-bold">{title}</h1>
    <motion.button className=" p-1" whileHover={{scale:1.1}}  id="addProperty" onClick={()=>handelAddProperty("open")}>ADD Property</motion.button>
    <Modal open={showProperty} onClose={()=>handelAddProperty("remove")}>
      {showProperty && <EditProperty handelClose={()=>handelAddProperty("remove")} id={id}/> }
    </Modal>
    <form id="category" onSubmit={handelUpdate}>
    <div id="info-1" >
    <div id="info" >
     <label htmlFor="name">name:</label>
     <input className=" border text-sm  pl-1 border-black rounded-sm " type="text" id="name" name="name" defaultValue={categorie.name} />
    </div>
    <div id="info">
     <label htmlFor="description">Description:</label>
     <input className=" border text-sm pl-1 border-black rounded-sm " type="text" id="description" name="description" defaultValue={categorie.description} />
    </div>
    </div>
      <div id="info-2">
      <motion.button whileHover={{scale:1.1}}  onClick={()=>heandelClose()}>Close</motion.button>
      <motion.button whileHover={{scale:1.1}}  disabled={isPending }>{isPending?"Editing...":"Edit"}</motion.button>
     </div>
    </form>
    {GetAllProperty?.data.length>0 && <h1 className=" text-2xl font-bold">Propertys</h1> } 
    {PropertyLoading ? (

    <IsLoading/>) :(
      GetAllProperty?.data.map((item)=>(
        <div  key={item.id}>
      <form id="formProperty">
        <input className=" border pl-1 border-black rounded-sm " id="name" name="name" defaultValue={item.name}/>
        <input className=" border pl-1 border-black rounded-sm " style={{width:"fit-content"}} id="description" name="description" defaultValue={item.descriptions}/>
        <div>
        <motion.button whileHover={{scale:1.1}}  type="motion.button" onClick={()=>HandelDelete(item.name)}>Delete</motion.button>
        </div>
        </form>
        </div>
    )))}
    </div>
}