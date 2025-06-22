import React from 'react';
import { FaLocationDot, FaBus, FaPhone } from 'react-icons/fa6'; // For Font Awesome 6 icons
import { FaMailBulk, FaMoneyBill } from 'react-icons/fa'; // For Font Awesome 5 icons
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel.jsx';
import './FindUs.css';

// Sample images for the carousel
import restaurantFood from '../../img/mojito.jpg';
import restaurantInterior from '../../img/Nacatamal.jpg';

const FindUs = () => {
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const today = new Date().getDay();

    const hours = [
        '08:00 - 22:00', // Sunday
        'CLOSED', // Monday
        '12:00 - 21:00', // Tuesday
        '12:00 - 21:00', // Wednesday
        '12:00 - 21:00', // Thursday
        '12:00 - 22:00', // Friday
        '08:00 - 22:00' // Saturday
    ];

    const carouselImages = [
        restaurantFood,
        restaurantInterior
    ];

    return (
        <div className="find-us-page">
            {/* Hero Section with Background Image */}
            <div className="hero-section">
                <button
                    className="back-to-home-button"
                    onClick={() => (window.location.href = '/')}
                >
                    Home
                </button>
                <div className="hero-overlay">
                    <h1>Find Us</h1>
                    <p>
                        Visit our restaurant for an unforgettable dining
                        experience
                    </p>
                </div>
            </div>
    
            {/* Main Content */}
            <main className="find-us-content">
                {/* Carousel Section */}
                <section className="carousel-section">
                    <Carousel images={carouselImages} interval={4000} />
                </section>
    
                {/* Info Grid - Opening Hours, Contact Info, Map */}
                <div className="info-grid">
                    {/* Opening Hours Card */}
                    <div className="info-card hours-card">
                        <h2>Opening Hours</h2>
                        <ul>
                            {days.map((day, index) => (
                                <li
                                    key={day}
                                    className={index === today ? 'highlight' : ''}
                                >
                                    <span className="day">{day}:</span>
                                    <span className="time">{hours[index]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
    
                    {/* Contact Info Card */}
                    <div className="info-card contact-card">
                        <h2>Contact Information</h2>
                        <div className="contact-item">
                            <FaLocationDot className="contact-icon" />
                            <span>Pater de Dekenstraat 70/A, 1040</span>
                        </div>
                        <div className="contact-item">
                            <FaBus className="contact-icon" />
                            <span>
                                Transportation Lines: M5, Tram 7,25 & Bus 36
                            </span>
                        </div>
                        <div className="contact-item">
                            <FaPhone className="contact-icon" />
                            <span>GSM: 498 60 00 48 </span>
                        </div>
                        <div className="contact-item">
                            <FaMailBulk className="contact-icon" />
                            <span>info@lagosyvolcanoes.com</span>
                        </div>
                        <div className="contact-item">
                            <FaMoneyBill className="contact-icon" />
                            <span>BTW nummer: BE1001839160</span>
                        </div>
                    </div>
    
                    {/* Map Section */}
                    <div className="map-card">
                        <iframe
                            title="Restaurant Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.8437377043597!2d4.399793976675319!3d50.83405827166797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c5cf60d42943%3A0xd541c1ef7be2820a!2sLagos%20y%20Volcanes!5e0!3m2!1snl!2sbe!4v1733355389553!5m2!1snl!2sbe"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
    
                {/* Social Media Icons - Moved outside the grid */}
                <div className="redes-icons">
                    <Link
                        to="https://www.facebook.com/profile.php?id=61550874188064"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="redes-icon"
                    >
                        <FaFacebookF />
                    </Link>
                    <Link
                        to="https://www.instagram.com/lagosyvolcanesbxl?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="redes-icon"
                    >
                        <FaInstagram />
                    </Link>
                    <Link
                        to="https://www.tiktok.com/@lagosyvolcanesbxl?is_from_webapp=1&sender_device=pc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="redes-icon"
                    >
                        <FaTiktok />
                    </Link>
                    <Link
                        to={`https://wa.me/32498600048?text=${encodeURIComponent('')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="redes-icon"
                    >
                        <FaWhatsapp />
                    </Link>
                </div>
            </main>
        </div>
    );
    
};

export default FindUs;
