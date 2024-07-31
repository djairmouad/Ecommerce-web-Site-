
import { useMutation, useQuery } from "@tanstack/react-query";
import {  DeleteData, UpdateCategory, fetchCategory, fetchProperties, queryClient } from "../util/http";
import IsLoading from "./UI/IsLoading";
import { useDispatch, useSelector } from "react-redux";
import { categoriesAction } from "../../store/categories";
import Modal from "./UI/Modal";
import EditProperty from "./EditeProperty";


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
    return <>
    {errorCategory && <p>Error</p>}
    <h1>{title}</h1>
    <button id="addProperty" onClick={()=>handelAddProperty("open")}>ADD Property</button>
    <Modal open={showProperty} onClose={()=>handelAddProperty("remove")}>
      {showProperty && <EditProperty handelClose={()=>handelAddProperty("remove")} id={id}/> }
    </Modal>
    <form id="category" onSubmit={handelUpdate}>
    <div id="info-1" >
    <div id="info" >
     <label htmlFor="name">name:</label>
     <input type="text" id="name" name="name" defaultValue={categorie.name} />
    </div>
    <div id="info">
     <label htmlFor="description">Description:</label>
     <input type="text" id="description" name="description" defaultValue={categorie.description} />
    </div>
    </div>
      <div id="info-2">
      <button onClick={()=>heandelClose()}>Close</button>
      <button disabled={isPending }>{isPending?"Editing...":"Edit"}</button>
     </div>
    </form>
    {GetAllProperty?.data.length>0 && <h1>Propertys</h1> } 
    {PropertyLoading ? (

    <IsLoading/>) :(
      GetAllProperty?.data.map((item)=>(
        <div  key={item.id}>
      <form id="formProperty">
        <input id="name" name="name" defaultValue={item.name}/>
        <input id="description" name="description" defaultValue={item.descriptions}/>
        <div>
        <button type="button" onClick={()=>HandelDelete(item.name)}>Delete</button>
        </div>
        </form>
        </div>
    )))}
    </>
}