import React, { useEffect, useState } from "react";
import {
  addItem,
  addToCart,
  changeQuantity,
  setProducts,
} from "../../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../CartItem";
import useProduct from "../../utils/useProducts";
import HomeProduct from "./HomeProduct";
import { legacy_createStore } from "@reduxjs/toolkit";
import { getDecodedToken } from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_CART } from "../../graphql/mutation";
import { toast } from "react-toastify";
import { FIND_ALL_CART_PRODUCTS } from "../../graphql/queries";
interface Product {
  name: string;
  description: string;
  price: number;
  link: string;
}

// Define the props interface for the ProductCard component.
interface ProductCardProps {
  product: Product;
}

// Perfect code
const ProductCard: React.FC<ProductCardProps> = ({ product, quantity = 0 }) => {
  const decoded = getDecodedToken();
  const userId = decoded?.id;
  console.log("userId==========>", userId);
  console.log("product===========>", product?.id);
  const [createCart, { data, loading, error }] = useMutation(CREATE_CART);
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.products); // Get cart products from Redux
  console.log("Cart===========>", cart);
  // Find product in cart
  const cartItem = cart.find((item) => item.productId === product.id);
  console.log("cartItem=========>", cartItem);
  // const quantity = cartItem ? cartItem.quantity : 0; // Get quantity
  // console.log("quantity=========>", quantity);

  const handleAddToCart = async () => {
    const quantityToAdd = 1;
    dispatch(
      addToCart({
        productId: product.id,
        quantity: quantityToAdd,
      })
    );
    console.log(cartItem?.quantity);
    const res = await createCart({
      variables: {
        createCartInput: {
          productId: product?.id.toString(),
          quantity: quantityToAdd,
        },
      },
    });
    console.log("res=========>", res);
    toast("Cart created Successfully");
  };

  // const {
  //   data: cartData,
  //   loading: cartLoad,
  //   error: cartError,
  // } = useQuery(FIND_ALL_CART_PRODUCTS);
  // useEffect(() => {
  //   console.log("useEffect");
  //   if (data && data.findAllCartProduct) {
  //     const normalizedProducts = data.findAllCartProduct.map((item) => ({
  //       productId: item.product.id, // rename
  //       quantity: item.quantity,
  //     }));
  //     // dispatch(setProducts(data.findAllCartProduct));
  //     dispatch(setProducts(normalizedProducts));
  //   }
  // }, [cartData, dispatch]);
  // if (cartLoad) return <p>Loading...</p>;
  // if (cartError) {
  //   console.error("GraphQL Error:", cartError);
  //   return <p>Error fetching cart products.</p>;
  // }
  // cartData.findAllCartProduct?.map((product) => {
  //   console.log(product);
  // });

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      {/* <Link to={`/products/${product.id}`}> */}
      <img src={product.link} alt={product.name} width="200" height="180" />
      {/* </Link> */}

      <button
        className="p-2 bg-yellow-300 rounded-xl"
        onClick={handleAddToCart}
      >
        Add To Cart {quantity > 0 && `(${quantity})`}
        {/* Add TO Cart ({quantity}) */}
      </button>
      <Link to="/cart">
        <button className="p-2 m-2 bg-orange-400 rounded-xl">Go to cart</button>
      </Link>
    </div>
  );
};

// High Order Component
export const withLabel = (ProductCard) => {
  return (props) => {
    return (
      <>
        <div className="relative flex">
          <label className="absolute m-2 p-2 opacity-30 bg-black text-white rounded-lg">
            Promoted
          </label>
        </div>
        <ProductCard {...props} />
      </>
    );
  };
};
export default ProductCard;
