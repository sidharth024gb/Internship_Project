import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/search.css"

function Search() {
  const navigate = useNavigate();
  const { products, addToCart, query } = useContext(AppContext);

  if (query === "") {
    // window.history.back();
    navigate("/");
  }

  const searchData = () => {
    const filteredProducts = Object.keys(products).reduce((data, category) => {
      if (category !== "_id") {
        const filteredCategory = products[category].filter((product) => {
          return product.name.toLowerCase().includes(query.toLowerCase());
        });
        if (filteredCategory.length !== 0) {
          data[category] = filteredCategory;
        }
      }
      return data;
    }, {});

    return filteredProducts;
  };

  const filteredData = searchData();

  return (
    <div className="searchPage">
      <div className="searchContainer">
        <h1 className="searchTitle">Search Results</h1>
        <div className="searchContainer2">
          {Object.keys(filteredData).length !== 0 ? (
            Object.keys(filteredData).map((category) => {
              let bg;

              switch (category) {
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
              return filteredData[category].map((item, index) => {
                let quantity;

                if (item.category === "Oils" || item.name === "Milk") {
                  quantity = "L";
                } else {
                  quantity = "Kg";
                }
                
                return (
                  <Link
                    to="/cards"
                    state={{ cardDetails: item }}
                    className="searchCardLink"
                    key={index}
                  >
                    <div className="searchItemCard">
                      {item.discount !== 0 && (
                        <p className="discount">{item.discount}% OFF</p>
                      )}
                      <img src={item.image} alt="" className="searchItemImg" />
                      <h4 className="searchItemName" style={bg}>
                        {item.name}
                      </h4>
                      <div className="searchItemContent">
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
                )
              });
            })
          ) : (
            <div className="emptySearch">
              <h1>No Item Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
