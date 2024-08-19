import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBox, faGear, faHouseUser, faLayerGroup, faList, faStore, faUsers } from '@fortawesome/free-solid-svg-icons';
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
        <FontAwesomeIcon icon={faStore} className="" />
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
