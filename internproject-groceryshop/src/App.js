import "./App.css";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Aboutus from "./Components/Aboutus.jsx";
import Reachus from "./Components/Reachus.jsx";
import Terms from "./Components/Terms.jsx";
import Policy from "./Components/Policy.jsx";
import Products from "./Components/Products.jsx";
import Cards from "./Components/Cards";
import Cart from "./Components/Cart.jsx";
import React,{useState} from "react";
import LoginAndSignup from "./Components/LoginAndSignup.jsx";
import { AppProvider } from "./Context/AppContext.js";
import Checkout from "./Components/Checkout.jsx";
import Search from "./Components/Search.jsx";

function AppWrapper({
  showSearch,
  showNav,
  searchBarVisibility,
  navVisibility,
}) {
  const navigate = useNavigate();
  
  return (
    <AppProvider navigate={navigate}>
      <Header
        showSearch={showSearch}
        showNav={showNav}
        navVisibility={navVisibility}
        searchBarVisibility={searchBarVisibility} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/reachus" element={<Reachus />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LoginAndSignup />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </AppProvider>
  );
}

function App() {
  const [showSearch, setShowSearch] = useState();
  const [showNav, setShowNav] = useState();

  const searchBarVisibility = () => {
    setShowSearch(!showSearch);
  };

  const navVisibility = () => {
    setShowNav(!showNav);
  };
   
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshMart</title>
        <link rel="canonical" href="" />
        <meta name="description" content="Grocery Shop Website" />
      </Helmet>
      <BrowserRouter>
        <AppWrapper
          showSearch={showSearch}
          showNav={showNav}
          navVisibility={navVisibility}
          searchBarVisibility={searchBarVisibility}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
