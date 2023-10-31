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
import { fetchAllCity, searchCity, allCity } from "services/Admin/CityService";
import { useState } from "react";
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import ModalAddNew from "./ModalAppNew";
import ModalEditCity from "./ModalEditCity";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";

import axios from "axios";
const Tables = (props) => {

    const [listCities, setListCities] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalCities, setTotalCities] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataCityEdit, setDataCityEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataCityDelete, setDataCityDelete] = useState({});

    const [keyword, setKeyWord] = useState("");
    const [listsearch, setListsearch] = useState([]);


    //Add New City ============================
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTable = (city) => {
        setListCities([city, ...listCities])
    }

    //Edit City ========================================
    const handleEditCity = (city) => {
        // console.log(city);
        setDataCityEdit(city);
        setIsShowModalEdit(true);
    }

    //Delete City ========================================
    const handleDeleteCity = (city) => {
        setIsShowModalDelete(true);
        setDataCityDelete(city);
        // console.log(city);
    }
    const handleDeleteCityFromModal = (city) => {
        let cloneListCities = _.cloneDeep(listCities);
        cloneListCities = cloneListCities.filter(item => item.id != city.id);
        setListCities(cloneListCities);
    }

    // display all City =============================
    useEffect(() => {
        //call api
        getCities(1);
    }, []);

    const getCities = async (page) => {
        let res = await fetchAllCity(page);
        // console.log(">>> Check new res:", res);
        if (res && res.data && res.data.rows) {
            setListCities(res.data.rows);
            setTotalPages(res.totalPage);
            setTotalCities(res.data.count);
        }
    }
    //Pagination ==================================
    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getCities(+event.selected + 1);
    }

    //Search
    const handleSearch = debounce((event) => {

        let term = event.target.value;
        console.log("term: ", term);
        if (term) {
            let cloneListCities = _.cloneDeep(listCities);
            cloneListCities = cloneListCities.filter(item => item.name.toLowerCase().includes(term))
            setListCities(cloneListCities);
            console.log("clone: ", cloneListCities);
        } else {
            getCities(1);
        }
    }, 500)

    //Demo
    useEffect(() => {
        //call api
        getAllCities();
    }, []);

    const getAllCities = async () => {
        let res = await allCity();
        // console.log(">>> Check new res:", res);
        if (res) {
            setListsearch(res);
        }
    }



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
                                        <h3 className="text-white mb-0">Danh sách thành phố</h3>
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
                                        <th scope="col">Tên thành phố</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listCities && listCities.length > 0
                                        && listCities.map((item, index) => {
                                            return (
                                                <tr key={`cities-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <Row>
                                                            <Col xs="2">
                                                                <button className='btn btn-info'
                                                                    onClick={() => handleEditCity(item)}
                                                                >
                                                                    Sửa</button>
                                                            </Col>
                                                            <Col xs="2">
                                                                <button className='btn btn-danger'
                                                                    onClick={() => { handleDeleteCity(item) }}
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
            <ModalEditCity
                show={isShowModalEdit}
                handleClose={handleClose}
                dataCityEdit={dataCityEdit}
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
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataCityDelete={dataCityDelete}
                handleDeleteCityFromModal={handleDeleteCityFromModal}
            />

        </>
    );
};

export default Tables;
