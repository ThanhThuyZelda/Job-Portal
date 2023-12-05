import Header from "components/Headers/JobSeeker.js";
import Footer from "components/Footers/JobSeeker.js"
import { useLocation } from "react-router-dom";
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
import { fetchPostOfCompany } from "services/Homepage/PostService.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
const DetailCompany = (props) => {

    const location = useLocation();
    // console.log(location);

    const [listPostOfCmp, setListPostOfCmp] = useState([]);
    useEffect(() => {
        fetchCompany();
    }, []);
    const navigate = useNavigate();

    const fetchCompany = async () => {

        let res = await fetchPostOfCompany(location.state.id);
        // console.log(res.post);
        if (res && res.post) {
            setListPostOfCmp(res.post);
        }
    }

    const handleDetailPost = (post) => {
        navigate('/tim-viec-lam/chi-tiet-bai-tuyen-dung/',
            { replace: true, state: post });
    }

    return (
        <>
            <Header />

            <div className="slider-area ">
                <div className="single-slider background3 slider-height2 d-flex align-items-center" >
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
                < Container className="mt--7" fluid style={{ marginBottom: '10px' }}>
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
                                                        src={location.state.logo !== "user.png" && location.state.logo !== null
                                                            ? `http://localhost:8080/uploads/${location.state.logo}`
                                                            : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                        }
                                                        width="120px"
                                                        height="120px"
                                                        alt="" />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col xs="8">
                                            <h3 className=" mb-0" style={{ paddingBottom: "10px" }}>{location.state.name}</h3>
                                            <ul className="blog-info-link mt-3 mb-4">
                                                <li style={{ color: "black" }}> <i class="fa-solid fa-globe"></i>  {location.state.website}</li>

                                            </ul>
                                            <ul className="blog-info-link mt-3 mb-4">
                                                <li style={{ color: "black" }}><i class="fa-regular fa-building"></i> {location.state.scale}</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <br></br>

                                </CardHeader>

                            </Card>
                        </div>
                    </Row>
                </Container >


                <div class="row">
                    <div class="col-lg-8 posts-list">
                        <div class="single-post">
                            <div class="feature-img">
                                <img class="img-fluid" src="assets/img/blog/single_blog_1.png" alt="" />
                            </div>
                            <div class="blog_details">
                                <h1>Giới thiệu công ty</h1>
                                <p>{location.state.description}</p>
                                <h2>Địa chỉ công ty</h2>
                                <p>{location.state.address}</p>
                            </div>
                        </div>
                    </div >
                    <div class="col-lg-4">
                        <div class="blog_right_sidebar">

                            <aside class="single_sidebar_widget post_category_widget">
                                <h4 class="widget_title" style={{ color: "red" }}>Thông tin liên hệ</h4>
                                <ul class="list cat-list">
                                    <li>
                                        Quốc gia: {location.state.country}
                                    </li>
                                    <li>
                                        Ngôn ngữ: {location.state.skill}
                                    </li>
                                    <li>
                                        Thời gian làm việc: {location.state.worktime}
                                    </li>

                                </ul>
                            </aside>
                        </div>
                    </div>
                </div>
                <h1>Các tin tuyển dụng của công ty</h1>
                <br></br> <br></br>

                {/* <section className="featured-job-area feature-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-tittle text-center">
                                    <h2>Việc làm nổi bậc</h2>
                                </div>
                            </div>
                        </div> */}
                {/* <div className="row justify-content-center"> */}
                <div className="col-xl-10">
                    {/* ssssssssss */}
                    {listPostOfCmp && listPostOfCmp.length > 0
                        && listPostOfCmp.map((item, index) => (
                            <>
                                <div className="single-job-items mb-30" key={index}>
                                    <div className="job-items">
                                        <div className="company-img">
                                            <img
                                                src={item.Company.logo !== "user.png" && item.Company.logo !== null
                                                    ? `http://localhost:8080/uploads/${item.Company.logo}`
                                                    : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                }
                                                width="85px"
                                                height="85px"
                                                alt="" />
                                        </div>
                                        <div className="job-tittle">
                                            <a href="#">
                                                <h4>  {item.headline}</h4>
                                            </a>
                                            <ul>
                                                <li>  <Link to="/tim-viec-lam/chi-tiet-bai-tuyen-dung/">
                                                    <h6 style={{ color: "red" }}>
                                                        {item.Company.name}
                                                    </h6>
                                                </Link></li>
                                                <li><i className="fas fa-map-marker-alt"></i>{item.City.name}</li>
                                                <li>{item.salary}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="items-link f-right">
                                        <a onClick={() => handleDetailPost(item)}>Xem chi tiết</a>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>

            {/* </div>
                </section>
            </div> */}


            <Footer />
        </>
    )
}

export default DetailCompany;
