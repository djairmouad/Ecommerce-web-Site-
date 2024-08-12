import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {motion} from "framer-motion"
export default function Modal({ children,open,onClose }) {
    const dialog=useRef()
   useEffect(()=>{
    if(open){
        dialog.current.showModal()
        }
    else{
        dialog.current.close()
    }
   },[open])
    return createPortal(
        
        <motion.dialog 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 30 }}
        exit={{ opacity: 0, y: 30 }}
        ref={dialog} onClose={()=>onClose()}>
                {children}
        </motion.dialog>,
        document.getElementById("modal")
    );
}
