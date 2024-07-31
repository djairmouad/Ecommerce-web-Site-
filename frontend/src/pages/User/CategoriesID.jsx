import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router-dom"
import { fetchProductCategory, fetchProperties, fetchPropUseCategoryId, queryClient } from "../../util/http";
import BoxProduct from "../../Components/user/BoxProduct";
import { useEffect, useState } from "react";



export default function CategoriesID(){
    const [value,setValue]=useState([]);
    const params=useParams();
    const [searchParams,setSerachParams]=useSearchParams();
    const title=searchParams.get("name");
    const id=params.id;
    const {data,isLoading,isError}= useQuery({
        queryKey:["product","category",id],
        queryFn:()=>fetchProductCategory(id)
    })
    const {data:propertys}=useQuery({
        queryKey:["property",id],
        queryFn:()=>fetchProperties(id)
    })
    const categories=data?.data || [];
    const property=propertys?.data || [];
    const [serarch,setSerarch]=useState(categories);
    const [prev,setPrev]=useState([]);
    useEffect(()=>{

            async function virfy(prop,id){
                let newVlue= await fetchPropUseCategoryId(prop.trim(),id);
                setValue(prev=>[...prev,newVlue])
                return newVlue.id
            }
            let all=property.map((item)=>(
                  item.descriptions.split(",").forEach((prop)=>{
                        return virfy(prop,+id);
                    }) 
            ))
    },[property,id])
    if(isLoading){
        return <p>Loading..</p>
    }
    if(isError){
        return <p>Error..</p>
    }
 function handelSearch(event){
  let valueSearch=JSON.parse(event.target.value);
  console.log(valueSearch);
  if(!valueSearch.id){
    console.log(valueSearch.name)
    let hello=categories?.map(item=>item.properties.split(","));
    let data;
    let newPrev=[...prev].filter((ele)=>ele.name!==valueSearch.name)
    setPrev([...newPrev]);
    newPrev=newPrev.map((item)=>`${item.id}`);
    hello=hello.map((item)=>item.map((ele)=>newPrev.includes(ele)));
    hello=hello.map((item)=>item.filter((ele)=>ele===true))
      data=categories?.filter((item,index)=>hello[index].length===newPrev.length)
    setSerarch([...data]);
    return null
  }
  
  let newPrev;
  let verify=prev.findIndex((item)=>item.name===valueSearch.name);
  if(verify!==-1){
    newPrev=[...prev];
    newPrev[verify]=valueSearch;
  }else{
    newPrev=[...prev,valueSearch];
  }
  setPrev([...newPrev]);
    let hello=categories?.map(item=>item.properties.split(","));
    let data;
    newPrev=newPrev.map((item)=>`${item.id}`);
    hello=hello.map((item)=>item.map((ele)=>newPrev.includes(ele)));
    hello=hello.map((item)=>item.filter((ele)=>ele===true))
      data=categories?.filter((item,index)=>hello[index].length===newPrev.length)
     console.log(data);
    setSerarch([...data])
  }
  function handelSearchBySort(event){
    let value=event;
    let sortingPrice=[...serarch].map((item)=>item.price).sort();
    let newSort;
    if(value!==""){
        if(value==="lowest"){
            newSort=[...sortingPrice].map((ele)=>{
            return [...serarch].find((item=>item.price===ele))
         })
        }else if(value==="highest"){
            sortingPrice=[...sortingPrice].reverse();
            newSort=[...sortingPrice].map((ele)=>{
                return [...serarch].find((item=>item.price===ele))
             })
        }
        setSerarch([...newSort]);
        return null
    }
 }
return <div className="bg-regal-blue mt-5 text-lg font-bold capitalize min-h-[90vh]">
<div className="bg-regal-blue mb-3 pt-3 flex justify-between ">
<h2 className=" px-10 text-3xl font-black w-fit ">{title}</h2>
<div id="selctors" className=" flex w-3/5 justify-center gap-5">
{
    property.map((item)=>(
        <div key={item.id} htmlFor={item.id} className="  text-base w-fit  font-normal flex  border rounded-lg p-1 bg-gray-300 ">
        <label className=" pr-2 self-center">{item.name}:</label>
        <select id={item.id}  className=" outline-none bg-gray-300" onChange={(event)=>handelSearch(event)}>
     <option style={{backgroundColor: 'rgb(0 0 0 / 42%)'}} className=" text-white" value={JSON.stringify({name:item.name})}>All</option>
            {item.descriptions.split(",").map((prop,index)=>{
                const opt=value.find(ele=>ele.description===prop.trim());
                const name=opt?.name || "";
                const id=opt?.id || "";
                const send={name:name,id:id}
                return <option style={{backgroundColor: 'rgb(0 0 0 / 42%)'}} className=" text-white" key={index} value={JSON.stringify(send) || ""}>{opt?.description || ""}</option>
            }) }
        </select>
        </div>
    ))
}
<select  className=" outline-none bg-gray-300 text-base font-normal border rounded-lg" onChange={(event)=>handelSearchBySort(event.target.value)}>
<option style={{backgroundColor: 'rgb(0 0 0 / 42%)'}} className=" text-white text-base"  value="lowest">Price lowest first</option>
<option style={{backgroundColor: 'rgb(0 0 0 / 42%)'}} className=" text-white text-base" value="highest">Price highest first</option>
</select>
</div>
</div>
 
<div className="flex flex-wrap  flex-row w-full  px-10 gap-2 bg-regal-blue text-lg font-bold capitalize min-h-[90vh] ">
{serarch.map((item)=>(
    <BoxProduct key={item.id}  title={item.name} price={item.price} id={item.id} />
))}

</div>
</div>
}

export async function loader({params}){
    const id=params.id
     return queryClient.fetchQuery(
    {
        queryKey:["product","category",id],
        queryFn:()=>fetchProductCategory(id)
       }
)
}