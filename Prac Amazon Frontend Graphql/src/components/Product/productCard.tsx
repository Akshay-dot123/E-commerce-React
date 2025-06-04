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
  id: number;
  name: string;
  description: string;
  price: number;
  link: string;
}

// Define the props interface for the ProductCard component.
interface ProductCardProps {
  product: Product;
  quantity?: number;
}

// Perfect code
const ProductCard: React.FC<ProductCardProps> = ({ product, quantity = 0,refetchCart }) => {
  console.log("product===========>", product?.id);
  // const { data: cartData, refetch } = useQuery(FIND_ALL_CART_PRODUCTS, {
  //   fetchPolicy: "network-only",
  //   onError: (err) => {
  //     console.error("Fetch all Cart Products Error:", err);
  //   },
  // });
  const [createCart, { data, loading, error }] = useMutation(CREATE_CART, {
    onError: (err) => {
      console.error("Create Cart Products Error:", err);
    },
    refetchQueries: [{ query: FIND_ALL_CART_PRODUCTS }],
  });

  const handleAddToCart = async () => {
    const quantityToAdd = 1;
    console.log("product--------------->", product.id.toString());
    console.log("quantityToAdd--------------->",quantityToAdd);
    try {
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
    } catch (err) {
      if (err.networkError) {
        toast.error("Server unreachable. Try again shortly.");
      } else {
        toast.error("Failed to add to cart.");
      }
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={product.link} alt={product.name} width="200" height="180" />
      <button
        className="p-2 bg-yellow-300 rounded-xl"
        onClick={handleAddToCart}
      >
        Add To Cart {quantity > 0 && `(${quantity})`}
      </button>

      <Link to="/cart">
        <button className="p-2 m-2 bg-orange-400 rounded-xl">Go to cart</button>
      </Link>
    </div>
  );
};
export default ProductCard;
