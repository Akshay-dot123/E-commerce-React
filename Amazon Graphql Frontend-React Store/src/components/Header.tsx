import { Link, NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

function Header() {
  const online = useOnlineStatus(); // custom hook
  const data = useContext(UserContext); // context
  const [totalQuantity,setTotalQuantity]=useState(0)
  // To access items non duplicate items
  const cartItems = useSelector((store) => store.cart.products);
  // console.log("cartItems=======>",cartItems);

  // To access total items
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => (total += item.quantity));
    setTotalQuantity(total)
    
  }, [cartItems]);
  return (
    <header className="w-full flex justify-between p-4 bg-slate-900 items-center text-white px-6">
      <Link to="/home">
        <img
          alt="logo"
          className="w-20 h-20 rounded-xl shadow-[6px_8px_0px_2px_rgba(255,_234,_0,_1)]"
        />
      </Link>

      {/* <Search /> */}

      <nav className="flex justify-between items-center gap-4">
        <span>Online Status:{online ? "✅" : "🔴"}</span>
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/about">
          <span>About Us</span>
        </Link>
        <Link to="/account">
          <span>Account</span>
        </Link>
        <Link to="/cart">
          <span className="relative">Cart-({totalQuantity} items)</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
