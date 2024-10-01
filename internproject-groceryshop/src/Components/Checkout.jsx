import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/checkout.css"

function Checkout() {
    return (
      <div className="checkoutPage">
        <div className="checkoutContainer">
          <div className="tick">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div className="thanks">
            <h2>Payment Done</h2>
            <p>Thank you for completing your secure online payment</p>
            <h4>Have a great day!</h4>
            <a href="/">Continue Shopping</a>
          </div>
        </div>
      </div>
    );
}

export default Checkout
