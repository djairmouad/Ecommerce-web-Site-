import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product.Redux";
import categoriesReducer from "./categories";



const store=configureStore({
    reducer:{product:productReducer,categorie:categoriesReducer}
})

export default store