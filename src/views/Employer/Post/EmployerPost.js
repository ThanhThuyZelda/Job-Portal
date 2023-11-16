import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    Button,
    CardBody, CardTitle, UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/EmployerHeader";
import { useEffect } from "react";
import { fetchAllPost } from "services/Employer/PostService";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import ModalEditPost from "./ModalEdit";
import ModalConfirm from "./ModalConfirm";
import ModalDetailPost from "./ModalDetailPost.js"
import _, { debounce } from "lodash";

const Tables = (props) => {

    const [listPost, setListPost] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalPost, setTotalPost] = useState(0);

    const [isShowModalDetailPost, setIsShowModalDetailPost] = useState(false);
    const [dataDetailPost, setDataDetailPost] = useState({});

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataPostEdit, setDataPostEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataPostDelete, setDataPostDelete] = useState({});

    // Add new
    const handleClose = () => {
        setIsShowModalDetailPost(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTable = (post) => {
        setListPost([post, ...listPost])
    }

    // Detail Post ====================================
    const handleDetailPost = (post) => {
        setIsShowModalDetailPost(true);
        setDataDetailPost(post);
    }

    //Delete Post =====================================
    const handleDeletePost = (post) => {
        setIsShowModalDelete(true);
        setDataPostDelete(post);
    }


    //Edit Post ========================================
    const handleUpdatePost = (post) => {
        setDataPostEdit(post);
        setIsShowModalEdit(true);
    }



    // display all Post =============================
    useEffect(() => {
        //call api
        getPosts(1);
    }, []);

    const getPosts = async (page) => {
        let res = await fetchAllPost(page);
        console.log(">>> Check new res:", res);
        if (res && res.data.rows) {
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


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>

                {/* Dark table */}
                <Row className="mt-5">
                    <div className="col">
                        <Card className=" shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <Col xs="8">
                                        <h3 className="text-red mb-0">Danh sách bài tuyển dụng của bạn</h3>
                                    </Col>

                                </Row>
                                <br></br>
                                <Row>
                                    <Col xs="4">
                                        <input type="text" className="form-control"
                                            placeholder="Tìm kiếm"
                                        // onChange={(event) => handleSearch(event)}
                                        />
                                    </Col>


                                    <Col xs="3"> </Col>
                                    {/* <Col xs="2">
                                        <button className='btn btn-success'
                                            onClick={() => { setIsShowModalAddNew(true) }}
                                        >Thêm mới</button>
                                    </Col> */}
                                </Row>
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    {listPost && listPost.length > 0
                                        && listPost.map((item, index) => {
                                            const deadlineDate = new Date(item.DeadlineSubmission);

                                            // Lấy ngày, tháng, năm
                                            const day = deadlineDate.getDate();
                                            const month = deadlineDate.getMonth() + 1; // Lưu ý: tháng bắt đầu từ 0
                                            const year = deadlineDate.getFullYear();
                                            return (
                                                <Col lg="6" xl="4" style={{ marginBottom: "20px" }} key={`posts-${index}`}>
                                                    <Card className="card-stats mb-6 mb-xl-0">
                                                        <CardBody>
                                                            <Row>
                                                                {/* <div className="col"> */}
                                                                <Col xs="9">
                                                                    <CardTitle tag="h5" className=" text-muted mb-0" style={{ paddingBottom: "10px" }}>
                                                                        {item.headline}
                                                                    </CardTitle>
                                                                    <span className="mb-0">
                                                                        Mức lương : {item.salary}
                                                                    </span><br></br>
                                                                    <span className="mb-0">
                                                                        Số lượng tuyển: {item.quantity}
                                                                    </span>
                                                                    <br></br>
                                                                    <span className="mb-0">
                                                                        Hạn nộp hồ sơ: {day}/{month}/{year}
                                                                    </span>
                                                                    <br></br>
                                                                    <span className="mb-0">
                                                                        Hình thức làm việc: {item.workform}
                                                                    </span>
                                                                    <br></br>
                                                                    <span className="mb-0">
                                                                        Địa điểm: {item.address}
                                                                    </span>
                                                                </Col>

                                                                {/* </div> */}
                                                                <Col xs="3">
                                                                    <button className="icon icon-shape rounded-circle shadow btn btn-outline-success"
                                                                        style={{ marginBottom: "5px" }}
                                                                        title="Xem chi tiết bài đăng"
                                                                        onClick={() => handleDetailPost(item)}>
                                                                        <i class="fa-solid fa-info"></i>
                                                                    </button>

                                                                    <button className="icon icon-shape rounded-circle shadow btn btn-outline-primary"
                                                                        style={{ marginBottom: "5px" }}
                                                                        onClick={() => handleUpdatePost(item)}
                                                                        title="Sửa bài đăng">
                                                                        <i class="fa-regular fa-pen-to-square"></i>

                                                                    </button>

                                                                    <button className="icon icon-shape rounded-circle shadow btn btn-outline-danger"
                                                                        title="Xóa bài đăng"
                                                                        onClick={() => handleDeletePost(item)}>
                                                                        <i class="fa-solid fa-trash-can"></i>
                                                                    </button>
                                                                </Col>

                                                            </Row>
                                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                                Trạng thái :
                                                                {item.status === 1 ?
                                                                    <span className="text-success mr-2">
                                                                        Đang hiển thị
                                                                    </span>
                                                                    :
                                                                    <span className="text-danger mr-2">
                                                                        Đã tạm ẩn
                                                                    </span>}
                                                                {/* <span className="text-nowrap">Since last month</span> */}
                                                            </p>
                                                            <br></br>
                                                            <button className=" shadow btn btn-outline-secondary">
                                                                Xem các hồ sơ đã ứng tuyển
                                                            </button>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>

                            </CardBody>

                            <CardFooter className="py-4">
                                <nav aria-label="...">
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
                                </nav>
                            </CardFooter>
                        </Card>
                    </div>
                </Row>

            </Container >
            <ModalEditPost
                show={isShowModalEdit}
                handleClose={handleClose}
                dataPostEdit={dataPostEdit}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalDetailPost
                show={isShowModalDetailPost}
                handleClose={handleClose}
                dataDetailPost={dataDetailPost}
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
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataPostDelete={dataPostDelete}
            // handleDeleteCityFromModal={handleDeleteCityFromModal}
            />

        </>
    );
};

export default Tables;
