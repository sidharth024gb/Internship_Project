import React,{useContext} from "react";
import "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHouse,
  faCartShopping,
  faArrowRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../Context/AppContext";

function Footer() {
  const { navToCart } = useContext(AppContext);
  return (
    <div>
      <div className="footContainer">
        <div>
          <h2>
            <span id="first">Fresh</span>Mart
          </h2>
          <div className="footicon">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="footBlock">
          <h3>Shop</h3>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faHouse} className="texticon" />
            <a href="/" className="footLink">
              Home
            </a>
          </div>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faCartShopping} className="texticon" />
            <p
              className="footLink"
              style={{ margin: "0px" }}
              onClick={() => {
                navToCart();
              }}
            >
              Shopping Cart
            </p>
          </div>
        </div>
        <div className="footBlock">
          <h3>Know us</h3>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faArrowRight} className="texticon" />
            <a href="/aboutus" className="footLink">
              About us
            </a>
          </div>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faArrowRight} className="texticon" />
            <a href="/reachus" className="footLink">
              Reach us
            </a>
          </div>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faArrowRight} className="texticon" />
            <a href="/terms" className="footLink">
              Terms & Conditions
            </a>
          </div>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faArrowRight} className="texticon" />
            <a href="/policy" className="footLink">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="footBlock">
          <h3>Contact Info</h3>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faPhone} className="texticon" /> 9876556743
          </div>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faPhone} className="texticon" /> 9467983234
          </div>
          <div className="footlink-container">
            <FontAwesomeIcon icon={faEnvelope} className="texticon" />
            <a href="mailto:freshmart@gmail.com" className="footLink">
              freshmart@gmail.com
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="footContainer">
        <p>
          Created by G Sidharth || MERN Stack Application Created For My Intership 
        </p>
      </div>
    </div>
  );
}

export default Footer;
