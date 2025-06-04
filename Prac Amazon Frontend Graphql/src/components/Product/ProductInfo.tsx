import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../Shimmer";
import useProduct from "../../utils/useProducts";
import UserContext from "../../utils/UserContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/cartSlice";

// New code might or may not work
const ProductInfo = () => {
  const { id } = useParams();
  const [detail,setDetail]=useState([])
  const [quantity,setQuantity]=useState(1)
  const productInfo = useProduct(id);
  const dispatch=useDispatch();
  if (productInfo == "null") {
        return <Shimmer />;
      }
  return (
    <>
        <div className="product-card min-w-full">
      <div className="w-2/4 m-auto">

          <h3>{productInfo.name}</h3>
          <p>{productInfo.description}</p>
          <p>${productInfo.price}</p>
          <img
            src={productInfo.link}
            alt={productInfo.name}
            width="200"
            height="180"
            />
            </div>
        </div>
    </>
  );
};

// const ProductInfo = () => {
//   const { id } = useParams();
//   // console.log(id);
//   const {loggedUser}=useContext(UserContext)
//   // console.log(loggedUser);

//   const productInfo = useProduct(id);
//   // console.log(productInfo);

//   if (productInfo == "null") {
//     return <Shimmer />;
//   }

//   return (
//     <>
//       <div className="product-list">
//         <div className="product-card">
//           <h3>{productInfo.name}</h3>
//           <p>{loggedUser}</p>
//           <p>{productInfo.description}</p>
//           <p>${productInfo.price}</p>
//           <img
//             src={productInfo.link}
//             alt={productInfo.name}
//             width="200"
//             height="180"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

export default ProductInfo;
