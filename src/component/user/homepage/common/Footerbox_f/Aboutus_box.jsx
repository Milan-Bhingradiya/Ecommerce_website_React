import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Aboutus_box() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    if (isAdminRoute) {
        return null; // Don't render Navbar for admin route
    }
    return (
        // <div className='footerbox-maindiv'>
        //     <p className='footerbox-heading'>About Us</p>
        //     <p className='footerbox-text'>ABOUT US Who we are?</p>
        //     <p className='footerbox-text'>Management Team Careers</p>
        //     <p className='footerbox-text'>Franchise Enquiry</p>
        // </div>
        <div className="w-100">
                <footer style={{ backgroundColor: '#FDF5E8' }}>
                    <div className="p-4 container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 mb-4">
                                <h5 className="mb-3" style={{ letterSpacing: '2px', color: '#7f4722' }}>Useful Link</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-1">
                                        <a href="#!" style={{ color: '#4f4f4f' }}>Delivery Information</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="#!" style={{ color: '#4f4f4f' }}>International Shipping</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="#!" style={{ color: '#4f4f4f' }}>Payment Options</a>
                                    </li>
                                    <li>
                                        <a href="#!" style={{ color: '#4f4f4f' }}>Track your Order</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <h5 className="mb-3" style={{ letterSpacing: '2px', color: '#7f4722' }}>Contact Us</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-1">
                                    <i className='fa'>&#xf0e0;</i> <a style={{ color: '#4f4f4f' }}>Write to us</a>
                                    </li>
                                    <li className="mb-1">
                                    <i className='fa'>&#xf095;</i> <a style={{ color: '#4f4f4f' }}>+91 1234567890</a>
                                    </li>
                                    <li className="mb-1">
                                    <i className="fas fa-map-marker-alt"></i> <a style={{ color: '#4f4f4f' }}>4005, Silver business<br/>point, India</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                                <h5 className="mb-3" style={{ letterSpacing: '2px', color: '#7f4722' }}>Follow us On</h5>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-1">
                                        <a href="#!" style={{ color: '#4f4f4f' }}>facebook</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="#!" style={{ color: '#4f4f4f' }}>Instagram</a>
                                    </li>
                                    <li className="mb-1">
                                        <a href="#!" style={{ color: '#4f4f4f' }}>Twitter</a>
                                    </li>
                                </ul>
                            </div>
                          
                        </div>
                    </div>
                    <div className="text-center p-3" style={{ backgroundColor: '#83612F', color: 'white' }}>
                        &#169; 2023 Copyright: The Velvet Box Limited All Rights Reserved.
                    </div>

                </footer>

  </div>
    )
}
