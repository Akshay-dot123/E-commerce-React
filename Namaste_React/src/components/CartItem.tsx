import React, { useEffect, useState } from "react";
import useProduct from "../utils/useProducts";
import { useDispatch } from "react-redux";
import { changeQuantity } from "../utils/cartSlice";

const CartItem = (props) => {
  const { productId, quantity } = props.data;
  const [detail, setDetail] = useState([]);
  const dispatch = useDispatch();
  const productInfo = useProduct(productId);
  console.log("productId,quantity", productId, quantity);
  console.log(productInfo);

  // useEffect(() => {  // Not Required
  //   setDetail(productInfo);
  // }, [productId]);
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
  return (
    <>
      <div className="product-card">
        <h3>{productInfo.name}</h3>
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
      </div>
    </>
  );
};

export default CartItem;
