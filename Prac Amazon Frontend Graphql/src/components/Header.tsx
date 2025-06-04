import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext, useEffect, useState } from "react";
import { FIND_ALL_CART_PRODUCTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

function Header() {
  const online = useOnlineStatus();
  const [categorizedCart, setCategorizedCart] = useState(0);
  const { data } = useQuery(FIND_ALL_CART_PRODUCTS);
  useEffect(() => {
    if (data && data.findAllCartProduct) {
      const normalizedProducts = data.findAllCartProduct.map((item) => ({
        productId: item.product.id,
        quantity: 1,
      }));
      console.log("NormalizeProducts", normalizedProducts);
      //     const total = normalizedProducts.reduce((sum, item) => sum + item.quantity, 0);
      // console.log("Total Quantity:", total);
      const total = normalizedProducts.length;
      console.log("Total Quantity:", total);
      setCategorizedCart(total);
    }
  }, [data]);
  return (
    <header className="w-full flex justify-between p-4 bg-slate-900 items-center text-white px-6">
      <Link to="/home">
        <img
          alt="logo"
          className="w-20 h-20 rounded-xl shadow-[6px_8px_0px_2px_rgba(255,_234,_0,_1)]"
        />
      </Link>

      <nav className="flex justify-between items-center gap-4">
        <span>{online ? "Online : ✅" : "Offline : 🔴"}</span>
        <Link to="/products">
          <span>Home</span>
        </Link>
        <Link to="/account">
          <span>Account</span>
        </Link>
        <Link to="/payment">
          <span>Pay</span>
        </Link>
        <Link to="/cart">
          <span className="relative">Cart-({categorizedCart} items)</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
