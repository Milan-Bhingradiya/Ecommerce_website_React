import React from 'react'
import Navbar from '../../component/Navbar_f/Navbar'
import Navbar2 from '../../component/Navbar2_f/Navbar2'
import { useLocation } from 'react-router-dom';

function Navbar_container() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    if (isAdminRoute) {
        return null; // Don't render Navbar for admin route
    }

    //TODO: why need this component? cause hide navbar on /admin in url ... and uselocation only  inside <browerrouter>  means i can not hide navbars from app.jsx thats why i  hide navbar from here
    return (
        <>
            <Navbar />
            <Navbar2 />
        </>
    )
}

export default Navbar_container