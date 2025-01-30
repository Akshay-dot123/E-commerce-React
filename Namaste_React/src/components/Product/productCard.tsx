import React, { useEffect, useState } from "react";
import { addItem, addToCart } from "../../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [cartItems, setCartItems] = useState(0);
  const doesItemsExists = useSelector((state: any) => state.cart.products);
  console.log(doesItemsExists);

  // Dispatch an action
  const dispatch = useDispatch();
  const handleItem=(product)=>{
    dispatch(addItem(product))
  }

  const handleCartItems = (product) => {
    const isProductInCart = doesItemsExists.some(
      (item: Product) => item.id === product.id
    );
    if (isProductInCart) {
      // setCartItems(cartItems + 1);
      setCartItems((prevCartItems) => prevCartItems + 1);
      console.log(
        `Product already in cart, added another. Total: ${cartItems + 1}`
      );
    } else {
      dispatch(addItem(product));
    }
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    );
  };
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`}>
        <img src={product.link} alt={product.name} width="200" height="180" />
      </Link>
      {/* <button onClick={() => handleCartItems(product)}>
        {cartItems === 0 ? 'Add To Cart' : `Added ${cartItems}`}
      </button> */}
      {/* {cartItems === 0 ? (
      <button onClick={()=>handleCartItems(product)}>Add To Cart</button>
    ) : (
      <button onClick={()=>handleCartItems(product)}>Added {cartItems}</button>
    )} */}
      {/* <button className='p-2 bg-white shadow-xl' onClick={()=>handleItem(product)}>Add To Cart</button> */}

      {/* New code */}
      <button onClick={handleAddToCart}>Add To Cart</button>
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
