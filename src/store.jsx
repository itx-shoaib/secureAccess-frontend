import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
reducer : {},
middleware:(getDefaultMiddleware)=>getDefaultMiddleware(), //Middleware is a way to extend Redux with custom functionality
devTools:true
})

export default store;