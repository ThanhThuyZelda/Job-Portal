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
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllPost } from "services/Homepage/PostService.js"
import Chatbot from "./Chatbot";
import ReactPaginate from 'react-paginate';
import { fetchAllCity, searchPost } from "services/Employer/PostService.js"

const JobSeeker = (props) => {

    const [listPost, setListPost] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalPost, setTotalPost] = useState(0);
    //search
    const [cities, setCities] = useState([]);
    const [text, setText] = useState();
    const [skillID, setSkillID] = useState();
    const [workform, setWorkform] = useState();
    const [listPostSearch, setListPostSearch] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [salary, setSalary] = useState();

    //xem chi tiet
    const navigate = useNavigate();



    const handleDetailPost = (post) => {
        navigate('/tim-viec-lam/chi-tiet-bai-tuyen-dung/',
            { replace: true, state: post });
    }


    // display all Post =============================
    useEffect(() => {
        //call api
        getPosts(1);
        getCities();
    }, []);

    const getPosts = async (page) => {
        let res = await fetchAllPost(page);
        // console.log(">>> Check new post:", res.post);
        if (res && res.data && res.data.rows) {
            setListPost(res.data.rows);
            setTotalPages(res.totalPage);
            setTotalPost(res.data.count);
        }
    }
    //Pagination ==================================
    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getPosts(+event.selected + 1);
    }
    //Search ==============================

    // display list city
    const getCities = async () => {
        let res = await fetchAllCity();
        // console.log(">>> Check new city:", res.data.rows);
        if (res && res.data.rows) {
            setCities(res.data.rows);
        }
    }
    //fetch search
    const handleSearch = async () => {
        setIsSearching(true);
        let res = await searchPost(text, skillID, workform);
        console.log("search: ", res);
        if (res) {
            setListPostSearch(res);
        }

    }

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
                                                value={text}
                                                onChange={(event) => setText(event.target.value)}
                                                placeholder="Tìm kiếm"
                                            />
                                        </Col>
                                        <Col xs="3">
                                            <select
                                                id="select1"
                                                value={skillID}
                                                onChange={(event) => setSkillID(event.target.value)}
                                                className="form-control"
                                            >
                                                <option value=""> Chọn thành phố</option>
                                                {cities.map((city) => (

                                                    <option key={city.id} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))}

                                            </select>
                                        </Col>
                                        {/* <Col xs="2">
                                            <select
                                                id="exampleSelect"
                                                value={salary}
                                                onChange={(event) => setSalary(event.target.value)}
                                                className="form-control"
                                            >
                                                <option >Chọn mức lương</option>
                                                <option value="Thỏa thuận">Thỏa thuận</option>
                                                <option value="1">Dưới 10 triệu</option>
                                                <option value="2">10 - 15 triệu</option>
                                                <option value="3">15 - 20 triệu</option>
                                                <option value="4">Trên 20 triệu</option>
                                            </select>
                                        </Col> */}
                                        <Col xs="3">
                                            <select
                                                id="exampleSelect"
                                                value={workform}
                                                onChange={(event) => setWorkform(event.target.value)}
                                                className="form-control"
                                            >
                                                <option >Chọn hình thức làm việc</option>
                                                <option value="Fulltime">Fulltime</option>
                                                <option value="Parttime">Parttime</option>

                                            </select>
                                        </Col>
                                        <Col xs="1">
                                            <Button className="btn btn-danger"
                                                onClick={() => handleSearch()}
                                            >
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
                    {isSearching ? (
                        <>
                            {/* List search */}
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="section-tittle text-center">
                                        <h2>Kết quả tìm kiếm phù hợp</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row ">
                                {listPostSearch && listPostSearch.length > 0
                                    && listPostSearch.map((item, index) => (

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
                                                    </ul>

                                                </div>



                                                <div class="items-link f-right">
                                                    <a onClick={() => handleDetailPost(item)}>Xem chi tiết</a>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                        </>
                    ) : (
                        <>

                            {/* List chinh */}
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="section-tittle text-center">

                                        <h2>Việc làm tốt nhất</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row ">
                                {listPost && listPost.length > 0
                                    && listPost.map((item, index) => (
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
                                                    </ul>

                                                </div>



                                                <div class="items-link f-right">
                                                    <a onClick={() => handleDetailPost(item)}>Xem chi tiết</a>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                }

                            </div>
                            <ReactPaginate
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={totalPage}
                                previousLabel="<"
                                // PaginationItem
                                // PaginationLink
                                pageClassName='page-item'
                                pageLinkClassName='page-link'
                                previousClassName='page-item'
                                previousLinkClassName='page-link'
                                nextClassName='page-item'
                                nextLinkClassName='page-link'
                                breakClassName='page-item'
                                breakLinkClassName='page-link'
                                containerClassName='pagination'
                                activeClassName='active'
                            />
                        </>
                    )

                    }
                </div>
                <Chatbot />
            </main >
            <br></br>
            <Footer />
        </>


    )
}


export default JobSeeker;