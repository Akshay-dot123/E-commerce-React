// import { useMutation, useQuery } from "@apollo/client";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FIND_ALL_CART_PRODUCTS, FIND_ALL_PRODUCTS } from "../graphql/queries";
// import ProductCard from "./Product/productCard";
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   link: string;
//   itemCount?: number;
// }

// interface CartItem {
//   productId: number;
//   quantity: number;
// }

// const Dashboard = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [searchText, setSearchText] = useState<string>("");
//   const [normalizedCart, setNormalizedCart] = useState<CartItem[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const { data, loading, error } = useQuery(FIND_ALL_PRODUCTS);
//   const {
//     data: cartData,
//     error: cartError,
//     refetch: refetchCart,
//   } = useQuery(FIND_ALL_CART_PRODUCTS, {
//     fetchPolicy: "network-only",
//   });
//   // console.log(data?.findAllProduct);
//   useEffect(() => {
//     if (data?.findAllProduct) {
//       setProducts(data.findAllProduct);
//       setFilteredProducts(data.findAllProduct);
//     }
//   }, [data]);

//   useEffect(() => {
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(searchText.trim().toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   }, [searchText, products]);

//   useEffect(() => {
//     console.log("useEffect");
//     if (cartData && cartData.findAllCartProduct) {
//       const normalizedProducts = cartData.findAllCartProduct.map((item) => ({
//         productId: item.product.id, // rename
//         quantity: item.quantity,
//       }));
//       console.log("NormalizeProducts", normalizedProducts);
//       setNormalizedCart(normalizedProducts);
//     }
//   }, [cartData]);
//   return (
//     <>
//     <div className="pl-6 pt-6">
//       <input
//         type="text"
//         className="border-2 border-black rounded-lg"
//         value={searchText}
//         placeholder="  Search by Product"
//         onChange={(e) => {
//           setSearchText(e.target.value);
//         }}
//       />
//       </div>
//       <div className="product-list">
//         {/* {data?.findAllProduct?.map((product) => {
//           console.log(product);
//           console.log("=============");
//           // cartData.findAllCartProduct?.map((product) => {
//           //   console.log(product);
//           // });
//           const cartItem = normalizedCart.find((item) => item.productId === product.id);
//           const quantity = cartItem?.quantity || 0;*/}

//         {filteredProducts.map((product) => {
//           const cartItem = normalizedCart.find(
//             (item) => item.productId === product.id
//           );
//           const quantity = cartItem?.quantity || 0;
//           return (
//             <Link key={product.id}>
//               <ProductCard
//                 product={product}
//                 quantity={quantity}
//                 // refetchCart={refetchCart}
//               />
//             </Link>
//           );
//         })}
//       </div>
//     </>
//   );
// };
// export default Dashboard;


import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FIND_ALL_CART_PRODUCTS, FIND_ALL_PRODUCTS } from "../graphql/queries";
import ProductCard from "./Product/productCard";
import { Range, getTrackBackground } from "react-range";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  link: string;
  itemCount?: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}

const MIN = 0;
const MAX = 1400;

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [normalizedCart, setNormalizedCart] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([MIN, MAX]);

  const { data } = useQuery(FIND_ALL_PRODUCTS);
  const {
    data: cartData,
    refetch: refetchCart,
  } = useQuery(FIND_ALL_CART_PRODUCTS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.findAllProduct) {
      setProducts(data.findAllProduct);
      setFilteredProducts(data.findAllProduct);
    }
  }, [data]);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.trim().toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [searchText, products, priceRange]);

  useEffect(() => {
    if (cartData?.findAllCartProduct) {
      const normalizedProducts = cartData.findAllCartProduct.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      setNormalizedCart(normalizedProducts);
    }
  }, [cartData]);

  return (
    <>
      {/* Top filter row */}
      <div className="flex items-center gap-8 p-6 flex-wrap">
        {/* Search Box */}
        <input
          type="text"
          className="border-2 border-black rounded-lg px-3 py-1 w-64"
          value={searchText}
          placeholder="Search by Product"
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Price Range Slider */}
        <div className="w-full sm:w-auto flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="w-72">
            <Range
              step={10}
              min={MIN}
              max={MAX}
              values={priceRange}
              onChange={(values) => setPriceRange(values)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ["#ccc", "#548BF4", "#ccc"],
                      min: MIN,
                      max: MAX,
                    }),
                    borderRadius: "4px",
                  }}
                  className="cursor-pointer"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#548BF4",
                    borderRadius: "50%",
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => {
          const cartItem = normalizedCart.find(
            (item) => item.productId === product.id
          );
          const quantity = cartItem?.quantity || 0;
          return (
            <Link key={product.id} to="#">
              <ProductCard product={product} quantity={quantity} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
