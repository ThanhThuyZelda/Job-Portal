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
import { fetchAllEmployer } from "services/Admin/EmployerService";
import ModalConfirm from "./ModalConfirm";

const Tables = (props) => {

    const [listEmployers, setListEmployers] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalEmployer, setTotalEmployer] = useState(0);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataEmployerDelete, setDataEmployerDelete] = useState({});

    // delete
    const handleClose = () => {
        setIsShowModalDelete(false);
    }
    const handleDeleteEmployer = (employer) => {
        setIsShowModalDelete(true);
        setDataEmployerDelete(employer);
        // console.log(city);
    }
    const handleDeleteEmployerFromModal = (employer) => {
        let cloneListEmployers = _.cloneDeep(listEmployers);
        cloneListEmployers = cloneListEmployers.filter(item => item.id != employer.id);
        setListEmployers(cloneListEmployers);
    }



    // display all City =============================
    useEffect(() => {
        //call api
        getEmpoyers(1);
    }, []);

    const getEmpoyers = async (page) => {
        let res = await fetchAllEmployer(page);
        console.log(">>> Check new res:", res.data.rows);
        if (res && res.data.rows) {
            setListEmployers(res.data.rows);
            setTotalPages(res.totalPage);
            setTotalEmployer(res.data.count);
        }
    }
    //Pagination ==================================
    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getEmpoyers(+event.selected + 1);
    }
    //Search
    const handleSearch = debounce((event) => {

        let term = event.target.value;
        console.log("term: ", term);
        if (term) {
            let cloneListEmployers = _.cloneDeep(listEmployers);
            cloneListEmployers = cloneListEmployers.filter(item => item.fullname.toLowerCase().includes(term))
            // || (item => item.email.toLowerCase().includes(term)))
            setListEmployers(cloneListEmployers);
            console.log("clone: ", cloneListEmployers);
        } else {
            getEmpoyers(1);
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
                                        <h3 className="text-white mb-0">Danh sách nhà tuyển dụng</h3>
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
                                        <th scope="col">Tên nhà tuyển dụng</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Vị trí</th>
                                        <th scope="col">Công ty</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listEmployers && listEmployers.length > 0
                                        && listEmployers.map((item, index) => {
                                            return (
                                                <tr key={`employer-${index}`}>
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
                                                    <td>{item.phone}</td>
                                                    <td>{item.position}</td>
                                                    <td>{item.company}</td>
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
                                                                    onClick={() => { handleDeleteEmployer(item) }}
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
                dataEmployerDelete={dataEmployerDelete}
                handleDeleteEmployerFromModal={handleDeleteEmployerFromModal}
            />



        </>
    );
};

export default Tables;