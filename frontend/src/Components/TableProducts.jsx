
import {motion} from "framer-motion"
export default function TableProducts({DUMMyPRODUCT,title,heandelEdite,heandelDelete }){
    const NewDUMMyPRODUCT=[...DUMMyPRODUCT];
    return <div id="table">
        <div id="titles" className="flex justify-between bg-white w-9/10 text-[var(--text-color)] p-1.5 px-2.5 my-5 border border-[#d7d7dc]">
        {[...title].map((item,index)=><h3 key={index}>{item}</h3>)}
        <h3 className="text-center w-[33%]">Action</h3>
        </div>     
       <div id="allProducts" className="bg-white w-[90%] max-h-[200px] overflow-hidden overflow-y-scroll p-1.5 px-2.5 border border-[#d7d7dc]">
        {NewDUMMyPRODUCT.map((item)=> (
        <div key={item.id} className=" gap-1">
        <div id="info" className=" font-medium " >
        <p>{item.name}</p>
        <p>{item.price!==undefined && "$"+item.price}</p>
        <p>{item.stock_quantity}</p>
        </div>
          <div id="Button" >
          <motion.button
          whileHover={{scale:1.1}}
           onClick={()=>heandelEdite("open",item.id)} className=" mb-1" >Edit</motion.button>
          <motion.button
          whileHover={{scale:1.1}}
           onClick={()=>heandelDelete("open",item.id)} className=" mb-1" >Delete</motion.button>
          </div>
        </div>)
        )}
    </div>
    </div>
      

}