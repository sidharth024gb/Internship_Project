import React from "react";
import "../styles/aboutus.css";

function Policy() {
  return (
    <div className="aboutcontainer">
      
      <div className="aboutblock">
        
        <h1 className="abouthead">Privacy Policy</h1>{" "}
      </div>
      <div className="aboutblock">
        
        <h2 className="abouthead">Information Collection and Use</h2>{" "}
        <p className="aboutpara ind">
          
          We collect certain information when you use our website. This includes
          personal data such as your name, email address, and browsing behavior.
          We use this information to improve our services and provide a better
          user experience.
        </p>
      </div>
      <div className="aboutblock">
        
        <h2 className="abouthead">Cookies</h2>
        <p className="aboutpara ind">
          
          We use cookies to enhance your browsing experience. These small text
          files are stored on your device and help us analyze website traffic,
          personalize content, and remember your preferences.{" "}
        </p>
      </div>
      <div className="aboutblock">
        
        <h2 className="abouthead">Data Security</h2>{" "}
        <p className="aboutpara ind">
          
          We take data security seriously. Your information is stored securely,
          and we follow industry best practices to protect it from unauthorized
          access or disclosure.
        </p>
      </div>
      <div className="aboutblock">
        
        <h2 className="abouthead">Third-Party Services</h2>
        <p className="aboutpara ind">
          Our website may use third-party services (e.g., analytics tools,
          advertising networks). These services have their own privacy policies,
          and we encourage you to review them.
        </p>
      </div>
      <div className="aboutblock">
        
        <h2 className="abouthead">Changes to Privacy Policy</h2>{" "}
        <p className="aboutpara ind">
          
          We reserve the right to update our privacy policy. Any changes will be
          posted on this page. By continuing to use our website, you agree to
          the updated terms.
        </p>
      </div>
    </div>
  );
}

export default Policy;
