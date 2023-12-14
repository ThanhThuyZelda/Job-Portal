// Header.js

import React from 'react';
import { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Nav,
    Media,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const HeaderLogin = () => {

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
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/trang-chu");
        toast.success("Đăng xuất thành công");
    }

    axios.defaults.withCredentials = true;
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    useEffect(() => {
        axios.get('http://localhost:8080/nguoi-tim-viec/home/session')
            .then(res => {
                console.log(res);
                if (res.data.loggedIn) {
                    setName(res.data.jobseeker.fullname);
                    setImg(res.data.jobseeker.img);
                }
                // else {
                //     // navigate('/employer/dang-nhap');
                // }
            })
            .catch(err => console.log(err))
    }, [])

    const handleInfor = () => {
        navigate("/nguoi-tim-viec/thong-tin-ca-nhan/");
    }

    const handleHistory = () => {
        navigate("/nguoi-tim-viec/lich-su-ung-tuyen/")
    }


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
                                                <li><a href="/ds-cong-ty">Danh sách các công ty</a></li>
                                                {/* <li><a href="contact.html">Contact</a></li> */}
                                                {/* <li><a href="/employer/dang-nhap">Nhà tuyển dụng</a></li> */}
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* Header-btn */}
                                    <div className="header-btn d-none f-right d-lg-block">
                                        <a href="/nguoi-tim-viec/dang-nhap"
                                            onClick={() => handleLogout()}
                                            className="btn btn-outline-danger">Đăng xuất</a>
                                    </div>
                                    <Nav className="align-items-center d-none d-md-flex" navbar>
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle className="pr-0" nav>
                                                <Media className="align-items-center">
                                                    <span className="avatar avatar-sm rounded-circle">

                                                        {img !== "user.png" && img !== null ?
                                                            < img
                                                                src={`http://localhost:8080/uploads/${img}`}
                                                            />
                                                            :
                                                            <img cl

                                                                src={`https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`}
                                                            />
                                                        }
                                                    </span>
                                                    <Media className="ml-2 d-none d-lg-block">
                                                        <span className="mb-3 text-sm font-weight-bold">
                                                            {name}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </DropdownToggle>
                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                <DropdownItem className="noti-title" header tag="div">
                                                    <h6 className="text-overflow m-0">Welcome! {name}</h6>
                                                </DropdownItem>

                                                <DropdownItem
                                                // onClick={() => handleLogout()}
                                                >


                                                    <i class="fa-solid fa-gear"></i>
                                                    <span onClick={() => handleInfor()}>Quản lý thông tin cá nhân</span>
                                                </DropdownItem>

                                                <DropdownItem
                                                // onClick={() => handleLogout()}
                                                >


                                                    <i class="fa-solid fa-bars"></i>
                                                    <span onClick={() => handleHistory()}>Xem lịch sử ứng tuyển</span>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
        </header>
    );
};

export default HeaderLogin;
