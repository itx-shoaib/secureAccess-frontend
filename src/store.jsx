import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./slices/apiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
reducer : {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authReducer
},
middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware), //Middleware is a way to extend Redux with custom functionality
devTools:true
})

export default store;