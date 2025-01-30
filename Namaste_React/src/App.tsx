import Body from "./components/Body";
import Header from "./components/Header";
import About from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductInfo from "./components/Product/ProductInfo";
import Shimmer from "./components/Shimmer";
// Lazy Loading
import { lazy, Suspense, useEffect, useState } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import Cart from './components/Cart'
import appStore from "./utils/appStore";
const Grocery = lazy(() => import("./components/Grocery"));
function Main() {
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const data = {
      name: "Akshay",
    };
    setName(data.name);
  }, []);
  return (
    <>
    {/* Below is redux store */}
      <Provider store={appStore}>  
        {/* Below is context */}
        <UserContext.Provider value={{ setName, loggedUser: name }}>
          <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route
              path="/grocery"
              element={
                <Suspense fallback={<Shimmer />}>
                  <Grocery />
                </Suspense>
              }
            />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/products/:id" element={<ProductInfo />} />
            <Route path="/about" element={<About />} />
            <Route path="*">Page Not Found</Route>
          </Routes>
        </UserContext.Provider>
      </Provider>
    </>
  );
}

// Main render function, wrapping the routes with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
