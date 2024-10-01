import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children, navigate }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [user, setUser] = useState();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState(localStorage.getItem("authToken") || "");
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userCart, setUserCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/get/products");
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (item, event) => {
    event.preventDefault();
    const isItemInCart = userCart.some((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      return alert("Item already Added to the cart");
    }

    if (authToken) {
      axios
        .post("http://localhost:8000/cart/add", {
          item,
          email,
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          if (res.data.success) {
            setUserCart((prevCart) => [...prevCart, item]);
            alert("Item added to the cart");
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("You must be logged in to add items to the cart.");
    }
  };

  const updateCart = (itemId, action) => {
    if (authToken) {
      axios
        .put("http://localhost:8000/cart/update", {
          email,
          itemId,
          action,
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const cartCheckout = () => {
    if (authToken) {
      axios
        .put("http://localhost:8000/cart/checkout", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message);
            setUserCart([]);
          } else {
            alert(res.data.message);
          }
        });
    }
  };

  const getCart = () => {
    if (authToken) {
      axios
        .post("http://localhost:8000/cart/get", {
          email,
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          if (res.data.success) {
            setUserCart(res.data.userCart);
          } else {
            console.log(res.data.messsage);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Login to view your cart");
    }
  };

  // console.log(userCart)

  useEffect(() => {
    getCart();
  });

  const handleSubmit = (form) => {
    if (form === "Login") {
      Login(email, password);
    }
    if (form === "Sign up") {
      if (password === confirmPassword) {
        Signup(userName, email, phone, address, password);
      } else {
        alert("Password and Confirm Password should match");
      }
    }
  };

  const Login = (email, password) => {
    axios
      .post("http://localhost:8000/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("authToken", res.data.token);
          setAuthToken(res.data.token);
          setShouldNavigate(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navToCart = () => {
    if (authToken) {
      navigate("/cart");
      // window.location.reload();
    } else {
      alert("Login to access the cart");
    }
  };

  const Signup = () => {
    const data = {
      userName,
      email,
      phone,
      age,
      gender,
      address,
      password,
      userCart,
    };
    axios
      .post("http://localhost:8000/signup", data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("authToken", res.data.token);
          setAuthToken(res.data.token);
          setShouldNavigate(true);
        }
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {
    if (authToken) {
      axios
        .post("http://localhost:8000/user/get", {
          header: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.userData);
            setUser(res.data.userData);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken("");
    setUserCart([]);
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    if (authToken && shouldNavigate) {
      navigate("/");
      setShouldNavigate(false);
    }
  }, [authToken, navigate, shouldNavigate]);

  // useEffect(() => {
  //   console.log("Cart after state update:", userCart);
  // }, [userCart]);

  return (
    <AppContext.Provider
      value={{
        Logout,
        Login,
        addToCart,
        Signup,
        handleSubmit,
        authToken,
        navToCart,
        setAddress,
        setUserName,
        setPhone,
        setEmail,
        setPassword,
        setConfirmPassword,
        getCart,
        userCart,
        updateCart,
        cartCheckout,
        products,
        query,
        setQuery,
        setAge,
        setGender,
        getUser,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
