import './FindUs.css';
import ojoDeAguaDesktop from '../../img/ojoDeAguaDesktop.jpg';
import foto1 from '../../img/LyV Image.png';
import foto2 from '../../img/Nacatamal.jpg';
import foto3 from '../../img/Opening.jpg';
import foto4 from '../../img/combonavi.jpg';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Homepage from '../Home/Home';
import Carousel from "../../components/Carousel/Carousel.jsx";


import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,

} from 'react-share';
import { FaBus, FaHourglass, FaLocationArrow, FaLocationDot, FaMoneyBill, FaPhone, FaPhoneFlip, FaTimeline } from 'react-icons/fa6';
import { FaCalendarTimes, FaMailBulk, FaTimes, FaTimesCircle } from 'react-icons/fa';

const FindUs = () => {

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the current day number (0 for Sunday, 6 for Saturday)
  const today = new Date().getDay();

  // Hours of operation for each day
  const hours = [
    '08:00 - 22:00', // Sunday
    'CLOSED', // Monday
    '12:00 - 21:00', // Tuesday
    '12:00 - 21:00', // Wednesday
    '12:00 - 21:00', // Thursday
    '12:00 - 22:00', // Friday
    '08:00 - 22:00', // Saturday
  ];

  const images = [foto2, foto3, foto4];

  return (
        <div className="findus">
            <div className="findgen">
              <img src={ojoDeAguaDesktop} alt="ojoDeAgua" />
              <div className="foto1">
                <NavLink to='/'>
                  <img src={foto1} alt="foto1" />
                </NavLink>
              </div>
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.8437377043597!2d4.399793976675319!3d50.83405827166797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c5cf60d42943%3A0xd541c1ef7be2820a!2sLagos%20y%20Volcanes!5e0!3m2!1snl!2sbe!4v1733355389553!5m2!1snl!2sbe" 
                  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <div className="carrito">
                <Carousel images={images} interval={4000} />
              </div>
              <div className="contact-info-container">
              <div className="contact-details">
                <h1 className="oswald-uniquifier">Opening Hours</h1>
                <ul className="oswald-uniquifier">
                  {days.map((day, index) => (
                    <li
                      key={day}
                      className={index === today ? 'highlight' : ''} // Highlight the current day
                    >
                      {day}: {hours[index]}
                    </li>
                  ))}
                </ul>
                <a href="https://maps.app.goo.gl/CFx6hZNRajKwq3e5A" target="_blank" rel="noopener noreferrer">
                      <h4 className="oswald-uniquifier"> <FaLocationDot/>  Pater de Dekenstraat 70/A, 1040</h4></a>
                      <h4 className="oswald-uniquifier"> <FaBus/>  Transporation Lines: M5, Tram 7,25 & Bus 36</h4>
                      <h4 className="oswald-uniquifier"> <FaPhone></FaPhone>  GSM: 0495 52 94 94</h4>
                      <h4 className="oswald-uniquifier">  <FaMailBulk></FaMailBulk>    info@lagosyvolcanoes.com</h4>
                      <h4 className="oswald-uniquifier">  <FaMoneyBill></FaMoneyBill>    BTW nummer: BE1001839160</h4>
                  </div>
                </div>
            </div>
        </div>
    );
}

FindUs.propTypes = {};

export default FindUs;