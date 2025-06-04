import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FIND_ALL_CART_PRODUCTS, FIND_ALL_PRODUCTS } from "../graphql/queries";
import ProductCard, { withLabel } from "./Product/productCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../utils/cartSlice";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  link: string;
  itemCount?: number;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<Product[]>([]);
  const ProductPromoted = withLabel(ProductCard);

  const cart = useSelector((state: any) => state.cart.products);
  console.log("cart in cart======>",cart)
  const { data, loading, error } = useQuery(FIND_ALL_PRODUCTS);
  const {
    data: cartData,
    loading: cartLoad,
    error: cartError,
  } = useQuery(FIND_ALL_CART_PRODUCTS, {
    fetchPolicy: "network-only",
  });
  console.log(data?.findAllProduct);
  useEffect(() => {
    if (data && data?.findAllProduct) {
      // dispatch(setProducts(data.findAllProduct))
      setFilteredProducts(data.findAllProducts);
    }
  }, [data]);
  console.log("===========>", filteredProducts);

  useEffect(() => {
    console.log("useEffect");
    if (cartData && cartData.findAllCartProduct) {
      const normalizedProducts = cartData.findAllCartProduct.map((item) => ({
        productId: item.product.id, // rename
        quantity: item.quantity,
      }));
      console.log("NormalizeProducts", normalizedProducts);
      // dispatch(setProducts(data.findAllCartProduct));
      dispatch(setProducts(normalizedProducts));
    }
  }, [cartData, dispatch]);
  if (cartLoad) return <p>Loading...</p>;
  if (cartError) {
    console.error("GraphQL Error:", cartError);
    return <p>Error fetching cart products.</p>;
  }
  // cartData.findAllCartProduct?.map((product) => {
  //   console.log(product);
  // });
  return (
    <>
      <div className="product-list">
        {data?.findAllProduct?.map((product) => {
          console.log(product);
          console.log("=============");
          // cartData.findAllCartProduct?.map((product) => {
          //   console.log(product);
          // });
          const cartItem = cart.find((item) => item.productId === product.id);
          console.log("cartItem=======>",cartItem)
          const quantity = cartItem?.quantity || 0;
          console.log("=============");
          return (
            <>
              <Link>
                {product.promoted ? (
                  <ProductPromoted product={product} quantity={quantity} />
                ) : (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                )}
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
