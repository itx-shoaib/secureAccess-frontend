import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"

const store = configureStore({
reducer : {
    auth:authReducer
},
middleware:(getDefaultMiddleware)=>getDefaultMiddleware(), //Middleware is a way to extend Redux with custom functionality
devTools:true
})

export default store;