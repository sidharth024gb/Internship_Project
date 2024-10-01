import React, { useContext, useEffect } from "react";
import $ from "jquery";
import "../styles/cart.css";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { userCart, updateCart, cartCheckout } = useContext(AppContext);

  useEffect(() => {
    $(window).scrollTop(0);
  }, []);

  let Total = 0;
  userCart.forEach((item) => {
    Total += (item.price - item.price * (item.discount / 100)) * item.weight;
  });

  return (
    <div className="CartPage">
      <div className="cartContainer">
        {userCart.length === 0 ? (
          <div className="cart-empty">Your Cart is Empty</div>
        ) : (
          userCart.map((item, index) => {
            let quantity;

            quantity =
              (item.category === "Oils" || item.name === "Milk") ? "L" : "Kg";

            return (
              <div key={index}>
                <div className="cartItem">
                  <div className="cartItemImg">
                    <img src={item.image} alt="aaa" className="cartImg" />
                  </div>
                  <div className="cartItemInfo">
                    <h4 className="ItemInfo">{item.name}</h4>
                    <p className="ItemInfo">
                      &#8377;
                      {item.price - item.price * (item.discount / 100)}{" "}
                      {item.discount !== 0 && (
                        <span className="orgPrice">&#8377;{item.price}</span>
                      )}{" "}
                      <br />
                      per {quantity}
                    </p>
                    {item.discount !== 0 && (
                      <p className="cartDiscount">{item.discount}% OFF</p>
                    )}
                    <p className="ItemInfo itemCount">
                      <button
                        onClick={() => {
                          updateCart(item.id, "decrease");
                        }}
                      >
                        -
                      </button>
                      {item.weight}
                      <button
                        onClick={() => {
                          updateCart(item.id, "increase");
                        }}
                      >
                        +
                      </button>
                    </p>
                    <p className="ItemInfo">
                      <button
                        className="removeButton"
                        onClick={() => {
                          updateCart(item.id, "remove");
                        }}
                      >
                        Remove
                      </button>
                    </p>
                    <p className="ItemInfo">
                      &#8377;
                      {(item.price - item.price * (item.discount / 100)) *
                        item.weight}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
      {userCart.length !== 0 ? (
        <div className="totalPriceContainer">
          <div className="cartTotal">
            <h3 className="totalPrice">Total: &#8377;{Total}</h3>
            <button
              onClick={() => {
                cartCheckout();
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cart;
