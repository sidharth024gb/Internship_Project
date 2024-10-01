import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext.js";

function Home() {
  const { addToCart, products } = useContext(AppContext);
  const [maxDiscountItem, setMaxDiscountItem] = useState({});

  useEffect(() => {
    $(window).scrollTop(0);
  }, [products]);

  useEffect(() => {
    const findMaxDiscountItem = () => {
      let maxDiscountItemTemp = null;

      products &&
        Object.keys(products).map((category) => {
          if (category === "_id") return null;
          products &&
            products[category].map((item) => {
              if (
                !maxDiscountItemTemp ||
                item.discount > maxDiscountItemTemp.discount
              ) {
                maxDiscountItemTemp = item;
              }
            });
        });

      products && setMaxDiscountItem(maxDiscountItemTemp);
      console.log(maxDiscountItem);
    };

    findMaxDiscountItem();
  }, [products]);

  let discountQuantity;
  if (maxDiscountItem) {
    if (maxDiscountItem.category === "Oils" || maxDiscountItem.name === "Milk") {
      discountQuantity = "L";
    } else {
      discountQuantity = "Kg";
    }
  }
  return (
    <div className="homecontainer">
      <div className="ad">
        {maxDiscountItem && (
          <Link
            to="/cards"
            state={{ cardDetails: maxDiscountItem }}
            className="adContainer"
          >
            <div className="adContent">
              <h1 className="adDiscount">{maxDiscountItem.discount}%</h1>
              <h1 className="adTitle">Today's Ultimate Discount Deal!</h1>

              <p className="adDescription">
                {maxDiscountItem.description}{" "}
                <b>
                  {" "}
                  Just for &#8377;
                  {maxDiscountItem.price -
                    maxDiscountItem.price *
                      (maxDiscountItem.discount / 100)}{" "}
                  <span className="orgPrice">
                    &#8377;{maxDiscountItem.price}
                  </span>{" "}
                  per {discountQuantity}
                </b>
              </p>

              <button
                className="adATC"
                onClick={(e) => addToCart(maxDiscountItem, e)}
              >
                Add to Cart
              </button>
            </div>
            <span className="adimage">
              <img src={maxDiscountItem.image} alt="" />
            </span>
          </Link>
        )}
      </div>
      <div className="productsContainer">
        {/* {products &&
          products.map((productsdata, index) => (
            <div key={index}> */}
        {Object.keys(products).map((category) => (
          <>
            {category !== "_id" && (
              <Link
                to={{
                  pathname: "/products",
                }}
                state={{ Items: products[category] }}
                className="HomeCardLink"
                key={category}
              >
                <div className="cardContainer">
                  <h3 className="cardtitle">{category}: %FreshDeals</h3>

                  <div className="cardContainer2">
                    {products[category].map((item) => {
                      let quantity;

                     if (item.discount) {
                       quantity =
                         (category === "Oils" || item.name === "Milk")
                           ? "L"
                           : "Kg";
                     }


                      return item.discount ? (
                        <Link
                          to="/cards"
                          state={{ cardDetails: item }}
                          className="homeCardLink"
                          key={item._id}
                        >
                          <div className="card">
                            <p className="discount">{item.discount}% OFF</p>
                            <img src={item.image} alt="" className="cardimg" />
                            <h4>{item.name}</h4>
                            <div className="cardcontent">
                              <p>
                                Price: &#8377;
                                {item.price -
                                  item.price * (item.discount / 100)}{" "}
                                <span className="orgPrice">
                                  &#8377;{item.price}
                                </span>
                              </p>
                              <p>
                                Quantity: {item.weight}
                                {quantity}
                              </p>
                              <button
                                className="homeATC"
                                onClick={(e) => addToCart(item, e)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              </Link>
            )}
          </>
        ))}
        {/* </div>
          ))} */}
      </div>
    </div>
  );
}

export default Home;
