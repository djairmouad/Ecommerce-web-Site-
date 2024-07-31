import { createSlice } from "@reduxjs/toolkit";
const initialState={
    show:false,
    showId:null,
    Delete:false,
    showProperty:false
}
const categoriesSlice=createSlice({
    name:"categories",
    initialState:initialState,
    reducers:{
        showEdit(state,action){
        if( action.payload.act==="open"){
           state.show=true;
           state.showId=action.payload.id
        }else{
            state.show=false;
            state.showId=null;
        }
        },
        deleteEdit(state,action){
            if(action.payload.act==="open"){
                state.Delete=true
                state.showId=action.payload.id
            }else{
                state.Delete=false;
                state.showId=null;
            }
        },
        ShowProperty(state,action){
            if(action.payload.act==="open"){
                state.showProperty=true;
            }else{
                state.showProperty=false
            }
        }
    }
})

const categoriesReducer=categoriesSlice.reducer;
export default categoriesReducer;

export const categoriesAction=categoriesSlice.actions;