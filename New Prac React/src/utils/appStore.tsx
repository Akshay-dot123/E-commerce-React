import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
const appStore=configureStore({
reducer:{  // Big reducer
    cart:cartReducer,  // small reducers
}
})
export default appStore;