
import { useState, useEffect } from "react";
import Header from "components/Headers/JobSeeker";
import Footer from "components/Footers/JobSeeker";
import Company from "./Company";
import Post from "./Post";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
const Post_Detail = () => {
    const [key, setKey] = useState('home');

    return (
        <>
            <Header />
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
                                                    <img src={require('../assets/template_ntv/img/icon/job-list3.png')} alt="" width="120" height="120" />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col xs="8">
                                            <h3 className=" mb-0" style={{ paddingBottom: "10px" }}>Danh sách thành phố Danh sách thành phố Danh sách thành phố</h3>
                                            <a href="" style={{ fontSize: "20px" }}>Tên công ty</a>
                                            <ul className="blog-info-link mt-3 mb-4">
                                                <li style={{ color: "gray" }}> <i class="fa-solid fa-location-dot"></i>   Hà Nội</li>
                                                <li style={{ color: "gray" }}> <i class="fa-regular fa-user"></i> Số lượng: 4</li>
                                                <li style={{ color: "gray" }}> <i class="fa-solid fa-dollar-sign"></i>400 USD</li>
                                                <li style={{ color: "gray" }}> Hình thức làm việc: Full-time</li>
                                            </ul>

                                        </Col>
                                        <Col xs="2">
                                            <button className="btn btn-success">Apply Now</button>
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
                        VIỆC LÀM KHÁC TỪ CÔNG TY
                    </Tab>
                </Tabs>
            </div>

            < Footer />
        </>
    );

}

export default Post_Detail;



