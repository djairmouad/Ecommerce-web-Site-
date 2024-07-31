import { Outlet, useLoaderData} from "react-router-dom";
import Wellcome from "../Components/Wellcome";
import getAuthToken from "../util/auth";
import Side from "../Components/Side";



export default function SideBar(){
  const data=useLoaderData();
  const {first_name,last_name}=data.data[0];
  const token= getAuthToken();
  if (!token) {
    return <div>Not Found Page 404</div>; 
  }
return <>
  {token && <main>
  <nav>
    <Side/>
  </nav>
  <section>
    <Wellcome name={`${first_name}  ${last_name}`}/>
    <Outlet/>
  </section>
  </main>}
  
    
</>
}

export async function loader() {
  const token = getAuthToken();
  try {
      const response = await fetch("http://localhost:5000/api/Admin/profile", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          throw new Error(`API request failed with status: ${response.status}`);
      }
  } catch (err) {
      console.error('Error fetching data:', err.message);
      // Handle error gracefully (e.g., return default data, display error message)
      return null; // Or provide a default value
  }
}
