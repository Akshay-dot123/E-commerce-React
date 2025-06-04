import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { FIND_PRODUCT_BY_ID } from "../graphql/queries";
const useProduct = (id) => {
  const [productInfo, setProductInfo] = useState("null");
  const { data, loading, error } = useQuery(FIND_PRODUCT_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.findProductById) {
      setProductInfo(data.findProductById);
    }
  }, [data]);
  return productInfo;
};

export default useProduct;
