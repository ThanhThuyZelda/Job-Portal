import {
    Row,
    Col,
    Button,
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Progress,
    Table,
    UncontrolledTooltip

} from "reactstrap";
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { listCVOfPost } from 'services/Employer/PostService';
import { Document, Page, pdfjs } from 'react-pdf';



const ListCV = (props) => {

    const { handleClose, show, dataListCV } = props

    const [listPostCV, setListPostCV] = useState([]);


    useEffect(() => {
        ListCV();
    }, [dataListCV])

    const ListCV = async () => {
        let res = await listCVOfPost(dataListCV.id);
        console.log(res.cv);
        if (res && res.cv) {
            setListPostCV(res.cv);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg"
            >

                <Modal.Header closeButton>

                    <Modal.Title id="example-modal-sizes-title-lg">Danh sách Các CV</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">CV</th>
                                <th scope="col">Mô tả</th>
                                {/* <th scope="col">Trạng thái</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {listPostCV && listPostCV.length > 0 ? (
                                listPostCV.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.JobSeeker.fullname}</td>
                                        <td>
                                            <a href={`https://${item.img}`} download rel='noopener noreferrer'>
                                                {item.img}
                                            </a>
                                        </td>
                                        <td>{item.desc}</td>
                                        {/* <td>Ok</td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Chưa có CV được nộp</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" >
                        Cập nhật
                    </Button> */}
                </Modal.Footer>
            </Modal >

        </>
    )
}

export default ListCV;