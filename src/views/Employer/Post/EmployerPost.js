import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
// core components
import Header from "components/Headers/EmployerHeader";
import { useEffect } from "react";
import { fetchAllPost } from "services/Employer/PostService";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import ModalAddNew from "./ModalAppNew";
import ModalEditPost from "./ModalEdit";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";

const Tables = (props) => {

    const [listPost, setListPost] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalPost, setTotalPost] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataPostEdit, setDataPostEdit] = useState({});

    // Add new
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        // setIsShowModalDelete(false);
    }
    const handleUpdateTable = (post) => {
        setListPost([post, ...listPost])
    }

    //Edit Post ========================================
    const handleEditPost = (post) => {
        // console.log(city);
        setDataPostEdit(post);
        setIsShowModalEdit(true);
    }


    // display all City =============================
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
                                        <h3 className="text-red mb-0">Danh sách bài tuyển dụng</h3>
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
                                    <Col xs="2">
                                        <button className='btn btn-success'
                                            onClick={() => { setIsShowModalAddNew(true) }}
                                        >Thêm mới</button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table
                                className="align-items-center table-flush"
                                responsive

                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Tiêu đề</th>
                                        <th scope="col">Mức lương</th>
                                        <th scope="col">Giới tính</th>
                                        {/* <th scope="col">Yêu cầu</th>
                                        <th scope="col">Mô tả chi tiết</th> */}
                                        <th scope="col">Địa chỉ làm việc</th>
                                        <th scope="col">Nhà tuyển dụng</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {listPost && listPost.length > 0
                                        && listPost.map((item, index) => {
                                            return (
                                                <tr key={`posts-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.headline}</td>
                                                    <td>{item.salary}</td>
                                                    <td>{item.gender}</td>
                                                    {/* <td>{item.require}</td>
                                                    <td>{item.des}</td> */}
                                                    <td>{item.address}</td>
                                                    <td>{item.empID}</td>
                                                    <td>
                                                        <Row>
                                                            <Col xs="3">
                                                                <button className='btn btn-info'
                                                                    onClick={() => handleEditPost(item)}
                                                                >
                                                                    Sửa</button>
                                                            </Col>
                                                            <Col xs="2">
                                                                <button className='btn btn-danger'
                                                                // onClick={() => { handleDeleteCity(item) }}
                                                                >
                                                                    Xóa </button>
                                                            </Col>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>

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
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditPost
                show={isShowModalEdit}
                handleClose={handleClose}
                dataPostEdit={dataPostEdit}
                handleUpdateTable={handleUpdateTable}
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
            {/* <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataCityDelete={dataCityDelete}
                handleDeleteCityFromModal={handleDeleteCityFromModal}
            />  */}

        </>
    );
};

export default Tables;
