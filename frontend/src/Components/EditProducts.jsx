import { useQuery } from "@tanstack/react-query";
import { DeletePropertyFromProdcut, fetchCategories, fetchImages, fetchProduct, fetchPropertyUseId, handelDeleteImage,queryClient,updateProduct } from "../util/http";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'; //
import {motion} from "framer-motion"
export default function EditProducts({ title, id, heandelClose, newProduct, method }) {
  const [currentFile, setFile] = useState(null);
  const [prop,setProp]=useState({
    property:[],
    AllProp:[]
  });
  const [submitting, setSubmitting] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id),
  });
  const { data:AllCategories} = useQuery({
        queryKey:["categories"],
        queryFn:fetchCategories,
  });

   const { data:AllImages,isLoading:loadImage,isError:errorImages}=useQuery({
    queryKey:["images",id],
    queryFn:()=>fetchImages(id)
   })
   const product = data?.data[0] || {};
   const images = AllImages?.data || [];
   const imageLength=images.length;
   useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPropertyUseId(product?.properties?.split(",") || []);
      setProp((prev)=>{
        return {...prev,...data}
      });
    };
    fetchData();
  }, [product.properties]);
  const options=AllCategories.data;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    const fd = new FormData(event.target);
  
    if (currentFile) {
      fd.append("file", currentFile);
    }
    const formData = new FormData();
    formData.append('imageProduct',currentFile); 
    formData.append("name",fd.get("name"));
    formData.append("description",fd.get("description"));
    formData.append("price",fd.get("price"));
    formData.append("stock_quantity",fd.get("stock_quantity"));
    formData.append("category_id",fd.get("category_id"));
    console.log(id);
    await updateProduct(formData, method, id);
    heandelClose();
  }
  function handelDelete(id){
    handelDeleteImage(id);
  }
   function handelDeletProperity(id_prop){
    console.log(id_prop);
     DeletePropertyFromProdcut({id_product:id,id:id_prop})
     queryClient.invalidateQueries(["products", id])
  }
  if (isLoading || loadImage) return <p>Loading...</p>;
  if (isError ||  errorImages) return <p>{errorImages}</p>;
  if (!data) return <p>No Data</p>;
  console.log(prop);
  return (
    <div id="form-product" className=" p-3">
      <h1 className=" text-2xl font-bold">{title}</h1>
      <form onSubmit={handleSubmit}   encType="multipart/form-data"  style={{ width: "400px",gap:"10px", height: "500px",paddingBottom:"20px",paddingTop:"20px" }}>
        <div id="info-product">
          <label htmlFor="name">Name:</label>
          <input type="text" className=" border pl-1 border-black rounded-sm " id="name" name="name" defaultValue={product.name} />
        </div>
         
        <div id="info-product-image" style={{marginTop: "10px",gap:"10px"}}>
        <label htmlFor="imageProduct">Images:</label>
        {imageLength === 0 ? null : (
  <motion.div
  style={{display:"flex",gap:"5px"}}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.5,
        },
      },
    }}
    initial="hidden"
    animate="visible"
  >
    {images.map((item) => (
      <motion.div
        
        key={item.id}
        id="image"
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        }}
      >
        <motion.img
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 },
          }}
          src={`http://localhost:5000/image/${item.name}`}
          alt={item.name}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => handelDelete(item.id)}
        >
          Delete
        </motion.button>
        <motion.svg
        whileHover={{scale:1.1}}
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ff0000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M10 11V17" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 11V17" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M4 7H20" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </g>
        </motion.svg>
      </motion.div>
    ))}
  </motion.div>
)}

          {imageLength<3 ? <motion.div whileHover={{scale:1.1}} id="upload">
            <FontAwesomeIcon id="icon" icon={faImage} />
            <input type="file" name="imageProduct" id="imageProduct" onChange={handleFileChange} />
          </motion.div>:null
          }
        </div>
      
        <div id="info-product">
          <label htmlFor="description">Description:</label>
          <textarea type="text" className=" border pl-1 border-black rounded-sm " style={{height:"100px"}} id="description" name="description">{product.description}</textarea>
        </div>
        <div id="info-product">
          <label htmlFor="price">Price:</label>
          <input type="number" className=" border pl-1 border-black rounded-sm " id="price" name="price" defaultValue={product.price} />
        </div>
        <div id="info-product">
          <label htmlFor="stock_quantity">Stock Quantity:</label>
          <input type="number" className=" border pl-1 border-black rounded-sm " id="stock_quantity" name="stock_quantity" defaultValue={product.stock_quantity} />
        </div>
        <div id="info-product">
        {prop.AllProp.map((item, index) => {
  return (
    <div key={index} style={{display: "flex", flexDirection: "column"}}>
      <label htmlFor={item} style={{textTransform: "capitalize"}}>{item}:</label>
      {prop.property
        .filter((ele) => ele.name === item)
        .map((ele) => {
          return (
            <div key={ele.id} style={{marginBottom: "10px"}}>
            <input
            className=" border pl-1 border-black rounded-sm "
              style={{width: "40%"}}
              type="text"
              id={name}
              name={name}
              defaultValue={ele.description}
              disabled
            />
     <motion.button whileHover={{scale:1.1}} 
     type="button" style={{backgroundColor: "var(--delete-color)",
    border: "none",
    fontWeight: "600",
    height: "97%",
    marginLeft: "5px",
    color: "var(--delete-text-color)"}} onClick={()=>handelDeletProperity(ele.id)}>DELETE</motion.button>
            </div>
          );
        })}
    </div>
  );
})}

        </div>
        <div id="info-product">
          <label htmlFor="category-product">Category:</label>
          <select id="category-product" className=" border pl-1 border-black rounded-sm " name="category_id" defaultValue={product.category_id}>
           {options.map((opt)=><option key={opt.id} value={opt.id}>{opt.name}</option>
           )}
          </select>
        </div>
        <div id="info-product">
          <motion.button 
          whileHover={{scale:1.1}}
          type="button" onClick={heandelClose}>Close</motion.button>
          <motion.button 
          whileHover={{scale:1.1}}
          type="submit">
            {submitting ? 'Submitting...' : newProduct ? 'Create' : 'Edit'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
