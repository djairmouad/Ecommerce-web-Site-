import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBox, faGear, faHouseUser, faLayerGroup, faList, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const DUMMY_Array = [
    { id:1,icon: (<FontAwesomeIcon icon={faHouseUser} />), title: "Dashboard", path: "dashboard" },
    { id:2,icon: (<FontAwesomeIcon icon={faBox} />), title: "Products", path: "product" },
    { id:3,icon: (<FontAwesomeIcon icon={faList} />), title: "Categories", path: "categories" },
    { id:4,icon: (<FontAwesomeIcon icon={faLayerGroup} />), title: "Orders", path: "orders" },
    { id:5,icon: (<FontAwesomeIcon icon={faUsers} />), title: "Admins", path: "admins" },
    { id:6,icon: (<FontAwesomeIcon icon={faGear} />), title: "Settings", path: "settings" },
    { id:7,icon: (<FontAwesomeIcon icon={faArrowRightFromBracket} />), title: "Logout", path: "logout" },
];

export default function Side() {
    const [active,setActive]=useState({id:null,show:false});
    function handelChange(id){
      setActive({id:id,show:true})
    }
    return (
        <ul className="list-none flex flex-col justify-between h-full w-full pl-7">
        <li className="p-2.5 flex items-center gap-2.5">
        <svg
        className="w-7 h-7 text-[var(--text-color)]"
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
    >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <defs>
                <style>
                    {`.cls-1{fill:none;stroke:#000000;strokelinecap:round;strokeLinejoin:round;strokeWidth:1.5px;}`}
                </style>
            </defs>
            <g id="ic-ecommerce-house">
                <path
                    className="cls-1"
                    d="M1.1,10.71,4,3H19.86a.22.22,0,0,1,.19.13l2.85,7.6a.2.2,0,0,1-.19.27H18L15,9l-3,2L9,9,6,11H1.29A.2.2,0,0,1,1.1,10.71Z"
                ></path>
                <line
                    className="cls-1"
                    x1="3.97"
                    y1="10.98"
                    x2="4"
                    y2="21.02"
                ></line>
                <line
                    className="cls-1"
                    x1="20"
                    y1="10.98"
                    x2="20.03"
                    y2="20.98"
                ></line>
                <line
                    className="cls-1"
                    x1="22"
                    y1="20.98"
                    x2="2"
                    y2="21.02"
                ></line>
                <path
                    className="cls-1"
                    d="M8,21v-6.8a.2.2,0,0,1,.2-.2h7.6a.2.2,0,0,1,.2.2V21"
                ></path>
                <line
                    className="cls-1"
                    x1="12"
                    y1="20.98"
                    x2="12"
                    y2="13.98"
                ></line>
            </g>
        </g>
    </svg>
    <Link to="/admin" className="no-underline text-[var(--text-color)] font-semibold">EcommerceAdmin</Link>
        </li>
            {DUMMY_Array.map((item) => (
                <li key={item.id} className={(active.id===item.id && active.show===true)?("active"):null}>
                    {item.icon}
                    <NavLink to={item.path} onClick={() => handelChange(item.id)} 
                    className={({isActive})=>isActive?"active":""}
                    >
                        {item.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
