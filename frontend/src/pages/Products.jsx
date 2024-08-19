
import { useDispatch, useSelector } from "react-redux"
import EditProducts from "../Components/EditProducts"
import TableProducts from "../Components/TableProducts"
import Modal from "../Components/UI/Modal"
import { productAction } from "../../store/product.Redux"
import Confirmation from "../Components/Confirmation"
import { useQuery } from "@tanstack/react-query"
import fetchProducts, { DeleteData, queryClient } from "../util/http"
import { AnimatePresence,motion, spring } from "framer-motion"



export default function Products(){
    
    const {data,isLoading,isError}=useQuery({
        queryKey:["products"],
        queryFn:fetchProducts,
         },) 
    //function to heandel Edite and New 
    const {show,showId,newShow,showConfi}=useSelector((state)=>state.product);
    const dispatch=useDispatch();
    function heandelEdite(act,id){
        dispatch(productAction.openModal({act:act,id:id}));
    }
    function heandelNew(act){
        dispatch(productAction.openNewModal({act:act}));
    }
    function heandelDelete(act,id){
        dispatch(productAction.openConfirmationModal({act,id}))
    }
    function onDelete(){
        DeleteData({id:showId,type:"product"});
        queryClient.invalidateQueries(["products"]);
        heandelDelete("remove");
    }
    if(isLoading){
        return <p>Loading....</p>
       }
       if(isError){
        return <p>Not found Data</p>
       }
       console.log(data);
     const products=data?.data ;
    return <>
        <div id="products" className=" pt-7">
    <motion.button 
    className="mb-3"
     whileHover={{scale:1.1}}
     transition={{type:"spring" ,stiffness:500}}
    onClick={()=>heandelNew("open")} className="bg-[var(--third-color)] border-none p-2.5 px-12 text-white">Add new Product</motion.button>
    {products && <TableProducts 
    title={["PRODUCTS NAME","Price","Stock Quantity"]} 
    DUMMyPRODUCT={[...products]} 
    heandelEdite={heandelEdite}
    heandelDelete={heandelDelete}
    />}
   <AnimatePresence>
    <Modal key="modale"  open={show || newShow || showConfi} onClose={show ? ()=>heandelEdite("remove") : newShow ? ()=>heandelNew("remove"): ()=>heandelDelete("remove")}>
    {show && <EditProducts key="editProducts" method="PUT" title="FORM EDIT" id={showId} heandelClose={()=>heandelEdite("remove")}  />}
    {newShow && <EditProducts key="newProducts" method="POST" title="NEW PRODUCT" newProduct heandelClose={()=>heandelNew("remove")}/>}
    {showConfi && <Confirmation key="confirmation" type="products" onDelete={onDelete} title="Confirmation" message="Are you sure To delete that?" heandelClose={heandelDelete}/>}
    </Modal>
    </AnimatePresence>
    </div>
    </>
}

