import Header from "components/Headers/JobSeeker.js"
import HeaderLogin from "components/Headers/JobSeekerLogined.js";
import Footer from "components/Footers/JobSeeker.js"
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllCompany, fetchPostHomepage } from "../services/Homepage/PostService.js";
import Chatbot from "./Chatbot.js";

const JobSeeker = () => {
    const [listCompany, setListCompany] = useState([]);
    const [listPost, setListPost] = useState([]);

    //xem chi tiet
    const navigate = useNavigate();

    const handleDetailPost = (post) => {
        navigate('/tim-viec-lam/chi-tiet-bai-tuyen-dung/',
            { replace: true, state: post });
    }

    useEffect(() => {
        //call api
        getCompany();
        getPost();
    }, []);

    const getCompany = async () => {
        let res = await fetchAllCompany();
        // console.log(res);
        if (res) {
            setListCompany(res);
        }
    }
    const getPost = async () => {
        let res = await fetchPostHomepage();
        // console.log(res.data.rows);
        if (res && res.data && res.data.rows) {
            setListPost(res.data.rows);
        }
    }
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setLoggedIn(!!token); // Nếu có token, đánh dấu là đã đăng nhập
    }, []);
    const handleDetailCompany = (company) => {
        navigate('/ds-cong-ty/chi-tiet-cong-ty/',
            { replace: true, state: company });

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

            <main>

                <div className="our-services section-pad-t30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-tittle text-center">
                                    <span>Có thể bạn quan tâm</span>
                                    <h2>Các công ty tiềm năng</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-contnet-center">
                            {listCompany && listCompany.length > 0
                                && listCompany.map((item, index) => (
                                    <>
                                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={index}>
                                            <div className="single-services text-center mb-30">
                                                <div className="services-ion">
                                                    {/* <span className="flaticon-tour"></span> */}
                                                    <img
                                                        src={item.logo !== "user.png" && item.logo !== null
                                                            ? `http://localhost:8080/uploads/${item.logo}`
                                                            : `https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`
                                                        }
                                                        width="150px"
                                                        height="150px"
                                                        alt="" />
                                                </div>
                                                <div className="services-cap">
                                                    <h5><a onClick={() => handleDetailCompany(item)}>{item.name}</a></h5>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                ))
                            }
                        </div>

                    </div>
                </div>

                <div className="apply-process-area apply-bg pt-150 pb-150"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-tittle white-text text-center">

                                    <h2> Công cụ tốt nhất cho hành trang ứng tuyển của bạn</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-process text-center mb-30">
                                    <div className="process-ion">
                                        <span className="flaticon-search"></span>
                                    </div>
                                    <div className="process-cap">
                                        <h5>1. Tìm kiếm việc làm</h5>
                                        <p>Danh sách việc làm IT "chất" liên tục cập nhật các lựa chọn mới nhất theo thị trường và xu hướng tìm kiếm.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-process text-center mb-30">
                                    <div className="process-ion">
                                        <span className="flaticon-curriculum-vitae"></span>
                                    </div>
                                    <div className="process-cap">
                                        <h5>2. Ứng tuyển việc làm</h5>
                                        <p>Nền tảng việc làm an toàn, là sự lựa chọn hàng đầu của các nhà tuyển dụng đến từ các công ty.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-process text-center mb-30">
                                    <div className="process-ion">
                                        <span className="flaticon-tour"></span>
                                    </div>
                                    <div className="process-cap">
                                        <h5>3. Blog về IT</h5>
                                        <p>Đừng bỏ lỡ cơ hội cập nhật thông tin lương thưởng, chế độ làm việc, nghề nghiệp và kiến thức ngành IT.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="featured-job-area feature-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-tittle text-center">
                                    <h2>Việc làm nổi bậc</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                {/* ssssssssss */}
                                {listPost && listPost.length > 0
                                    && listPost.map((item, index) => (
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
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="browse-btn2 text-center mt-50">
                                    <a href="/tim-viec-lam" className="border-btn2">Xem thêm các công việc khác</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="support-company-area support-padding fix">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6">
                                <div className="right-caption">

                                    <div className="section-tittle section-tittle2">
                                        <span>What we are doing</span>
                                        <h2>Tuyển dụng Nhân tài IT tại Việt Nam cùng Job Finder</h2>
                                    </div>
                                    <div className="support-caption">
                                        <p className="pera-top">Với hiểu biết sâu sắc về lĩnh vực IT và các kỹ năng chuyên môn, chúng tôi có thể giúp bạn tiếp cận và tuyển dụng những ứng viên IT tốt nhất.</p>
                                        <p>Gia tăng cơ hội để tiếp cận ứng viên IT chất lượng từ Job Finder.Kết nối với nguồn hồ sơ ứng viên IT đa dạng, hoạt động tích cực.
                                            Dễ dàng tiếp cận ứng viên với thao tác đơn giản. Mở khóa để giúp tìm kiếm ứng viên phù hợp. </p>
                                        <a href="employer/dang-nhap" className="btn post-btn">Đăng tin tuyển dụng </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="support-location-img">
                                    <img src={require('../assets/template_ntv/img/service/support-img.jpg')} alt="" />
                                    <div className="support-img-cap text-center">
                                        <p>Since</p>
                                        <span>1994</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>
            <Chatbot />
            <Footer />
        </>


    )
}


export default JobSeeker;