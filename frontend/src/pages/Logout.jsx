import { redirect } from "react-router-dom";

export default function Logout(){
    return null;
}

export async function loader(){
    await localStorage.removeItem("token");
    return redirect("/")
}