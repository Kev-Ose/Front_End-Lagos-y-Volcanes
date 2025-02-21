import { Link, useLocation } from "react-router-dom";
import './Home.css';
import granada from '../../img/granada.jpg'
import lyv from '../../img/LyV Image.png'
import { FaFacebook, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import SERVER_URL from '../../server.js';

const Homepage = () => {

    const location = useLocation();
    const url = `localhost:5173${location.pathname}`;
    const title = 'checkout this website!';


    return (
<div class="homepage">
    <div className="image">
      <img src={granada} alt="granada"/>
      <div className="lyv">
        <img src={lyv} alt="lyv"/>
      </div>
        <div className="container">
            <button className="oswald-uniquifier">
                <Link to='/menu'> View Menu </Link>
            </button>
            <button className="oswald-uniquifier">
                <Link to='/reservations'> Make a Reservation </Link>
            </button>
            <button className="oswald-uniquifier">
                <Link to='/findus'> Find Us </Link>
            </button>
        </div>
        <div className="social">
            <Link className="icons" to={'https://www.facebook.com/profile.php?id=61550874188064'} target="_blank" rel="noopener noreferrer">
                <FaFacebookF/>
            </Link>
            <Link className="icons" to={'https://www.instagram.com/lagosyvolcanesbe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='} target="_blank" rel="noopener noreferrer">
                <FaInstagram/>
            </Link>
            <Link className="icons" to={'https://www.tiktok.com/@lagosyvolcanesbxl?is_from_webapp=1&sender_device=pc'} target="_blank" rel="noopener noreferrer">
              <FaTiktok/>
            </Link>
            <Link className="icons">
            <WhatsappShareButton url={url} quote={title}>
                <FaWhatsapp size={44} round={true} />
            </WhatsappShareButton>
            </Link>
        </div>
    </div>
</div>
    );
}

Homepage.propTypes = {};

export default Homepage;