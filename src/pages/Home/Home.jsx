import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import "./Home.css"; // Import your CSS file
import lyv from "../../img/LyV Image.png"; // Replace with the correct path to your lyv image

const Homepage = () => {
  const location = useLocation();
  const url = `localhost:5173${location.pathname}`; // Updated URL
  const title = "Check out this website!"; // Updated title

  return (
<section className="background-holder">
  <div className="homepage-section">
        <img src={lyv} alt="lyv"/>
    <div className="container">
      <button className="oswald-uniquifier">
        <Link to="/menu">View Menu</Link>
      </button>
      <button className="oswald-uniquifier">
        <Link to="/reservations">Make a Reservation</Link>
      </button>
      <button className="oswald-uniquifier">
        <Link to="/findus">Find Us</Link>
      </button>
    </div>
    <div className="social">
      <Link
        className="icons"
        to={"https://www.facebook.com/profile.php?id=61550874188064"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </Link>
      <Link
        className="icons"
        to={"https://www.instagram.com/lagosyvolcanesbe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </Link>
      <Link
        className="icons"
        to={"https://www.tiktok.com/@lagosyvolcanesbxl?is_from_webapp=1&sender_device=pc"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTiktok />
      </Link>
      <div className="icons">
        <WhatsappShareButton url={url} quote={title}>
          <FaWhatsapp size={44} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  </div>
</section>
  );
};

export default Homepage;