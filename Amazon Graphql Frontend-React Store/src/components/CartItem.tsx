import React, { useContext, useEffect, useState } from "react";
import useProduct from "../utils/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, removeProduct } from "../utils/cartSlice";
import UserContext from "../utils/UserContext";
import { useMutation } from "@apollo/client";
import { ADD_ITEM_QUANTITY_CART, DELETE_CART, REMOVE_ITEM_QUANTITY_CART } from "../graphql/mutation";
import { toast } from "react-toastify";
import { FIND_ALL_CART_PRODUCTS } from "../graphql/queries";

const CartItem = (props) => {
  const cart = useSelector((state: any) => state.cart.products); // Get cart products from Redux
  console.log("Cart===========>", cart);
  const { quantity } = props.data;
  console.log(props.data);
  const productInfo=props?.data?.product;
  const [deleteCart] = useMutation(DELETE_CART);
  const [AddItemQuantityInCart] = useMutation(ADD_ITEM_QUANTITY_CART);
  const [SubtractItemQuantityInCart] = useMutation(REMOVE_ITEM_QUANTITY_CART);
  
  const dispatch = useDispatch();
  const handleMinusQuantity = async () => {
    dispatch(
      changeQuantity({
        productId: productInfo.id,
        quantity: props?.data?.quantity - 1,
      })
    );
    const res = await SubtractItemQuantityInCart({
      variables: {
        id:  productInfo.id,
      },
      refetchQueries: [{ query: FIND_ALL_CART_PRODUCTS }],
    });
    console.log("res=========>",res)
    // console.log("Removed cart ID:", res.data.subtractItemQuantityInCart.id);
  };
  const handlePlusQuantity = async() => {
    dispatch(
      changeQuantity({
        productId: productInfo.id,
        quantity: props?.data?.quantity + 1,
      })
    );
    const res = await AddItemQuantityInCart({
      variables: {
        id: productInfo.id,
      },
      refetchQueries: [{ query: FIND_ALL_CART_PRODUCTS }],
    });
    console.log("res=========>",res)
    console.log("Added cart ID:", res.data.addItemQuantityInCart.id);
  };
  const handleRemoveProduct = async() => {
    dispatch(removeProduct(productInfo.id))
    const res = await deleteCart({
      variables: {
        id: productInfo.id,
      },
      refetchQueries: [{ query: FIND_ALL_CART_PRODUCTS }],
    });
    console.log("res=========>",res)
    console.log("Deleted cart ID:", res.data.deleteCart.id);
    toast("Cart deleted successfully!");
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
      </button>
      </div>
    </>
  );
};

export default CartItem;
