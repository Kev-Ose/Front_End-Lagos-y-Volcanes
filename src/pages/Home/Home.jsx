import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import './Home.css'; // Import your CSS file
import granada from '../../img/granada.jpg'; // Hero background image
import logo from '../../img/LyV Image.png'; // Restaurant logo
import calzada from '../../img/calzadaGranada.jpg';

const Homepage = () => {
    const location = useLocation();
    const url = `localhost:5173${location.pathname}`;

    return (
        <section className="homepage-section">
            <div className="background-holder" />
            <div className="homepage-components">
                <img
                    src={logo}
                    alt="Restaurant Logo"
                    className="restaurant-logo"
                />

                <div className="cta-buttons">
                    <a href="/menu" className="cta-button">
                        View Menu
                    </a>
                    <a href="/reservations" className="cta-button">
                        Make a Reservation
                    </a>
                    <a href="/findus" className="cta-button">
                        Find us
                    </a>
                </div>

                <div className="social-icons">
                    <Link
                        to="https://www.facebook.com/profile.php?id=61550874188064"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaFacebookF />
                    </Link>
                    <Link
                        to="https://www.instagram.com/lagosyvolcanesbxl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaInstagram />
                    </Link>
                    <Link
                        to="https://www.tiktok.com/@lagosyvolcanesbxl?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaTiktok />
                    </Link>
                    <Link
                        to={`https://wa.me/32498600048?text=${encodeURIComponent('')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaWhatsapp />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Homepage;
