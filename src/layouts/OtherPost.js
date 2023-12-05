
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchOtherPostCompany } from "services/Homepage/PostService.js"
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
import { Link, useNavigate } from 'react-router-dom';
const OtherPost = () => {
    const location = useLocation();
    // console.log('Location:', location);

    const [listOtherPost, setListOtherPost] = useState([]);

    const navigate = useNavigate();



    const handleDetailPost = (post) => {
        // setDataDetailPost(post);
        navigate('/tim-viec-lam/chi-tiet-bai-tuyen-dung/',
            { replace: true, state: post });
    }

    const getOtherPost = async () => {
        let res = await fetchOtherPostCompany(location.state.id);
        // console.log("check", res.post)
        if (res && res.post) {
            setListOtherPost(res.post)
        }
    }
    useEffect(() => {
        //call api
        getOtherPost();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row justify-content-between">
                    {/* <!-- Left Content --> */}
                    <div className="col-xl-7 col-lg-7">
                        <div className="job-post-details">
                            <div className="post-details1 mb-50">
                                {/* <!-- Small Section Tittle --> */}
                                <div className="small-section-tittle">
                                    <h2>Các tin tuyển dụng khác của công ty</h2>
                                </div>
                                <br></br>
                                <div class="row ">
                                    {listOtherPost && listOtherPost.length > 0
                                        && listOtherPost.map((item, index) => (
                                            <div class="col-xl-12">
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
                                                        </ul>

                                                    </div>



                                                    <div class="items-link f-right">
                                                        <a
                                                            onClick={() => handleDetailPost(item)}
                                                        >Xem chi tiết</a>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    }


                                </div>


                            </div>

                        </div>
                        {/* <!-- Right Content --> */}

                    </div>
                </div>
            </div >
        </>
    );

}

export default OtherPost;



