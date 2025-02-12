import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard,{withLabel} from "./Product/productCard";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  link: string;
  itemCount?: number;
}

function Body() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState<Product[]>([]);
  const {setName,loggedUser}=useContext(UserContext);
  const ProductPromoted=withLabel(ProductCard);
   const doesItemsExists = useSelector((state: any) => state.cart.products);
  console.log("doesItemsExists========",doesItemsExists);
  // console.log("comp rerender");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      // const response = await axios.get(
      //   "https://www.swiggy.com/mapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&collection=80424&tags=layout_CCS_Dosa&sortBy=&filters=&type=rcv2&offset=0&carousel=true&third_party_vendor=1"
      // );
      // console.log(response?.data?.data?.cards);
      // setProducts(response?.data?.data?.cards);
      // setFilteredProducts(response?.data?.data?.cards)
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };
 
  // Note:- If no dependency array, it is called on every render.
  // If empty Array, it is called only once
  useEffect(() => {
    fetchData();
  }, []);
  const online = useOnlineStatus();  
  if (online == false) return <h1>Please check Network Connection !!!</h1>;
  if (products.length === 0) {
    // return <h1>Loading.....</h1>;
    return <Shimmer />;
  }
  const handlePriceFilter = () => {
    const filtered = products.filter((product) => product.price > 400);
    setFilteredProducts(filtered); // Update filtered products state
  };
  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <div className="m-4 p-4">
        <input
          type="text"
          className="border-2 border-black rounded-lg"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className="p-2 m-2 bg-green-400 rounded-2xl" onClick={handleSearch}>Search</button>
      <button className="ml-10 border-2 px-4 py-1 border-black rounded-md bg-slate-200" onClick={handlePriceFilter}>
        Price
      </button>
      <label className="mx-4">UserName</label>
      <input type="text" value={loggedUser} onChange={(e)=>setName(e.target.value)} className="border border-black"/>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => {
          // console.log(product);
          return (
            <>
            <Link>
              {product.promoted?<ProductPromoted product={product} />:<ProductCard key={product.id} product={product} />}
              </Link>
              {/* user clicks on the ProductCard, they will be navigated to the to path specified in the Link */}
              {/* <Link to={`/products/${product.id}`}> */}
              {/* <Link>
              {product.promoted?<ProductPromoted product={product} />:<ProductCard key={product.id} product={product} />}
              </Link> */}
              {/* </Link> */}
            </>
          );
        })}
      </div>
    </>
  );
}

export default Body;
