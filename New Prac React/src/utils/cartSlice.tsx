import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addItem: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeItem: (state) => {
//       state.items.pop();
//     },
//     clearCart: (state) => {
//       state.items.length = 0;
//     },
//   },
// });

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.products.push(action.payload);
    },
    removeItem: (state) => {
      state.products.pop();
    },
    clearCart: (state,action) => {
      // state.products.length = 0;
      // Or You can write return statement like below..
      // return {products:[]}
    },
    removeProduct: (state, action) => {
      // Filter out the product with the given productId
      state.products = state.products.filter(
        (item) => item.productId !== action.payload
      );
    },
    // New code:-
    addToCart(state,action){
      const {productId,quantity}=action.payload;
      const indexProductId=(state.products).findIndex(product=>product.productId===productId)
      if(indexProductId>=0){
        state.products[indexProductId].quantity += quantity;
      }else{
        state.products.push({productId,quantity});
      }
      // state.products.push(action.payload);
    },
    changeQuantity(state,action){
      const {productId,quantity}=action.payload;
      const indexProductId=(state.products).findIndex(product=>product.productId===productId)
      if(quantity>0){
        state.products[indexProductId].quantity   = quantity;
      }else{
       state.products=(state.products).filter(item=>item.productId!=productId)
      }
    }
  },
});

export const {addItem,removeItem,clearCart,addToCart,changeQuantity,removeProduct}=cartSlice.actions;
export default cartSlice.reducer;
