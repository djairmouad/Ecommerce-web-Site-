import { Form, json, redirect, useNavigate } from "react-router-dom";


export default function Login(){
    const navigate=useNavigate();
    function handelSignUp(){
     navigate("/SignUp");
    }
return <div id="Login">
    <Form method="POST">
     <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="email" required/>
     </div>
     <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="password" required/>
     </div>
     <div>
      <button>Login</button>
      <button onClick={handelSignUp}>Sign Up</button>
     </div>
     
    </Form>
    <div id="image">
        <img src="../../public/online-fashion-shopping-with-tablet_23-2150400605.jpg"/>
    </div>
    
</div>
}

export async function  action({request}){
const formData=await request.formData();
const user=Object.fromEntries(formData);
const response=await fetch("http://localhost:5000/api/SignIn",{
    method:"POST",
    headers: {
      "Content-Type": "application/json",
       
    },
    body:JSON.stringify(user)
})
const data=await response.json();
if(response.status===404){
    throw json({message:data.message},{status:404})
}
if(!response.ok){
    throw json({message:"can not fetch Data"},{status:500})
}
await localStorage.setItem("token", data.token);
const type=data.user.type;
console.log(type);
if(type==="Admin"){
    return redirect("/admin/dashboard")
}else if(type==="User"){
    return redirect("/user/home")
}


}