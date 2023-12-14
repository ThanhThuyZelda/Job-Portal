import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { fetchDetailPosts } from 'services/Employer/PostService.js';
import moment from 'moment';
import { head } from 'lodash';
import {
    Card,
    CardHeader,
    CardFooter,
    Table,
    Container,
    Row,
    Col,
    CardBody, CardTitle, UncontrolledTooltip
} from "reactstrap";
const ModalDetailPost = (props) => {

    const { handleClose, show, dataDetailPost } = props

    const [headline, setHeadline] = useState("");
    const [salary, setSalary] = useState("");
    const [gender, setGender] = useState("");
    const [require, setRequire] = useState("");
    const [des, setDes] = useState("");
    const [benefit, setBenefit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const [workform, setWorkform] = useState("");
    const [skillID, setSkillID] = useState("");
    const [empID, setEmpID] = useState("");
    const [cities, setCities] = useState([]);
    const [DeadlineSubmission, setDeadlineSubmission] = useState("");

    const [status, setStatus] = useState();


    useEffect(() => {
        if (show) {
            setHeadline(dataDetailPost.headline);
            setSalary(dataDetailPost.salary);
            setGender(dataDetailPost.gender);
            setRequire(dataDetailPost.require);
            setDes(dataDetailPost.des);
            setBenefit(dataDetailPost.benefit);
            setQuantity(dataDetailPost.quantity);
            setAddress(dataDetailPost.address);
            setWorkform(dataDetailPost.workform);
            setSkillID(dataDetailPost.skillID);
            setStatus(dataDetailPost.status);
            setDeadlineSubmission(dataDetailPost.DeadlineSubmission);

        }
    }, [dataDetailPost])


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="example-modal-sizes-title-lg" >
                <Modal.Header closeButton>

                    <Modal.Title>Chi tiết bài tuyển dụng của bạn</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <h6 className='form-label text-blue'> Tiêu đề: </h6>
                            <label> {headline}</label>
                        </div>
                    </div>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <h6 className='form-label text-blue'> Địa chỉ làm việc: </h6>
                            <label> {address}</label>
                        </div>
                    </div>

                    <Row>
                        <Col xs="4">
                            <h6 className='form-label text-blue'>Mức lương: </h6>
                            <span>{salary}</span>
                        </Col>
                        <Col xs="4">
                            <h6 className='form-label text-blue'>Số lượng tuyển: </h6>
                            <span>{quantity} </span>
                        </Col>
                        <Col xs="4">
                            <h6 className='form-label text-blue'>Hình thức làm việc</h6>
                            <span>{workform} </span>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col xs="4">
                            <h6 className='form-label text-blue'>Giới tính: </h6>
                            <span>{gender}</span>
                        </Col>
                        <Col xs="4">
                            <h6 className='form-label text-blue'>Hạn nộp hồ sơ: </h6>
                            <span>
                                {DeadlineSubmission && (
                                    <>
                                        {new Date(DeadlineSubmission).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric",
                                        })}
                                    </>
                                )}
                            </span>
                        </Col>
                        <Col xs="4">
                            <h6 className='form-label text-blue'>Khu vực làm việc </h6>
                            <span>{skillID}</span>
                        </Col>

                    </Row>
                    <br></br>
                    <Row>
                        <Col xs="12">
                            <h6 className='form-label text-blue'>Yêu cầu: </h6>
                            <span dangerouslySetInnerHTML={{ __html: require }}></span>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs="12">
                            <h6 className='form-label text-blue'>Mô tả chi tiết công việc: </h6>
                            <span dangerouslySetInnerHTML={{ __html: des }}></span>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs="12">
                            <h6 className='form-label text-blue'>Quyền lợi: </h6>
                            <span dangerouslySetInnerHTML={{ __html: benefit }}></span>
                        </Col>

                    </Row>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalDetailPost;