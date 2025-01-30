import React from "react";
import ProductCard from "./Product/productCard";
import { useDispatch, useSelector } from "react-redux";
import ProductInfo from "./Product/ProductInfo";
import { clearCart } from "../utils/cartSlice";
import cartItem from "./CartItem";
import CartItem from "./CartItem";

// New code
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.products);
  console.log("cartItems in cart=======>", cartItems);

  return (
    <>
    <div className="product-list">
      {cartItems.map((product, index) => (
        <CartItem key={index} data={product} />
      ))}
      </div>
    </>
  );
};

// Old code
// const Cart = () => {
//   // subscribe to the store to display
//   const cartItems = useSelector((store) => store.cart.products);
//   console.log("cartItems in cart=======>", cartItems);
//   const dispatch=useDispatch()
//   const handleClearCart=()=>{
//     dispatch(clearCart())
//   }
//   return (
//     <>
//       {/* <ProductCard product={cartItems} /> */}
//       {cartItems.length > 0 ? (
//       <>
//         {/* <button className="">Clear Cart</button> */}
//         <div className="flex">
//             <button className="my-4 p-2 mx-auto bg-black text-white rounded-lg" onClick={handleClearCart}>Clear Cart</button>
//           </div>
//       <div className="product-list">
//       {cartItems.map((product, index) => (
//         <ProductCard key={index} product={product} />
//       ))}
//       </div>
//       </>
//      ) : (
//       <p>Your cart is empty.</p>  // Display message if cart is empty
//     )}
//     </>
//   );
// };

export default Cart;
