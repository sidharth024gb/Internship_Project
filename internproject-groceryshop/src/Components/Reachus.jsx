import React from "react";
import "../styles/reachus.css";

function Reachus() {
  return (
    <div className="reachus">
      <div className="reachContent">
        <h1 className="reachhead">Reach Us</h1>
      </div>
      <div className="reachContent">
        <h2 className="reachhead">We Value Your Feedback</h2>
        <p className="reachpara">
          We are committed to providing the best service possible and welcome
          your feedback. If you have any complaints, please let us know so we
          can address them promptly and efficiently.
        </p>
      </div>
      <div className="reachContent">
        <h2 className="reachhead">Send Us Your Complaint</h2>
        <p className="reachpara">
          If you have encountered any issues or have concerns that you would
          like to bring to our attention, please fill out the form below. Our
          team is dedicated to resolving your complaints as quickly as
          possible.t
        </p>
      </div>
      <div className="complaintBox">
        <textarea name="" id="complaint" className="complaint" />
        <button
          className="reachsend"
          onClick={() => {
            document.getElementById("complaint").value = "";
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Reachus;
