import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Analytics } from "@vercel/analytics/next"

// import PropTypes from 'prop-types'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Analytics />
        </>
    );
};

Layout.propTypes = {};

export default Layout;