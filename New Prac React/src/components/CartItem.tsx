import React, { useContext, useEffect, useState } from "react";
import useProduct from "../utils/useProducts";
import { useDispatch } from "react-redux";
import { changeQuantity, removeProduct } from "../utils/cartSlice";
import UserContext from "../utils/UserContext";

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  console.log(props.data);
  
  const dispatch = useDispatch();
  const productInfo = useProduct(productId);
  console.log("productId,quantity", productId, quantity);
  console.log(productInfo);
  console.log("Over=======================")
  const handleMinusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  };
  const handlePlusQuantity = () => {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  };
  const handleRemoveProduct = () => {
    dispatch(removeProduct(productId))
  };
  return (
    <>
      <div className="product-card">
        <h3>{productInfo.name}</h3>
        <p>{productInfo.id}</p>
        <p>{productInfo.description}</p>
        <p>${productInfo.price}</p>
        <p>Total Price: ${productInfo.price * quantity}</p>
        <img
          src={productInfo.link}
          alt={productInfo.name}
          width="200"
          height="180"
        />
        <button
          onClick={handleMinusQuantity}
          className="bg-gray-300 text-black rounded-full w-10 h-10 text-3xl"
        >-</button>
        <span className="mx-4 text-lg">{quantity}</span>
        <button
          onClick={handlePlusQuantity}
          className="bg-gray-300 text-black rounded-full w-10 h-10 text-3xl"
        >
          +
        </button>
        <button
        onClick={handleRemoveProduct}
        className="mt-4 bg-red-500 text-white p-2 rounded-xl"
      >
        Remove Product
      {/* className=" p-2 text-2xl"
      >
        🗑 */}
      </button>
      </div>
    </>
  );
};

export default CartItem;
