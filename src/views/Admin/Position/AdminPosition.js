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
import { fetchAllPosition } from "services/Admin/PositionService";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import _, { debounce } from "lodash";
import ModalAddNew from "./ModalAddNew";
import ModalEditPosition from "./ModalEdit";
import ModalConfirm from "./ModalConfirm";

const Tables = (props) => {

    const [listPositions, setListPosition] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalPositions, setTotalPosition] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataPositionEdit, setDataPositionEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataPositionDelete, setDataPositionDelete] = useState({});

    // Add new
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTable = (position) => {
        setListPosition([position, ...listPositions])
    }
    // EDIT
    const handleEditPosition = (position) => {
        // console.log(city);
        setDataPositionEdit(position);
        setIsShowModalEdit(true);
    }
    //Delete
    const handleDeletePosition = (position) => {
        setIsShowModalDelete(true);
        setDataPositionDelete(position);
        // console.log(city);
    }
    const handleDeletePositionFromModal = (position) => {
        let cloneListPosition = _.cloneDeep(listPositions);
        cloneListPosition = cloneListPosition.filter(item => item.id != position.id);
        setListPosition(cloneListPosition);
    }

    // display all City =============================
    useEffect(() => {
        //call api
        getPositions(1);
    }, []);

    const getPositions = async (page) => {
        let res = await fetchAllPosition(page);
        console.log(">>> Check new res:", res.totalPage);
        if (res && res.data.rows) {
            setListPosition(res.data.rows);
            setTotalPages(res.totalPage);
            setTotalPosition(res.data.count);
        }
    }
    //Pagination ==================================
    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getPositions(+event.selected + 1);
    }
    //Search
    const handleSearch = debounce((event) => {

        let term = event.target.value;
        console.log("term: ", term);
        if (term) {
            let cloneListPositions = _.cloneDeep(listPositions);
            cloneListPositions = cloneListPositions.filter(item => item.name.toLowerCase().includes(term))
            setListPosition(cloneListPositions);
            console.log("clone: ", cloneListPositions);
        } else {
            getPositions(1);
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
                                        <h3 className="text-white mb-0">Danh sách vị trí</h3>
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
                                    <Col xs="2">
                                        <button className='btn btn-success'
                                            onClick={() => { setIsShowModalAddNew(true) }}>Thêm mới</button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <Table
                                className="align-items-center table-dark table-flush"
                                responsive

                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Tên vị trí</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listPositions && listPositions.length > 0
                                        && listPositions.map((item, index) => {
                                            return (
                                                <tr key={`positions-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <Row>
                                                            <Col xs="2">
                                                                <button className='btn btn-info'
                                                                    onClick={() => handleEditPosition(item)}
                                                                >
                                                                    Sửa</button>
                                                            </Col>
                                                            <Col xs="2">
                                                                <button className='btn btn-danger'
                                                                    onClick={() => { handleDeletePosition(item) }}
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
            <ModalEditPosition
                show={isShowModalEdit}
                handleClose={handleClose}
                dataPositionEdit={dataPositionEdit}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataPositionDelete={dataPositionDelete}
                handleDeletePositionFromModal={handleDeletePositionFromModal}
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



        </>
    );
};

export default Tables;