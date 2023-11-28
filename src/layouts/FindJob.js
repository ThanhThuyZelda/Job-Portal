import Header from "components/Headers/JobSeeker.js"
import Footer from "components/Footers/JobSeeker.js"
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    Button, FormGroup,
    Form,
    Label, CardBody
} from "reactstrap";
import { useState, useEffect } from "react";

import Chatbot from "./Chatbot";
const JobSeeker = () => {



    return (
        <>

            <Header />
            <main>
                <div className="slider-area ">
                    <div className="single-slider background1 slider-height2 d-flex align-items-center" >
                        <div className="container">
                            {/* <div className="row">
                                <div className="col-xl-12"> */}
                            <div className="hero-cap text-center">
                                <Form>
                                    <Row >
                                        <Col xs="4">
                                            <input type="text" className="form-control"
                                                placeholder="Tìm kiếm"
                                            />
                                        </Col>
                                        <Col xs="2">
                                            <select name="select" id="select1" className="form-control">
                                                <option value="">Tất cả thành phố</option>
                                                <option value="">Location PK</option>
                                                <option value="">Location US</option>
                                                <option value="">Location UK</option>
                                            </select>
                                        </Col>
                                        <Col xs="2">
                                            <select name="select" id="select1" className="form-control">
                                                <option value="">Mức lương</option>
                                                <option value="">Location PK</option>
                                                <option value="">Location US</option>
                                                <option value="">Location UK</option>
                                            </select>
                                        </Col>
                                        <Col xs="3">
                                            <select name="select" id="select1" className="form-control">
                                                <option value="">Hình thức làm việc</option>
                                                <option value="">Location PK</option>
                                                <option value="">Location US</option>
                                                <option value="">Location UK</option>
                                            </select>
                                        </Col>
                                        <Col xs="1">
                                            <Button className="btn btn-danger">
                                                Tìm kiếm
                                            </Button>

                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                            {/* </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* ==================================================== */}
                <div className="container">

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-tittle text-center">

                                <h2>Việc làm tốt nhất</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row ">

                        <div class="col-xl-6">
                            <div class="single-job-items mb-30">
                                <div class="job-items" style={{ marginBottom: "10px" }}>
                                    <Row>
                                        <Col xs="3">
                                            <div class="company-img">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/"><img src={require('../assets/template_ntv/img/icon/job-list3.png')} alt="" /></a>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div class="job-tittle">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                    <h4 >
                                                        Trưởng Nhóm Kế Toán Thuế (Mảng Xây Dựng, Bất Động Sản)
                                                    </h4>
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="job-tittle">
                                    <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                        <h6 style={{ color: "red" }}>
                                            Trưởng Nhóm Kế Toán Thuế (Mảng Xây Dựng, Bất Động Sản)
                                        </h6>
                                    </a>
                                </div>
                                <div class="job-tittle">
                                    <ul>
                                        <li><i class="fas fa-map-marker-alt"></i>Athens, Greece</li>
                                        <li>$3500 - $4000</li>
                                    </ul>
                                </div>
                                <div class="items-link f-right">
                                    <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">Xem chi tiết</a>
                                </div>
                            </div>
                            {/* <!-- single-job-content --> */}

                        </div>
                        <div class="col-xl-6">
                            <div class="single-job-items mb-30">
                                <div class="job-items" style={{ marginBottom: "10px" }}>
                                    <Row>
                                        <Col xs="3">
                                            <div class="company-img">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/"><img src={require('../assets/template_ntv/img/icon/job-list3.png')} alt="" /></a>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div class="job-tittle">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                    <h4 >
                                                        Trưởng Nhóm Kế Toán Thuế (Mảng Xây Dựng, Bất Động Sản)
                                                    </h4>
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="job-tittle">
                                    <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                        <h6 style={{ color: "red" }}>
                                            Trưởng Nhóm Kế Toán Thuế (Mảng Xây Dựng, Bất Động Sản)
                                        </h6>
                                    </a>
                                </div>
                                <div class="job-tittle">
                                    <ul>
                                        <li><i class="fas fa-map-marker-alt"></i>Athens, Greece</li>
                                        <li>$3500 - $4000</li>
                                    </ul>
                                </div>
                                <div class="items-link f-right">
                                    <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">Xem chi tiết</a>
                                </div>
                            </div>
                            {/* <!-- single-job-content --> */}

                        </div>
                        <div class="col-xl-6">
                            <div class="single-job-items mb-30">
                                <div class="job-items" style={{ marginBottom: "10px" }}>
                                    <Row>
                                        <Col xs="3">
                                            <div class="company-img">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/"><img src={require('../assets/template_ntv/img/icon/job-list3.png')} alt="" /></a>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div class="job-tittle">
                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                    <h4 >
                                                        Trưởng Nhóm Kế Toán Thuế (Mảng Xây Dựng, Bất Động Sản)
                                                    </h4>
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div class="job-tittle">
                                    <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                        <h6 style={{ color: "red" }}>
                                            Trưởng Nhóm Kế Toán Thuế (Mảng Xây Dựng, Bất Động Sản)
                                        </h6>
                                    </a>
                                </div>
                                <div class="job-tittle">
                                    <ul>
                                        <li><i class="fas fa-map-marker-alt"></i>Athens, Greece</li>
                                        <li>$3500 - $4000</li>
                                    </ul>
                                </div>
                                <div class="items-link f-right">
                                    <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">Xem chi tiết</a>
                                </div>
                            </div>
                            {/* <!-- single-job-content --> */}

                        </div>
                    </div>
                </div>

                <Chatbot />
            </main >

            <Footer />
        </>


    )
}


export default JobSeeker;