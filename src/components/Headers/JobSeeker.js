// Header.js

import React from 'react';
import { useState, useEffect } from 'react';


const Header = () => {

    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        setSticky(window.scrollY > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (

        <header className={`header ${isSticky ? 'sticky-bar stricky' : ''}`}>
            {/* Header Start */}
            <div className="header-area header-transparrent">
                {/* <div className="headder-top header-sticky "> */}
                <div className="headder-top header-sticky ">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-2">
                                {/* Logo */}
                                <div className="logo">
                                    <a href="#"><img src={require('../../assets/template_ntv/img/logo/logo.png')} alt="" /></a>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <div className="menu-wrapper">
                                    {/* Main-menu */}
                                    <div className="main-menu">
                                        <nav className="d-none d-lg-block">
                                            <ul id="navigation">
                                                <li><a href="/trang-chu">Trang chủ</a></li>
                                                <li><a href="/tim-viec-lam">Tìm việc làm </a></li>
                                                <li><a href="about.html">About</a></li>
                                                <li><a href="#">Page</a>
                                                    <ul className="submenu">
                                                        <li><a href="blog.html">Blog</a></li>
                                                        <li><a href="single-blog.html">Blog Details</a></li>
                                                        <li><a href="elements.html">Elements</a></li>
                                                        <li><a href="job_details.html">job Details</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="contact.html">Contact</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* Header-btn */}
                                    <div className="header-btn d-none f-right d-lg-block">
                                        <a href="#" className="btn head-btn1">Register</a>
                                        <a href="#" className="btn head-btn2">Login</a>
                                    </div>
                                </div>
                            </div>
                            {/* Mobile Menu */}
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
        </header>
    );
};

export default Header;
