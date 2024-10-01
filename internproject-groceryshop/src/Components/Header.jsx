import React, { useContext, useEffect,useState } from "react";
import "../styles/head.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
// import { products } from "../products";
import { AppContext } from "../Context/AppContext";

function Header({ showSearch, showNav, searchBarVisibility, navVisibility }) {
  const navigate = useNavigate();
  const {
    Logout,
    authToken,
    navToCart,
    userCart,
    products,
    setQuery,
    user,
    getUser,
  } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const profileVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (authToken) {
      getUser();
    }
  }, [authToken]);

  return (
    <div className="container">
      <div className="head_info">
        <h2 className="storeName">
          <a href="/" className="storeNameLink">
            <span id="first">Fresh</span>Mart
          </a>
        </h2>
        {showSearch && (
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search here"
            onChange={(e) => {
              navigate("/search");
              setQuery(e.target.value);
            }}
          />
        )}
        <div className="iconHolder">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="searchIcon"
            onClick={() => {
              searchBarVisibility();
            }}
          />
          <FontAwesomeIcon
            icon={faBars}
            className="searchIcon"
            onClick={() => {
              navVisibility();
            }}
          />
          <span
            className="headicon"
            title="Shopping Cart"
            onClick={() => {
              navToCart();
            }}
          >
            {userCart.length !== 0 ? (
              <span className="cartItemCount">{userCart.length}</span>
            ) : (
              <></>
            )}
            <FontAwesomeIcon icon={faCartShopping} className="profile-icon" />
          </span>
          {authToken ? (
            <div className="profile-container">
              <FontAwesomeIcon
                icon={faUser}
                className="profile-icon"
                onClick={() => {
                  profileVisibility();
                }}
              />
              {user && visible && (
                <div className="profile">
                  <div className="profile-content">
                    <span>
                      <b>Name:&nbsp;</b>
                      {user.userName}
                    </span>
                    <span>
                      <b>E-mail:&nbsp;</b>
                      {user.email}
                    </span>
                    <span>
                      <b>Phone:&nbsp;</b>
                      {user.phone}
                    </span>
                    <span>
                      <b>Age:&nbsp;</b>
                      {user.age}
                    </span>
                    <span>
                      <b>Gender:&nbsp;</b>
                      {user.gender}
                    </span>
                    <span>
                      <b>Address:&nbsp;</b>
                      {user.address}
                    </span>
                  </div>
                  <div
                    className="Login"
                    onClick={() => {
                      Logout();
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="Login">
              Login/Sign up
            </Link>
          )}
        </div>
      </div>

      {showNav&&(
        <div className="navHolder">
          <hr />
          <div className="nav">
            <a href="/" className="headLink">
              Home
            </a>
            <div className="headLink dropdown-menu">
              Category
              <div className="dropdown-content">
                <Link
                  to="/products"
                  state={{ Items: products.Fruits }}
                  className="dropdown-link"
                >
                  Fruits
                </Link>
                <Link
                  to="/products"
                  state={{ Items: products.Vegetables }}
                  className="dropdown-link"
                >
                  Vegetables
                </Link>
                <Link
                  to="/products"
                  state={{ Items: products.Meat }}
                  className="dropdown-link"
                >
                  Meat
                </Link>
                <Link
                  to="/products"
                  state={{ Items: products.Dairy }}
                  className="dropdown-link"
                >
                  Dairy
                </Link>
                <Link
                  to="/products"
                  state={{ Items: products.Spices }}
                  className="dropdown-link"
                >
                  Spices
                </Link>
                <Link
                  to="/products"
                  state={{ Items: products.Oils }}
                  className="dropdown-link"
                >
                  Oils
                </Link>
              </div>
            </div>
            <a href="/aboutus" className="headLink">
              About us
            </a>
            <a href="/reachus" className="headLink">
              Reach us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
