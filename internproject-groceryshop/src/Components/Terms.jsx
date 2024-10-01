import React from "react";
import "../styles/aboutus.css";

function Terms() {
  return (
    <div className="aboutcontainer">
      <div className="aboutblock">
        <h1 className="abouthead">Terms and Conditions</h1>
      </div>

      <div className="aboutblock">
        <h2 className="abouthead">Acceptance of Terms</h2>
        <p className="aboutpara">
          By accessing and using this website, you agree to comply with these
          terms and conditions. If you do not agree, please refrain from using
          the site.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Intellectual Property</h2>
        <p className="aboutpara ind">
          All content on this website, including text, images, logos, and
          trademarks, is protected by intellectual property laws. You may not
          reproduce, distribute, or modify any content without permission.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">User Conduct</h2>
        <p className="aboutpara ind">
          You must not engage in any unlawful or harmful activities on this
          website. Respect other users and refrain from offensive, abusive, or
          harmful behavior. Do not attempt to hack, disrupt, or interfere with
          the site’s functionality.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Privacy Policy</h2>
        <p className="aboutpara">
          Refer to our separate <a href="/policy">Privacy Policy</a> for details on how
          we collect, use, and protect your personal information.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Disclaimer</h2>
        <p className="aboutpara ind">
          We provide information on this website for general purposes only. It
          does not constitute professional advice. We do not guarantee the
          accuracy, completeness, or reliability of the content.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Limitation of Liability</h2>
        <p className="aboutpara ind">
          We are not liable for any direct, indirect, incidental, consequential,
          or punitive damages arising from your use of this website. This
          includes, but is not limited to, loss of data, profits, or business
          interruption. We recommend that you regularly back up your data and
          exercise caution while using our services.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Links to Third-Party Websites</h2>
        <p className="aboutpara ind">
          Our website may contain links to external sites. We do not endorse or
          control the content on these third-party websites. Use them at your
          own risk, and review their terms and privacy policies.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Modifications to Terms</h2>
        <p className="aboutpara ind">
          We reserve the right to update or modify these terms and conditions
          without prior notice. Any changes will be effective immediately upon
          posting on the website.
        </p>
      </div>
      <div className="aboutblock">
        <h2 className="abouthead">Governing Law</h2>
        <p className="aboutpara">
          These terms are governed by the laws of the state of India. Any
          disputes shall be resolved in the appropriate courts within this
          jurisdiction.
        </p>
      </div>
    </div>
  );
}

export default Terms;
