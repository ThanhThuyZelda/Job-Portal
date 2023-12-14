import Header from "components/Headers/JobSeekerLogined.js"
import Footer from "components/Footers/JobSeeker.js"
import React, { useEffect } from 'react';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { history } from "../services/Homepage/PostService.js";
import {
    Row,
    Col
} from "reactstrap";

const HistoryJobSeeker = () => {
    const [listPostApply, setListPostApply] = useState([]);
    const [listCVApply, setListCVApply] = useState([]);
    const [count, setCount] = useState();
    const navigate = useNavigate();



    const handleDetailPost = (post) => {
        navigate('/tim-viec-lam/chi-tiet-bai-tuyen-dung/',
            { replace: true, state: post });
        // console.log(post)
    }
    useEffect(() => {
        //call api
        getPost();
    }, []);

    const getPost = async () => {
        let res = await history();
        console.log(">>> Check new post:", res.post.rows);
        if (res && res.post.rows) {
            setListPostApply(res.post.rows);
            setCount(res.post.count);
            // setListCVApply(res.post.rows.CVs);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                {/* List chinh */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            {count > 0 ? (
                                <h2>Việc làm đã ứng tuyển ({count}) </h2>
                            ) : (
                                <h2>Bạn chưa ứng tuyển việc làm nào </h2>
                            )

                            }

                        </div>
                    </div>
                </div>
                <div class="row ">
                    {listPostApply && listPostApply.length > 0
                        && listPostApply.map((item, index) => (

                            <div class="col-xl-6" key={index}>
                                <div class="single-job-items mb-30">
                                    <Row>
                                        <div class="job-items" style={{ marginBottom: "10px" }}>

                                            <Col xs="3">
                                                <div class="company-img">
                                                    <Link to="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                        <img
                                                            src={item.Company.logo !== "user.png" && item.Company.logo !== null
                                                                ? `http://localhost:8080/uploads/${item.Company.logo}`
                                                                : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                            }
                                                            width="85px"
                                                            height="85px"
                                                            alt="" />
                                                    </Link>
                                                </div>
                                            </Col>
                                            <Col xs="">
                                                <div class="job-tittle">
                                                    <Link to="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                        <h4 >
                                                            {item.headline}
                                                        </h4>
                                                    </Link>
                                                </div>
                                            </Col>


                                        </div>
                                    </Row>
                                    <div class="job-tittle">
                                        <ul>
                                            <li>
                                                <Link to="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                    <h6 style={{ color: "red" }}>
                                                        {item.Company.name}
                                                    </h6>
                                                </Link>
                                            </li>
                                            <li><i class="fas fa-map-marker-alt"></i>{item.City.name}</li>
                                            <li>{item.salary}</li>

                                            <li style={{ color: "blue" }} >Hồ sơ đã nộp vào ngày:
                                                {item.CVs[0].createdAt && (
                                                    <>
                                                        {new Date(item.CVs[0].createdAt).toLocaleDateString("en-GB", {
                                                            day: "numeric",
                                                            month: "numeric",
                                                            year: "numeric",
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit'
                                                        })}
                                                    </>
                                                )}

                                            </li>
                                        </ul>

                                    </div>



                                    <div class="items-link f-right">
                                        <a
                                            onClick={() => handleDetailPost(item)}
                                        >
                                            Xem chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>




            <Footer />
        </>
    );
};

export default HistoryJobSeeker;
