import React, { useContext, useEffect } from "react";
import ProductCard from "./Product/productCard";
import { useDispatch, useSelector } from "react-redux";
import ProductInfo from "./Product/ProductInfo";
import { clearCart, setProducts } from "../utils/cartSlice";
import CartItem from "./CartItem";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FIND_ALL_CART_PRODUCTS } from "../graphql/queries";

// New code
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.products);
  const dispatch = useDispatch();
  console.log("cartItems in cart=======>", cartItems);

  const { data, loading, error } = useQuery(FIND_ALL_CART_PRODUCTS, {
    fetchPolicy: "network-only",
  });
  // useEffect(() => {
  //   if (data && data.findAllCartProduct) {
  //     const normalizedProducts = data.findAllCartProduct.map((item) => ({
  //       productId: item.product.id, // rename
  //       quantity: item.quantity,
  //     }));
  //     // dispatch(setProducts(data.findAllCartProduct));
  //     dispatch(setProducts(normalizedProducts));
  //   }
  // }, [data, dispatch]);
  // if (loading) return <p>Loading...</p>;
  // if (error) {
  //   console.error("GraphQL Error:", error);
  //   return <p>Error fetching cart products.</p>;
  // }
  // console.log(data.findAllCartProduct);
  return (
    <>
      <Link to="/products">
        <button className="p-2 bg-green-300 rounded-xl">Back</button>
      </Link>
      <div className="product-list">
        {/* {cartItems.map((product, index) => ( */}
        {data?.findAllCartProduct.map((product, index) => (
          <CartItem key={index} data={product} />
        ))}
      </div>
    </>
  );
};
export default Cart;