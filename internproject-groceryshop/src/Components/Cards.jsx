import React,{useContext,useEffect} from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import "../styles/cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRankingStar,
  faClock,
  faTruck,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../Context/AppContext";


function Cards() {
  const location = useLocation();
  const { cardDetails } = location.state || {
    cardDetails: {
      name: "no data",
      image: "",
      description: "",
      price: 0,
      weight: 0,
    },
  };

  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    $(window).scrollTop(0);
  }, [cardDetails]);
  
  let quantity;

  if (cardDetails.category === "Oils" || cardDetails.name === "Milk") {
    quantity = "L";
  } else {
    quantity = "Kg";
  }

  return (
    <div className="CardsPage">
      <div className="cardDetails">
        <div className="cardImgHolder">
          <img src={cardDetails.image} alt="Product" className="cardImg" />
        </div>
        <div className="cardContent">
          <p className="cardName">{cardDetails.name}</p>
          <p className="cardpara">
            Description:- <br />
            <span className="desind">{cardDetails.description}</span>
          </p>
          {cardDetails.discount!==0 && (
            <p className="cardpara">
              Discount: <span>{cardDetails.discount}%</span>
            </p>
          )}
          <p>
            Price: &#8377;
            {cardDetails.price - cardDetails.price * (cardDetails.discount / 100)}{" "}
            {cardDetails.discount !==0? (
              <span className="orgPrice">&#8377;{cardDetails.price}</span>
            ):<></>}
          </p>
          <p className="cardpara">Quantity: {cardDetails.weight}{quantity}</p>
          <button
            className="cardATC"
            onClick={(e) => addToCart(cardDetails, e)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="speciality">
        <h3 className="specialhead">Why choose FreahMart?</h3>
        <div className="specialContainer">
          <div className="special">
            <FontAwesomeIcon icon={faRankingStar} className="cardicon" />
            <p className="specialtext">Quality</p>
            <p className="specialtextlight">You can trust</p>
          </div>
          <div className="special">
            <FontAwesomeIcon icon={faClock} className="cardicon" />
            <p className="specialtext">On Time</p>
            <p className="specialtextlight">Guarantee</p>
          </div>
          <div className="special">
            <FontAwesomeIcon icon={faTruck} className="cardicon" />
            <p className="specialtext">Free</p>
            <p className="specialtextlight">Delivery</p>
          </div>
          <div className="special">
            <FontAwesomeIcon icon={faRotateLeft} className="cardicon" />
            <p className="specialtext">Return Policy</p>
            <p className="specialtextlight">No Question asked</p>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Cards;
