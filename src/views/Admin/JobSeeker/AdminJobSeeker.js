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
import Header from "components/Headers/AdminHeader.js";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import _, { debounce } from "lodash";
import { fetchAllJobSeeker } from "services/Admin/JobSeekerService";
import ModalConfirm from "./ModalConfirm";

const Tables = (props) => {

    const [listJobSeekers, setListJobSeekers] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalJobSeeker, setTotalJobSeeker] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataJobSeekerDelete, setDataJobSeekerDelete] = useState({});

    // delete
    const handleClose = () => {
        setIsShowModalDelete(false);
    }
    const handleDeleteJobSeeker = (jobSeeker) => {
        setIsShowModalDelete(true);
        setDataJobSeekerDelete(jobSeeker);
        // console.log(city);
    }
    const handleDeleteJobSeekerFromModal = (jobSeeker) => {
        let cloneListJobSeekers = _.cloneDeep(listJobSeekers);
        cloneListJobSeekers = cloneListJobSeekers.filter(item => item.id != jobSeeker.id);
        setListJobSeekers(cloneListJobSeekers);
    }



    // display all City =============================
    useEffect(() => {
        //call api
        getJobSeekers(1);
    }, []);

    const getJobSeekers = async (page) => {
        let res = await fetchAllJobSeeker(page);
        console.log(">>> Check new res:", res.data.rows);
        if (res && res.data.rows) {
            setListJobSeekers(res.data.rows);
            setTotalPages(res.totalPage);
            setTotalJobSeeker(res.data.count);
        }
    }
    //Pagination ==================================
    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getJobSeekers(+event.selected + 1);
    }
    //Search
    const handleSearch = debounce((event) => {

        let term = event.target.value;
        console.log("term: ", term);
        if (term) {
            let cloneListJobSeekers = _.cloneDeep(listJobSeekers);
            cloneListJobSeekers = cloneListJobSeekers.filter(item => item.fullname.toLowerCase().includes(term))
            // || (item => item.email.toLowerCase().includes(term)))
            setListJobSeekers(cloneListJobSeekers);
            console.log("clone: ", cloneListJobSeekers);
        } else {
            getJobSeekers(1);
        }
    }, 500)


    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Dark table */}
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <Row>
                                    <Col xs="8">
                                        <h3 className="text-white mb-0">Danh sách kỹ năng</h3>
                                    </Col>

                                </Row>
                                <br></br>
                                <Row>
                                    <Col xs="4">
                                        <input type="text" className="form-control"
                                            placeholder="Tìm kiếm"
                                            onChange={(event) => handleSearch(event)}
                                        />
                                    </Col>


                                    <Col xs="3"> </Col>
                                    {/* <Col xs="2">
                                        <button className='btn btn-success'
                                            onClick={() => { setIsShowModalAddNew(true) }}>Thêm mới</button>
                                    </Col> */}
                                </Row>
                            </CardHeader>
                            <Table
                                className="align-items-center table-dark table-flush"
                                responsive

                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Avatar</th>
                                        <th scope="col">Họ tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listJobSeekers && listJobSeekers.length > 0
                                        && listJobSeekers.map((item, index) => {
                                            return (
                                                <tr key={`jobSeeker-${index}`}>
                                                    <td>{item.id}</td>

                                                    <td>
                                                        {item.img !== "user.png" ?
                                                            < img className='avatar avatar-sm rounded-circle' src={`http://localhost:8080/uploads/${item.img}`} />

                                                            :
                                                            <img className="avatar avatar-sm rounded-circle" src="https://assets-prod.sumo.prod.webservices.mozgcp.net/static/default-FFA-avatar.2f8c2a0592bda1c5.png" />
                                                        }


                                                    </td>
                                                    <td>{item.fullname}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <Row>
                                                            {/* <Col xs="2">
                                                                <button className='btn btn-info'
                                                                    onClick={() => handleEditSkill(item)}
                                                                >
                                                                    Sửa</button>
                                                            </Col> */}
                                                            <Col xs="2">
                                                                <button className='btn btn-danger'
                                                                    onClick={() => { handleDeleteJobSeeker(item) }}
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
                dataJobSeekerDelete={dataJobSeekerDelete}
                handleDeleteJobSeekerFromModal={handleDeleteJobSeekerFromModal}
            />



        </>
    );
};

export default Tables;