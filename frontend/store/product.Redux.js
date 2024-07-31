import{createSlice} from "@reduxjs/toolkit";

   

const carts = localStorage.getItem("cart");
const cartLength = carts ? JSON.parse(carts).length : 0; // Check if carts is not null

const initialState={
show:false,
showId:null,
newShow:false,
showConfi:false,
NumProduct:cartLength
}
const productSlice=createSlice({
    name:"product",
    initialState:initialState,
    reducers:{
        openModal(state,action){
         if(action.payload.act==="open"){
            state.show=true; 
            state.showId=action.payload.id
         }else{
            state.show=false; 
            state.showId=null;
         }
           
        },openNewModal(state,action){
         if(action.payload.act==="open"){
            state.newShow=true;
         }else{
            state.newShow=false;
         }
         },
         openConfirmationModal(state,action){
            if(action.payload.act==="open"){
               state.showConfi=true;
               state.showId=action.payload.id
            }else if(action.payload.act==="remove"){
               state.showConfi=false;
               state.showId=null;
            }
         },
         HandelProduct(state,action){
            if(action.payload.act==="add"){
            const {info}=action.payload;
            let allCarts=localStorage.getItem("cart");
            const cart=allCarts? JSON.parse(allCarts):[];
            const newProduct=cart.findIndex((item)=>{
            return item.id===info.id
            })
            if(newProduct===-1){
               cart.push(info);
               localStorage.setItem("cart",JSON.stringify([...cart]));
            }else{
               
               cart[newProduct].counter++;
               cart[newProduct].totalPrice=info.price * cart[newProduct].counter;
               localStorage.setItem("cart",JSON.stringify([...cart]));
            }
             
             const carts=localStorage.getItem("cart");
             state.NumProduct=JSON.parse(carts).length;
              state.showId=action.payload.id;
            }else if(action.payload.act==="remove"){
              const {info}=action.payload;
              let allCarts=localStorage.getItem("cart");
              let cart=allCarts?JSON.parse(allCarts) : [];
              const newProduct=cart.findIndex((item)=>{
               return item.id===info.id
              })
              if(newProduct===-1){
               return null;
              }else{
               cart[newProduct].counter--;
               cart[newProduct].totalPrice=cart[newProduct].counter*cart[newProduct].price;
               cart=cart.filter((item)=>{
                  return item.counter!==0
               })
               localStorage.setItem("cart",JSON.stringify([...cart]));
               state.NumProduct=cart.length;
              }
              state.showId=action.payload.id
            }
         },
         removeProduct(state){
            state.NumProduct=0;
         }
    }
})
export  const productAction=productSlice.actions;
const productReducer=productSlice.reducer
export default productReducer;

