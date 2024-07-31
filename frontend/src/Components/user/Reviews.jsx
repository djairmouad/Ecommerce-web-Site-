import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "./Ui-user/Button";
import { fetchReviews, SaveReview } from "../../util/http";
import {  useParams } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";

export default function Reviews(){
    const [rating,setRating]=useState(null);
    const [hover,setHover]=useState(null);
    const [star,setStar]=useState(false)
    const {id}=useParams();
    const {data,isLoading,isError}=useQuery({
        queryKey:["Reviews",id],
        queryFn:()=>fetchReviews(id)
    })
    function handelSave(event){
        event.preventDefault()
        if(rating===null){
           setStar(true)
        }else{
            setStar(false)
            const fd=new FormData(event.target);
            const data=Object.fromEntries(fd.entries())
            const date=new Date().toUTCString();
            const formData={...data,date:date,stars:rating,product_id:+id}
            console.log(formData)
            SaveReview(formData,id);
        }
       
    }
    const Reviews=data?.data || [];
    console.log(Reviews);
    return (
        <div id="Reviews" className="flex justify-around gap-8 mb-8">
        {isError && (<div>
        <p className=" text-red-500">something</p>
          </div>  )}
          
        <div id="review" className=" flex flex-col bg-white justify-center p-8 border rounded-xl border-white w-2/5 h-fit pl-5 ml-11 shadow-2xl">
           <h1 className=" mb-3 pl-1 text-xl font-semibold">Add a Review</h1>
           <div id="iconStart" className=" pb-4">
           {star && <p className=" text-red-500">Select a Stars!!</p>}
           {[...Array(6)].map((item,index)=>{
            const currentValue=index+1;
            return<label key={index} >
            <input 
            type="radio" 
            className=" hidden"
            name="rating" 
            value={currentValue} 
              onClick={()=>{setRating(currentValue)}}
            />
            <FontAwesomeIcon onMouseOver={()=>{setHover(currentValue)}} onMouseOut={()=>{setHover(null)}} color={(currentValue <= (rating || hover) )? ("yellow"):""}   icon={faStar} />
            </label>
            
          })}
           </div>
           <div id="rev">
           <form onSubmit={handelSave}  action="POST" className=" flex flex-col gap-5 w-2/3 ">
            <input type="text" required name="title" placeholder="Title" className=" border border-gray-400 rounded-md pl-2 h-8"/>
            <textarea placeholder="was it's good?Pros?Cons" name="description" required className=" h-20 border border-gray-400 rounded-md pl-2"></textarea>
            <Button className=" bg-green-600 text-white">Submit Your review</Button>
           </form>
           </div>
        </div>
        <div id="review" className="shadow-2xl p-8  w-2/5 pl-5 bg-white border rounded-xl border-white">
           <h1 className="text-xl font-semibold">All Reviews</h1> 
           <span className=" w-ful h-px opacity-40 block bg-gray-400 mt-2"></span>
           {isLoading && <p>Loading...</p>}
           {!isLoading &&
            Reviews.map((item,index)=>{
            return <div key={index}>
            <div className="flex flex-row w-full justify-between items-center">
            <div>
                {[...Array(6)].map((event,index)=>{
                const currentValue=index+1;
                return <label key={index} >
            <input 
            type="radio" 
            className=" hidden"
            name="rating" 
            value={currentValue} 
            />
            <FontAwesomeIcon color={(currentValue <= item.stars )? ("yellow"):""}  icon={faStar} />
            </label>
            })}
            </div>
             <p className="block text-xs">{item.date}</p>
            </div>
            <div key={index} id="rev">
            <h1 className=" font-medium text-base mb-2">{item.title}</h1>
            <p className="text-sm">{item.description}</p>
           </div>
           <span className=" w-ful h-px opacity-40 block bg-gray-400 mt-2"></span>
            </div>
          })}
        </div>
      </div>
    )
}