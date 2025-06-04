import React, { useContext, useEffect, useState } from "react";
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
  const { data, loading, error } = useQuery(FIND_ALL_CART_PRODUCTS);
  console.log(data?.findAllCartProduct);
  const handleBuy = () => {
    if (data?.findAllCartProduct) {
      // dispatch(setProducts(data.findAllCartProduct)); // Assuming setProducts exists
    }
  };
  return (
    <>
    <div className="p-6">
      <Link to="/products">
        <button className="p-2 bg-green-300 rounded-xl">Add Product</button>
      </Link>
      <Link to="/payment">
        <button onClick={handleBuy} className="p-2 bg-orange-300 rounded-xl">
          Buy
        </button>
      </Link>
      <div className="product-list">
        {data?.findAllCartProduct.map((product, index) => (
          <CartItem key={index} data={product} />
        ))}
      </div>
      </div>
    </>
  );
};
export default Cart;
