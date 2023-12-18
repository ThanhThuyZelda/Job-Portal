import React, { useEffect } from 'react';
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import { useState } from "react";
import {
    fetchCVInfor, fetchCVObj, fetchCVEdu,
    fetchCVSkill,
    fetchCVExp

} from '../services/Homepage/PostService.js';

const ExportPDF = () => {

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
    const [listSkill, setListSkill] = useState([]);
    const [listExp, setListExp] = useState([]);

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
    const fetchSkill = async () => {
        let res = await fetchCVSkill();
        // console.log(res)
        if (res && res.data) {
            setListSkill(res.data)
        }
    }
    const fetchExp = async () => {
        let res = await fetchCVExp();
        // console.log(res)
        if (res && res.data) {
            setListExp(res.data)
        }
    }
    useEffect(() => {
        fetchInfor();
        fetchObj();
        fetchEdu();
        fetchSkill();
        fetchExp();
    }, [])

    return (

        <>
            <header class="resume-header pt-4 pt-md-0">
                {/* <div class="row"> */}
                <Row>
                    <Col xs="2">
                        <div className="col-block col-md-auto resume-picture-holder text-center text-md-start">
                            <img
                                src={imgInfor !== "user.png" && imgInfor !== null
                                    ? `http://localhost:8080/uploads/${imgInfor}`
                                    : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                }
                                width="120px"
                                height="120px"
                                class="picture"
                                alt="" />
                        </div>
                    </Col>
                    <Col>
                        {/* <div class="col"> */}
                        <div class="row p-4 justify-content-center justify-content-md-between">
                            <div class="primary-info col-auto">
                                <h1 class="name mt-0 mb-1 text-white text-uppercase text-uppercase">{fullnameInfor}</h1>
                                <div class="title mb-3">{position}</div>
                                <ul class="list-unstyled">
                                    <li class="mb-2"><a class="text-link" href="#"><i class="far fa-envelope fa-fw me-2" data-fa-transform="grow-3"></i>{emailInfor}</a></li>
                                    <li><a class="text-link" href="#"><i class="fas fa-mobile-alt fa-fw me-2" data-fa-transform="grow-6"></i>{phone}</a></li>
                                </ul>
                            </div>
                            <div class="secondary-info col-auto mt-2">
                                <ul class="resume-social list-unstyled">
                                    <li class="mb-3"><a class="text-link" href="#"><span class="fa-container text-center me-2"><i class="fa-solid fa-cake-candles"></i></span>
                                        {new Date(birthday).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric",
                                        })}
                                    </a></li>
                                    <li class="mb-3"><a class="text-link" href="#"><span class="fa-container text-center me-2"><i class="fa-solid fa-venus-mars"></i></span>{gender}</a></li>
                                    <li class="mb-3"><a class="text-link" href="#"><span class="fa-container text-center me-2"><i class="fa-solid fa-location-dot"></i></span>{address}</a></li>
                                    <li><a class="text-link" href="#"><span class="fa-container text-center me-2"><i class="fas fa-globe"></i></span>{link}</a></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    {/* </div> */}
                    {/* </div> */}
                </Row>
            </header>
            <div class="resume-body p-5">
                <section class="resume-section summary-section mb-5">
                    <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Mục tiêu nghề nghiệp</h2>
                    <div class="resume-section-content">
                        <p class="mb-0">{obj}</p>
                    </div>
                </section>
                {/* <<div class="row">> */}
                <Row>
                    {/* <div class="col-lg-3"> */}
                    <Col xs="3">
                        <section class="resume-section education-section mb-5">
                            <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Học vấn</h2>
                            <div class="resume-section-content">
                                <ul class="list-unstyled">
                                    {listEdu && listEdu.length > 0
                                        && listEdu.map((item, index) => (
                                            <>
                                                <li class="mb-2">
                                                    <div class="resume-degree font-weight-bold">{item.school}</div>
                                                    <div class="resume-degree-org">{item.major}</div>
                                                    <div class="resume-degree-time">{
                                                        new Date(item.start).toLocaleDateString("en-GB", {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                        })
                                                    } - {!item.end ? "Hiện tại" : new Date(item.end).toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "numeric",
                                                        year: "numeric",
                                                    })}
                                                    </div>
                                                    <div class="resume-degree-time">{item.more}</div>
                                                </li >
                                            </>
                                        ))
                                    }
                                </ul >
                            </div>
                        </section>
                        <section class="resume-section skills-section mb-5">
                            <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Kỹ năng &amp; Công nghệ</h2>
                            <div class="resume-section-content">
                                {listSkill && listSkill.length > 0
                                    && listSkill.map((item, index) => (
                                        <>
                                            <div class="resume-skill-item">

                                                <h4 class="resume-skills-cat font-weight-bold">{item.name}</h4>
                                                <ul class="list-unstyled mb-4">
                                                    <li class="mb-2">
                                                        <div class="resume-skill-name"><span dangerouslySetInnerHTML={{ __html: item.des }}></span></div>
                                                    </li>

                                                </ul >

                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </section>

                    </Col>
                    {/* </div> */}
                    {/* <div class="col-lg-9"> */}
                    <Col xs="9">
                        <section class="resume-section experience-section mb-5">
                            <h2 class="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">Kinh nghiệm làm việc</h2>
                            <div class="resume-section-content">
                                <div class="resume-timeline position-relative">
                                    {listExp && listExp.length > 0
                                        && listExp.map((item, index) => (
                                            <>
                                                <article class="resume-timeline-item position-relative pb-5">

                                                    <div class="resume-timeline-item-header mb-2">
                                                        <div class="d-flex flex-column flex-md-row">
                                                            <h3 class="resume-position-title font-weight-bold mb-1"> {item.position}</h3>
                                                            <div class="resume-company-name ms-auto"> {item.company}</div>
                                                        </div>
                                                        <div class="resume-position-time">
                                                            {
                                                                new Date(item.start).toLocaleDateString("en-GB", {
                                                                    day: "numeric",
                                                                    month: "numeric",
                                                                    year: "numeric",
                                                                })
                                                            } - {!item.end ? "Hiện tại" : new Date(item.end).toLocaleDateString("en-GB", {
                                                                day: "numeric",
                                                                month: "numeric",
                                                                year: "numeric",
                                                            })}</div>
                                                    </div>
                                                    <div class="resume-timeline-item-desc">
                                                        <span dangerouslySetInnerHTML={{ __html: item.des }}></span>
                                                    </div>

                                                </article>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                        </section>
                        {/* </div> */}
                    </Col>
                </Row>
                {/* </div> */}




            </div>

        </>

    );
};

export default ExportPDF;