import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import getCarts from "../util/getCarts";
const Array=[
    {path:"home",title:"Home"},
    {path:"allProduct",title:"AllProduct"},
    {path:"categories",title:"Categories"},
    {path:"account",title:"Account"}
]
export default function Nav(){
     
    let {NumProduct}=useSelector((state)=>state.product);
    return <nav className=" w-full h-12 bg-black   fixed  customGray ">
        <ul className="flex flex-row w-full justify-around">
        <li className=" w-1/5 text-customGray" >Ecommerce</li>
        <ul className="flex flex-row w-4/6">
        {Array.map((item,index)=>(
            <li key={index}>
            <NavLink className={({ isActive }) => isActive ? "text-blue-300" : "text-customGray"} to={item.path}>
  {item.title}
</NavLink>

            </li>
             ))} 
            <li>
            <NavLink to="cartUser" className={({ isActive }) => isActive ? "text-blue-300" : "text-customGray"}  >Cart({NumProduct})</NavLink>
            </li>
            <li>
            <NavLink to="search" className={({ isActive }) => isActive ? "text-blue-300" : "text-customGray"} >
            <FontAwesomeIcon className="text-customGray" icon={faMagnifyingGlass} />
            </NavLink>
            </li>
        </ul>
        </ul>
    </nav>
}