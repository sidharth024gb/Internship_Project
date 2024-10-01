import React, { useContext, useEffect } from "react";
import $ from "jquery";
import "../styles/products.css";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Products() {
  const location = useLocation();
  const { Items } = location.state || {};
  const {addToCart}=useContext(AppContext)
  const Title = Items && Items.length > 0 ? Items[0].category : "No Category";

  useEffect(() => {
    $(window).scrollTop(0);
  },[Items]);

  let bg;

  switch (Title) {
    case "Fruits":
      bg = {
        backgroundColor: "#DA5B07",
      };
      break;
    case "Vegetables":
      bg = {
        backgroundColor: "#55883B",
      };
      break;
    case "Meat":
      bg = {
        backgroundColor: "#700E14",
      };
      break;
    case "Dairy":
      bg = {
        backgroundColor: "#061B7D",
      };
      break;
    case "Spices":
      bg = {
        backgroundColor: "#E82004",
      };
      break;
    case "Oils":
      bg = {
        backgroundColor: "#ECC111",
      };
      break;
    default:
      bg = {
        backgroundColor: "gray",
      };
      break;
  }

  return (
    <div className="itemsPage">
      {Items && (
        <div className="itemsContainer">
          <div className="itemTitle" style={bg}>
            <h1>{Title}</h1>
          </div>
          <div className="itemCardContainer">
            {Items.map((item) => {
              let quantity;

              if (
                item.category === "Oils" ||
                item.name === "Milk"
              ) {
                quantity = "L";
              } else {
                quantity = "Kg";
              }

              return (
                <Link
                  to="/cards"
                  state={{ cardDetails: item }}
                  className="homeCardLink"
                  key={item.id}
                >
                  <div className="itemCard">
                    {item.discount !== 0 && (
                      <p className="discount">{item.discount}% OFF</p>
                    )}
                    <img
                      src={item.image}
                      alt=""
                      className="itemImg"
                    />
                    <h4 className="itemName" style={bg}>
                      {item.name}
                    </h4>
                    <div className="itemContent">
                      <p>
                        Price: &#8377;
                        {item.price - item.price * (item.discount / 100)}{" "}
                        {item.discount !== 0 && (
                          <span className="orgPrice">&#8377;{item.price}</span>
                        )}
                      </p>
                      <p>Quantity: {item.weight}{quantity}</p>
                      <button
                        className="productATC"
                        onClick={(e) => addToCart(item, e)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
