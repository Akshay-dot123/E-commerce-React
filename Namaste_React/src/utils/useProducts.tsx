import { useEffect, useState } from "react";
import axios from "axios";
const useProduct = (id) => {
  const [productInfo, setProductInfo] = useState("null");

  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    // console.log(res.data);
    setProductInfo(res.data);
  };
  return productInfo;
};

export default useProduct;