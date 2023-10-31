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
import ModalAddNew from "./ModalAddNew";
import ModalEditSkill from "./ModalEdit";
import ModalConfirm from "./ModalConfirm";
import { fetchAllSkill } from "services/Admin/SkillService";

const Tables = (props) => {

    const [ListKills, setListKills] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [totalSkill, setTotalSkill] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataSkillEdit, setDataSkillEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataSkillDelete, setDataSkillDelete] = useState({});

    // // Add new
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTable = (skill) => {
        setListKills([skill, ...ListKills])
    }
    // // EDIT
    const handleEditSkill = (skill) => {
        // console.log(city);
        setDataSkillEdit(skill);
        setIsShowModalEdit(true);
    }
    //Delete
    const handleDeleteSkill = (skill) => {
        setIsShowModalDelete(true);
        setDataSkillDelete(skill);
        // console.log(city);
    }
    const handleDeleteSkillFromModal = (skill) => {
        let cloneListSkill = _.cloneDeep(ListKills);
        cloneListSkill = cloneListSkill.filter(item => item.id != skill.id);
        setListKills(cloneListSkill);
    }

    // display all City =============================
    useEffect(() => {
        //call api
        getSkills(1);
    }, []);

    const getSkills = async (page) => {
        let res = await fetchAllSkill(page);
        console.log(">>> Check new res:", res.totalPage);
        if (res && res.data.rows) {
            setListKills(res.data.rows);
            setTotalPages(res.totalPage);
            setTotalSkill(res.data.count);
        }
    }
    //Pagination ==================================
    const handlePageClick = (event) => {
        console.log("event lib: ", event)
        getSkills(+event.selected + 1);
    }
    //Search
    const handleSearch = debounce((event) => {

        let term = event.target.value;
        console.log("term: ", term);
        if (term) {
            let cloneListSkills = _.cloneDeep(ListKills);
            cloneListSkills = cloneListSkills.filter(item => item.name.toLowerCase().includes(term))
            setListKills(cloneListSkills);
            console.log("clone: ", cloneListSkills);
        } else {
            getSkills(1);
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
                                        <th scope="col">Tên kỹ năng</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListKills && ListKills.length > 0
                                        && ListKills.map((item, index) => {
                                            return (
                                                <tr key={`skills-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <Row>
                                                            <Col xs="2">
                                                                <button className='btn btn-info'
                                                                    onClick={() => handleEditSkill(item)}
                                                                >
                                                                    Sửa</button>
                                                            </Col>
                                                            <Col xs="2">
                                                                <button className='btn btn-danger'
                                                                    onClick={() => { handleDeleteSkill(item) }}
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
            <ModalEditSkill
                show={isShowModalEdit}
                handleClose={handleClose}
                dataSkillEdit={dataSkillEdit}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataSkillDelete={dataSkillDelete}
                handleDeleteSkillFromModal={handleDeleteSkillFromModal}
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