import Header from "components/Headers/JobSeekerLogined.js"
import Footer from "components/Footers/JobSeeker.js"
import React, { useEffect, useRef } from 'react';
import {
    fetchCVInfor, fetchCVObj, fetchCVEdu, deleteCVEdu,
    fetchCVSkill, deleteCVSkill,
    fetchCVExp, deleteCVExp,
    printCVPDF, exportCVPDF

} from '../services/Homepage/PostService.js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import ModalUpdateCVInfo from "./ModalUpdateCVInfo.js";
import ModalUpdateCVObj from "./ModalUpdateCVObj.js";
import ModalCreateCVEdu from "./ModalCreateCVEdu.js";
import ModalUpdateCVEdu from "./ModalUpdateCVEdu.js";
import ModalCreateCVSkill from "./ModalCreateCVSkill.js";
import ModalUpdateCVSkill from "./ModalUpdateCVSkill.js";
import ModalCreateCVExp from "./ModalCreateCVExp.js";
import ModalUpdateCVExp from "./ModalUpdateCVExp.js";
import { useReactToPrint } from "react-to-print";
import ExportPDF from "./ExportPDF.js";

const InforJobSeeker = () => {

    const [fullNameSession, setFullNameSession] = useState();
    const [emailSession, setEmailSession] = useState();
    const [imgSession, setImgSession] = useState();
    const [fullnameInfor, setFullnameInfor] = useState();
    const [imgInfor, setImgInfor] = useState();
    const [emailInfor, setEmailInfor] = useState();
    const [position, setPosition] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [link, setLink] = useState();
    const [address, setAdress] = useState();
    const [birthday, setBirthday] = useState();

    const [obj, setObj] = useState();

    const [listEdu, setListEdu] = useState([]);
    const [showModalCreateCVEdu, setShowModalCreateCVEdu] = useState(false);
    const [dataEdu, setDataEdu] = useState({});
    const [showModalEditCVEdu, setShowModalEditCVEdu] = useState(false);

    const [listSkill, setListSkill] = useState([]);
    const [showModalCreateCVSkill, setShowModalCreateCVSkill] = useState(false);
    const [dataSkill, setDataSkill] = useState({});
    const [showModalEditCVSkill, setShowModalEditCVSkill] = useState(false);

    const [listExp, setListExp] = useState([]);
    const [showModalCreateCVExp, setShowModalCreateCVExp] = useState(false);
    const [dataExp, setDataExp] = useState({});
    const [showModalEditCVExp, setShowModalEditCVExp] = useState(false);

    const [showModalCVInfor, setShowModalCVInfor] = useState(false);
    const [showModalCVObj, setShowModalCVObj] = useState(false);

    const handleClose = () => {
        setShowModalCVInfor(false);
        setShowModalCVObj(false);
        setShowModalCreateCVEdu(false);
        setShowModalEditCVEdu(false);
        setShowModalCreateCVSkill(false);
        setShowModalEditCVSkill(false);
        setShowModalCreateCVExp(false);
        setShowModalEditCVExp(false);
    }
    const handleUpdateInfoCV = () => {
        setShowModalCVInfor(true);

    }
    const handleUpdateCVObj = () => {
        setShowModalCVObj(true);
    }

    const navigate = useNavigate();
    //Lay id nguoi tim viec
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/nguoi-tim-viec/home/session')
            .then(res => {

                if (res.data.loggedIn) {
                    setFullNameSession(res.data.jobseeker.fullname);
                    setEmailSession(res.data.jobseeker.email);
                    setImgSession(res.data.jobseeker.img);
                }
                else {
                    toast.error("Phiên làm việc đã hết hạn. Bạn cần đăng nhập lại!!!");
                    navigate('/nguoi-tim-viec/dang-nhap');
                }
            })
            .catch(err => console.log(err))
    }, [])

    //Thong tin ca nhan
    const fetchInfor = async () => {
        let res = await fetchCVInfor();
        // console.log('Infor', res);
        if (res && res.data) {
            // setInfor(res.data);
            setFullnameInfor(res.data.fullname);
            setImgInfor(res.data.img);
            setEmailInfor(res.data.email);
            setPosition(res.data.position);
            setGender(res.data.gender);
            setPhone(res.data.phone);
            setLink(res.data.link);
            setAdress(res.data.address);
            setBirthday(res.data.birthday);
        }
    }
    // Muc tieu nghe nghiep
    const fetchObj = async () => {
        let res = await fetchCVObj();
        // console.log('check', res);
        if (res) {
            setObj(res.data.obj);
        }
    }
    //Hoc van
    const fetchEdu = async () => {
        let res = await fetchCVEdu();
        // console.log(res)
        if (res && res.data) {
            setListEdu(res.data)
        }
    }
    const handleDeleteCVEdu = async (edu) => {
        let res = await deleteCVEdu(edu.id);
        if (res) {
            toast.success("Xóa học vấn thành công!");
        }
        else {
            toast.error("Có lỗi xảy ra");
        }
        // console.log(edu);
    }
    const handleCreateCVEdu = async () => {
        setShowModalCreateCVEdu(true);
    }
    const handleUpdateCVEdu = async (edu) => {
        setDataEdu(edu);
        setShowModalEditCVEdu(true);
    }
    //Ky nang
    const fetchSkill = async () => {
        let res = await fetchCVSkill();
        // console.log(res)
        if (res && res.data) {
            setListSkill(res.data)
        }
    }

    const handleDeleteCVSkill = async (skill) => {
        let res = await deleteCVSkill(skill.id);
        if (res) {
            toast.success("Xóa kỹ năng thành công!");
        }
        else {
            toast.error("Có lỗi xảy ra");
        }
        // console.log(edu);
    }

    const handleCreateCVSkill = async () => {
        setShowModalCreateCVSkill(true);
    }
    const handleUpdateCVSkill = async (skill) => {
        setDataSkill(skill);
        setShowModalEditCVSkill(true);
    }

    //Kinh nghiem
    const fetchExp = async () => {
        let res = await fetchCVExp();
        // console.log(res)
        if (res && res.data) {
            setListExp(res.data)
        }
    }
    const handleDeleteCVExp = async (exp) => {
        let res = await deleteCVExp(exp.id);
        if (res) {
            toast.success("Xóa kinh nghiệm làm việc thành công!");
        }
        else {
            toast.error("Có lỗi xảy ra");
        }
        // console.log(edu);
    }

    const handleCreateCVExp = async () => {
        setShowModalCreateCVExp(true);
    }
    const handleUpdateCVExp = async (exp) => {
        setDataExp(exp);
        setShowModalEditCVExp(true);
    }


    useEffect(() => {
        fetchInfor();
        fetchObj();
        fetchEdu();
        fetchSkill();
        fetchExp();
        fetchDataCV();
    }, [])


    //PDF CV
    const [cvData, setCVData] = useState({});
    const [pdfUrl, setPdfUrl] = useState('');

    const fetchDataCV = async () => {
        let res = await printCVPDF();
        if (res && res.data) {
            setCVData(res.data);
        }
    }

    // const handleExportPDF = async () => {
    //     const html = `<div>${JSON.stringify(cvData)}</div>`;
    //     let res = await exportCVPDF(html);
    //     const blob = new Blob([res.data], { type: 'application/pdf' });
    //     const url = URL.createObjectURL(blob);
    //     setPdfUrl(url);

    //     // Open the PDF in a new tab
    //     window.open(url, '_blank');
    const conponentPDF = useRef();
    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdata",
        onAfterPrint: () => alert("Data saved in PDF")
    });


    return (
        <>
            <Header />
            <section class="blog_area single-post-area section-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="blog_right_sidebar">

                                <aside class="single_sidebar_widget post_category_widget" style={{ background: "" }}>
                                    <h4 class="widget_title" style={{ color: "green" }}><i class="fa-solid fa-download"></i> Bạn có thể xem và tải CV bên dưới</h4>
                                    <ul class="list cat-list">
                                        <li>
                                            <button className="btn head-btn1"
                                                onClick={generatePDF}
                                            >Xem và tải CV</button>

                                        </li>
                                        <div style={{ display: "none" }}>
                                            <div ref={conponentPDF} style={{ width: '100%' }}>
                                                <ExportPDF />

                                            </div>
                                        </div>

                                    </ul>
                                </aside>

                            </div>
                        </div>
                        <div class="col-lg-8 posts-list">
                            <div class="single-post">
                                < Container className="mt--7" fluid >
                                    {/* Dark table */}
                                    <Row className="mt-4">
                                        <div className="col">
                                            <Card className="shadow">
                                                <CardHeader className="bg-transparent border-0">
                                                    <Row>
                                                        <Col xs="3">
                                                            <div class="company-img">
                                                                <a href="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                                    <img
                                                                        src={imgInfor !== "user.png" && imgInfor !== null
                                                                            ? `http://localhost:8080/uploads/${imgInfor}`
                                                                            : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                                        }
                                                                        width="120px"
                                                                        height="120px"
                                                                        alt="" />
                                                                </a>
                                                            </div>
                                                        </Col>
                                                        <Col xs="8">
                                                            <h3 className=" mb-0" style={{ paddingBottom: "10px" }}>{!fullnameInfor ? fullNameSession : fullnameInfor}</h3>

                                                            <a href="" style={{ fontSize: "20px", color: "grey", fontSize: "20px" }}>{position ? position : "Chưa cập nhật"}</a>
                                                            <ul className="blog-info-link mt-3 mb-4">
                                                                <li style={{ color: "black", fontSize: "16px" }}> <i class="fa-regular fa-envelope"></i>   {!emailInfor ? emailSession : emailInfor}</li>
                                                                <li style={{ color: "black", fontSize: "16px" }}> <i class="fa-solid fa-phone"></i>{phone ? phone : "Chưa cập nhật"}</li>

                                                            </ul>
                                                            <ul className="blog-info-link mt-3 mb-4">
                                                                <li style={{ color: "black", fontSize: "16px" }}> <i class="fa-solid fa-gift"></i>{birthday ? <>
                                                                    {new Date(birthday).toLocaleDateString("en-GB", {
                                                                        day: "numeric",
                                                                        month: "numeric",
                                                                        year: "numeric",
                                                                    })}
                                                                </>
                                                                    : "Chưa cập nhật"
                                                                }</li>
                                                                <li style={{ color: "black", fontSize: "16px" }}> <i class="fa-solid fa-user"></i>{gender ? gender : "Chưa cập nhật"}</li>
                                                            </ul>
                                                            <ul className="blog-info-link mt-3 mb-4">
                                                                <li style={{ color: "black", fontSize: "16px" }}><i class="fa-solid fa-link"></i> {link ? link : "Chưa cập nhật"}</li>
                                                            </ul>
                                                            <ul className="blog-info-link mt-3 mb-4">
                                                                <li style={{ color: "black", fontSize: "16px" }}> <i class="fa-solid fa-location-dot"></i>{address ? address : "Chưa cập nhật"}</li>
                                                            </ul>

                                                        </Col>
                                                        <Col>
                                                            <span onClick={() => handleUpdateInfoCV()} style={{ color: "red" }}

                                                            >
                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                            </span>

                                                        </Col>

                                                    </Row>
                                                    <br></br>

                                                </CardHeader>

                                            </Card>
                                        </div>
                                    </Row>
                                    <Row className="mt-4">
                                        <div className="col">
                                            <Card className="shadow">
                                                <CardHeader className="bg-transparent border-0">
                                                    <Row>
                                                        <Col xs="11">
                                                            <h3>Mục tiêu nghề nghiệp</h3>

                                                        </Col>

                                                        <Col>
                                                            <span style={{ color: "red" }}
                                                                onClick={() => handleUpdateCVObj()}
                                                            >
                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                            </span>

                                                        </Col>

                                                    </Row>
                                                    <hr></hr>
                                                    <Row>
                                                        <Col xs="12">
                                                            <p style={{ fontSize: "18px" }}>{obj}</p>

                                                        </Col>

                                                    </Row>
                                                    <br></br>

                                                </CardHeader>

                                            </Card>
                                        </div>
                                    </Row>
                                    <Row className="mt-4">
                                        <div className="col">
                                            <Card className="shadow">
                                                <CardHeader className="bg-transparent border-0">
                                                    <Row>
                                                        <Col xs="11">
                                                            <h3>Học vấn</h3>

                                                        </Col>
                                                        <Col>
                                                            <span style={{ color: "red" }}
                                                                onClick={() => handleCreateCVEdu()}
                                                            >
                                                                <i class="fa-solid fa-plus"></i>
                                                            </span>

                                                        </Col>


                                                    </Row>
                                                    <hr></hr>
                                                    {listEdu && listEdu.length > 0
                                                        && listEdu.map((item, index) => (
                                                            <>
                                                                <Row key={index}>
                                                                    <Col xs="10">
                                                                        <h5 style={{ fontSize: "18px" }}>{item.school}</h5>
                                                                        <p>Ngành học: {item.major ? item.major : "Chưa cập nhật"}</p>
                                                                        <p> {
                                                                            new Date(item.start).toLocaleDateString("en-GB", {
                                                                                day: "numeric",
                                                                                month: "numeric",
                                                                                year: "numeric",
                                                                            })
                                                                        } - {!item.end ? "Hiện tại" : new Date(item.end).toLocaleDateString("en-GB", {
                                                                            day: "numeric",
                                                                            month: "numeric",
                                                                            year: "numeric",
                                                                        })}</p>
                                                                        <p>{item.more}</p>
                                                                    </Col>
                                                                    <Col xs="1">
                                                                        <span style={{ color: "red" }}
                                                                            onClick={() => handleUpdateCVEdu(item)}
                                                                        >
                                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                                        </span>

                                                                    </Col>
                                                                    <Col xs="1">
                                                                        <span style={{ color: "red" }}
                                                                            onClick={() => handleDeleteCVEdu(item)}
                                                                        >
                                                                            <i class="fa-regular fa-trash-can"></i>
                                                                        </span>

                                                                    </Col>

                                                                </Row>
                                                                <hr></hr>
                                                            </>
                                                        ))
                                                    }

                                                    <br></br>

                                                </CardHeader>

                                            </Card>
                                        </div>
                                    </Row>
                                    <Row className="mt-4">
                                        <div className="col">
                                            <Card className="shadow">
                                                <CardHeader className="bg-transparent border-0">
                                                    <Row>
                                                        <Col xs="11">
                                                            <h3>Kỹ năng</h3>

                                                        </Col>
                                                        <Col>
                                                            <span style={{ color: "red" }}
                                                                onClick={() => handleCreateCVSkill()}
                                                            >
                                                                <i class="fa-solid fa-plus"></i>
                                                            </span>

                                                        </Col>


                                                    </Row>
                                                    <hr></hr>
                                                    {listSkill && listSkill.length > 0
                                                        && listSkill.map((item, index) => (
                                                            <>
                                                                <Row key={index}>
                                                                    <Col xs="10">
                                                                        <h5>{item.name ? item.name : "Chưa cập nhật"}</h5>

                                                                        <p>{item.des}</p>
                                                                    </Col>
                                                                    <Col xs="1">
                                                                        <span style={{ color: "red" }}
                                                                            onClick={() => handleUpdateCVSkill(item)}
                                                                        >
                                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                                        </span>

                                                                    </Col>
                                                                    <Col xs="1">
                                                                        <span style={{ color: "red" }}
                                                                            onClick={() => handleDeleteCVSkill(item)}
                                                                        >
                                                                            <i class="fa-regular fa-trash-can"></i>
                                                                        </span>

                                                                    </Col>

                                                                </Row>
                                                                <hr></hr>
                                                            </>
                                                        ))
                                                    }

                                                    <br></br>

                                                </CardHeader>

                                            </Card>
                                        </div>
                                    </Row>
                                    <Row className="mt-4">
                                        <div className="col">
                                            <Card className="shadow">
                                                <CardHeader className="bg-transparent border-0">
                                                    <Row>
                                                        <Col xs="11">
                                                            <h3>Kinh nghiệm làm việc</h3>

                                                        </Col>
                                                        <Col>
                                                            <span style={{ color: "red" }}
                                                                onClick={() => handleCreateCVExp()}
                                                            >
                                                                <i class="fa-solid fa-plus"></i>
                                                            </span>

                                                        </Col>


                                                    </Row>
                                                    <hr></hr>
                                                    {listExp && listExp.length > 0
                                                        && listExp.map((item, index) => (
                                                            <>
                                                                <Row key={index}>
                                                                    <Col xs="10">
                                                                        <h5 style={{ fontSize: "18px" }}>
                                                                            {item.company ? item.company : "Chưa cập nhật"} | {item.position ? item.position : "Chưa cập nhật"}
                                                                        </h5>

                                                                        <p> {
                                                                            new Date(item.start).toLocaleDateString("en-GB", {
                                                                                day: "numeric",
                                                                                month: "numeric",
                                                                                year: "numeric",
                                                                            })
                                                                        } - {!item.end ? "Hiện tại" : new Date(item.end).toLocaleDateString("en-GB", {
                                                                            day: "numeric",
                                                                            month: "numeric",
                                                                            year: "numeric",
                                                                        })}</p>

                                                                        {/* <p>{item.des}</p> */}
                                                                        <p>
                                                                            <span dangerouslySetInnerHTML={{ __html: item.des }}></span>
                                                                            {/* {ReactHtmlParser(item.des)} */}
                                                                        </p>
                                                                    </Col>
                                                                    <Col xs="1">
                                                                        <span style={{ color: "red" }}
                                                                            onClick={() => handleUpdateCVExp(item)}
                                                                        >
                                                                            <i class="fa-solid fa-pen-to-square"></i>
                                                                        </span>

                                                                    </Col>
                                                                    <Col xs="1">
                                                                        <span style={{ color: "red" }}
                                                                            onClick={() => handleDeleteCVExp(item)}
                                                                        >
                                                                            <i class="fa-regular fa-trash-can"></i>
                                                                        </span>

                                                                    </Col>

                                                                </Row>
                                                                <hr></hr>
                                                            </>
                                                        ))
                                                    }

                                                    <br></br>

                                                </CardHeader>

                                            </Card>
                                        </div>
                                    </Row>
                                </Container >

                            </div>

                        </div>

                    </div>
                </div>
            </section >

            <Footer />
            <ModalUpdateCVInfo
                show={showModalCVInfor}
                handleClose={handleClose}
            />
            <ModalUpdateCVObj
                show={showModalCVObj}
                handleClose={handleClose}
            />
            <ModalCreateCVEdu
                show={showModalCreateCVEdu}
                handleClose={handleClose}
            />
            <ModalUpdateCVEdu
                dataEdu={dataEdu}
                show={showModalEditCVEdu}
                handleClose={handleClose}
            />
            <ModalCreateCVSkill
                show={showModalCreateCVSkill}
                handleClose={handleClose}
            />
            <ModalUpdateCVSkill
                dataSkill={dataSkill}
                show={showModalEditCVSkill}
                handleClose={handleClose}
            />
            <ModalCreateCVExp
                show={showModalCreateCVExp}
                handleClose={handleClose}
            />
            <ModalUpdateCVExp
                dataExp={dataExp}
                show={showModalEditCVExp}
                handleClose={handleClose}
            />
        </>


    );
};

export default InforJobSeeker;
