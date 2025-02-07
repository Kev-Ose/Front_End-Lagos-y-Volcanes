import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import FindUs from './pages/FindUs/FindUs';
import Menu from './pages/Menu/Menu';
import Reservation from './pages/Reservation/Reservation';

// import './App.css';

function App() {
    const Router = createBrowserRouter([
        {
            path:'/',
            element: <Layout />,
            //errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Home /> },
                { path: 'findus', element: <FindUs /> },
                { path: 'menu', element: <Menu /> },
                { path: 'reservation', element: <Reservation /> }
            ]
        }
    ]);

    return(
        <>
            <RouterProvider router={Router} />
        </>
    )
}



export default App;