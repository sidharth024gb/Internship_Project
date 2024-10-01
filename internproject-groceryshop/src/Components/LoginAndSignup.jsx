import React, { useState, useContext,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faLocationDot,
  faKey,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import "../styles/form.css";
import $ from "jquery";
import { AppContext } from "../Context/AppContext";

function LoginAndSignup() {
  const [form, setForm] = useState("Login");
  const {
    handleSubmit,
    setUserName,
    setEmail,
    setPhone,
    setAddress,
    setPassword,
    setConfirmPassword,
    setAge,
    setGender,
  } = useContext(AppContext);

  useEffect(() => {
    $(window).scrollTop(0);
  },[form])

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-head">
          <h1 className="form-title">{form}</h1>
        </div>

        <div className="form">
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-input-box">
              <FontAwesomeIcon icon={faUser} className="form-icon" />
              <input
                type="text"
                name="userName"
                id="userName"
                className="form-input"
                placeholder="Name"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          )}
          <div className="form-input-box">
            <FontAwesomeIcon icon={faEnvelope} className="form-icon" />
            <input
              type="email"
              name="e-mail"
              id="e-mail"
              className="form-input"
              placeholder="E-mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-input-box">
              <FontAwesomeIcon icon={faPhone} className="form-icon" />
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-input"
                placeholder="Phone Number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          )}
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-input-box">
              <FontAwesomeIcon icon={faCalendarCheck} className="form-icon" />
              <input
                type="number"
                name="age"
                id="age"
                className="form-input"
                  placeholder="Age"
                  min="18"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>
          )}
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-input-box">
              <FontAwesomeIcon icon={faVenusMars} className="form-icon" />
              <div className="radio">
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  className="form-radio"
                  value="Male"
                  onClick={() => {
                    setGender("Male");
                  }}
                />
                <label>Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="gender"
                  className="form-radio"
                  value="Female"
                  onClick={() => {
                    setGender("Female");
                  }}
                />
                <label>Female</label>
              </div>
            </div>
          )}
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-input-box">
              <FontAwesomeIcon icon={faLocationDot} className="form-icon" />
              <textarea
                name="address"
                id="address"
                placeholder="Address"
                className="form-input"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
          )}
          <div className="form-input-box">
            <FontAwesomeIcon icon={faKey} className="form-icon" />
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {form === "Login" ? (
            <></>
          ) : (
            <div className="form-input-box">
              <FontAwesomeIcon icon={faKey} className="form-icon" />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          )}
          <div className="form-submit">
            <button
              onClick={() => {
                handleSubmit(form);
              }}
            >
              Submit
            </button>
          </div>

          <div className="form-choice">
            <div
              className={form === "Login" ? "choice gray" : "choice"}
              onClick={() => setForm("Sign up")}
            >
              Sign up
            </div>
            <div
              className={form === "Login" ? "choice" : "choice gray"}
              onClick={() => setForm("Login")}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSignup;
