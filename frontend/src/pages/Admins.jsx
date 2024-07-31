import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../store/product.Redux";
import Modal from "../Components/UI/Modal";
import Confirmation from "../Components/Confirmation";
import { DeleteData, fetchAllAdmins, queryClient, saveAdmin } from "../util/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import IsLoading from "../Components/UI/IsLoading";
import { useRef, useState } from "react";

export default function Admins(){
    const email=useRef();
    const password=useRef();
    const [conf,setConf]=useState(false)
    const {data,isLoading,isError}=useQuery({
        queryKey:["Admins"],
   queryFn:fetchAllAdmins
    })
    const {mutate,isPending}=useMutation({
        mutationFn:saveAdmin
    })
    const AllAdmins=data?.data ;
    const {showConfi,showId}=useSelector((state)=>state.product);
    const dispatch=useDispatch()
    
    function handelDelete(act,id){
    dispatch(productAction.openConfirmationModal({act,id}));
    }
    function onDelete(){
        DeleteData({id:showId,type:"DeleteAdmin"})
    }
    if(isError){
        return <p>Error</p>
    }
    function handelSave(event){
    event.preventDefault();
    setConf(false)
    const fd=new FormData(event.target)
    const data=Object.fromEntries(fd.entries());
    if(data.password===data.confirm){
        setConf(false);
        mutate({email:data.email,password:data.password})
        email.current.value="";
        password.current.value="";
    }else{
     setConf(true)
    }
    return queryClient.invalidateQueries({queryKey:["Admins"]})
    }
    const buttonStyle = {
        width: '100px',
        height: '25px',
        backgroundColor: 'var(--thired-color)',
        color: 'white',
        border: 'none'
      };
    return <div id="Admins">
    <h1>Admins</h1>
    <form onSubmit={handelSave}>
     <div id="newCategories">
     <p>Creat a new Admin</p>
     <input type="text" ref={email} name="email" placeholder="Email"  style={{width:"34%"}}/>
     <div style={{display:"flex",flexDirection:"column",width:"34%"}}>
     <input type="text" ref={password} name="password" placeholder="Password" style={{width:"100%"}}/>
     {conf && <p style={{color:"red"}}>confirm password!!!</p>}
     <input type="text" ref={password} name="confirm" placeholder="Confirm Password" style={{width:"100%"}}/>
     </div>
     </div>
     <button style={buttonStyle} disabled={isPending && true}> {isPending?"Submiting...":"Save"}</button>
      </form>
    <h3>Existing admins</h3>
    <h4>ADMIN GOOGLE EMAIL</h4>
    {isLoading && <IsLoading/>}
    <table>
        <tbody>
        {AllAdmins.map((item) => (
               <tr key={item.id}>
                            <td>{item.email}</td>
                            <td><button onClick={() => handelDelete("open", item.id)}>Delete</button></td>
                        </tr>
                    ))}
        </tbody>
    </table>
    <Modal open={showConfi} onClose={()=>handelDelete("remove")}>
    <Confirmation title="Admin" message={`Are you suer you want delete Admin`} heandelClose={handelDelete} onDelete={onDelete} type="Admins"/>
    </Modal>
    </div>
}

export async function loader(){
return queryClient.fetchQuery({
   queryKey:["Admins"],
   queryFn:fetchAllAdmins
})
}