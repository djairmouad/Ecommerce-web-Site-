import { useRouteError } from "react-router-dom"

export default function Error(){
    const error=useRouteError();
    let message = "An unexpected error occurred.";
    if (error) {
      if (error.data && error.data.message) {
        message = error.data.message;
      } else if (error.message) {
        message = error.message;
      }
    }
    
    return <>
    <h1>Error:</h1>
    <p>{message }</p>
    </>
}