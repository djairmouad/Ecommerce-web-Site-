import { Form, redirect } from "react-router-dom";
import getAuthToken from "../util/auth";
import axios from "axios";

export default function SignUp(){
    return <div id="SignUp">
    <h1>Sign Up</h1>
    <Form method="POST">
       <div id="Sign">
            <label htmlFor="username">USERNAME:</label>
            <input required id="username" name="username" placeholder="username" />
         </div>
         <div id="Sign">
            <label htmlFor="email">EMAIL:</label>
            <input required id="email" name="email" placeholder="email" />
         </div>
         <div id="Sign">
            <label htmlFor="password">PASSWORD:</label>
            <input required id="password" name="password" placeholder="password" />
         </div>
         <div id="Sign">
            <label htmlFor="first_name">First Name:</label>
            <input required id="first_name" name="first_name" placeholder="first_name"/>
         </div>
         <div id="Sign">
            <label htmlFor="last_name">LAST NAME:</label>
            <input required id="last_name" name="last_name"  placeholder="last_name"/>
         </div>
         <div id="Sign">
            <label htmlFor="address">ADDRESS:</label>
            <input required id="address" name="address" placeholder="address" />
         </div>
         <div id="Sign">
            <label htmlFor="phone_number">PHONE NUMBER:</label>
            <input required id="phone_number" name="phone_number" placeholder="phone_number"/>
         </div>
          <input  type="hidden" name="type" defaultValue="User"/>
          <button>Create</button>
          </Form>
    </div>

}

export async function action({request}){
const token=getAuthToken();
axios.defaults.headers.common.Authorization="Bearer "+token;
const formData=await request.formData();

const data={
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            address: formData.get("address"),
            phone_number: formData.get("phone_number"),
            type:formData.get("type"),

}
console.log(data);
try{
    const response=await axios.post("http://localhost:5000/api/SignUp",data);
    return redirect("/")
}catch(err){
    console.log(err.message);
    return null
}

}