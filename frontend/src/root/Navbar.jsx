import { Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import getAuthToken from "../util/auth";

export default function NavBar(){ 
    const token= getAuthToken();
    if (!token) {
      return <div>Not Found Page 404</div>; 
    }
    return <main className="flex flex-col gap-0">
         <Nav/>
        <section  style={{backgroundColor: "#ebeef2",marginTop:"3%" ,minHeight:"calc(103vh - 3rem)"}} className=" w-full h-full">
            <Outlet/>
        </section>
    </main>
}