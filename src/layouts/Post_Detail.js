import { useState, useEffect } from "react";
import Header from "components/Headers/JobSeeker";
import HeaderLogin from "components/Headers/JobSeekerLogined.js";
import Footer from "components/Footers/JobSeeker";
import Company from "./Company";
import Post from "./Post";
import Chatbot from "./Chatbot";
import OtherPost from "./OtherPost";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { ToastContainer, toast } from 'react-toastify';
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    Button, Form
} from "reactstrap";
import { useLocation } from "react-router-dom";
import Apply from "layouts/Apply";


const Post_Detail = (props) => {
    const [key, setKey] = useState('home');

    const location = useLocation()
    const [isShowModalApply, setIsShowModalApply] = useState(false);
    const [dataApply, setDataApply] = useState({});

    // Kiem tra Header
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setLoggedIn(!!token); // Nếu có token, đánh dấu là đã đăng nhập
    }, []);

    // Ung tuyen

    const handleClose = () => {
        setIsShowModalApply(false);
    }

    const handleApply = (post) => {
        if (loggedIn) {
            setIsShowModalApply(true);
            setDataApply(post);
        }
        else {
            toast.error('Bạn cần đăng nhập mới được nộp CV !!!');
        }

    }



    return (
        <>
            {loggedIn ? (
                <>
                    <HeaderLogin />
                </>
            ) : (
                <Header />
            )
            }

            <div className="slider-area ">
                <div className="single-slider background2 slider-height2 d-flex align-items-center" >
                    <div className="container">
                        {/* <div className="row">
                                <div className="col-xl-12"> */}
                        <div className="hero-cap text-center">

                        </div>
                        {/* </div>
                            </div> */}
                    </div>
                </div>
            </div>
            <div className="container">
                < Container className="mt--7" fluid style={{ marginBottom: '50px' }}>
                    {/* Dark table */}
                    <Row className="mt-4">
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent border-0">
                                    <Row>
                                        <Col xs="2">
                                            <div class="company-img">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                    <img
                                                        src={location.state.Company.logo !== "user.png" && location.state.Company.logo !== null
                                                            ? `http://localhost:8080/uploads/${location.state.Company.logo}`
                                                            : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                        }
                                                        width="120px"
                                                        height="120px"
                                                        alt="" />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col xs="8">
                                            <h3 className=" mb-0" style={{ paddingBottom: "10px" }}>{location.state.headline}</h3>

                                            <a href="" style={{ fontSize: "20px" }}>{location.state.Company.name}</a>
                                            <ul className="blog-info-link mt-3 mb-4">
                                                <li style={{ color: "gray" }}> <i class="fa-solid fa-location-dot"></i>   {location.state.City.name}</li>
                                                <li style={{ color: "gray" }}> <i class="fa-regular fa-user"></i>{location.state.quantity}</li>
                                                <li style={{ color: "gray" }}> <i class="fa-solid fa-dollar-sign"></i>{location.state.salary}</li>
                                            </ul>

                                        </Col>
                                        <Col xs="2">
                                            <button className="btn btn-success"
                                                onClick={() => handleApply(location.state)}
                                            >Ứng tuyển ngay</button>
                                        </Col>
                                    </Row>
                                    <br></br>

                                </CardHeader>

                            </Card>
                        </div>
                    </Row>
                </Container >
            </div>
            <div className="container" >
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"

                >
                    <Tab eventKey="home" title={<span style={{ color: 'purple', fontWeight: 'bold' }}>CHI TIẾT BÀI TUYỂN DỤNG</span>}>
                        <Post />
                    </Tab>
                    <Tab eventKey="profile" title={<span style={{ color: 'purple', fontWeight: 'bold' }}>THÔNG TIN CÔNG TY</span>}>
                        <Company />
                    </Tab>
                    <Tab eventKey="contact" title={<span style={{ color: 'purple', fontWeight: 'bold' }}> VIỆC LÀM KHÁC TỪ CÔNG TY</span>}>
                        <OtherPost />
                    </Tab>
                </Tabs>
            </div>

            <Chatbot />
            < Footer />
            <Apply
                show={isShowModalApply}
                handleClose={handleClose}
                dataApply={dataApply}
            />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );

}

export default Post_Detail;



