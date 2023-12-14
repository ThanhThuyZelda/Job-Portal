import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { updateCVExp } from '../services/Homepage/PostService.js';
import { useNavigate } from "react-router-dom";
import {
    Container,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Card,
    Label
} from "reactstrap";
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const getCurrentDate = () => moment().format('YYYY-MM-DD');




const ModalUpdateCVExp = (props) => {
    const { handleClose, show, dataExp } = props;
    const [position, setPosition] = useState();
    const [company, setCompany] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [present, setPresent] = useState();
    const [des, setDes] = useState();

    const xuLyThayDoiCheckbox = (event) => {
        if (event.target.checked) {
            setPresent('Hiện tại');
            setEnd(event.target.checked ? '' : end);
        } else {
            setPresent('');
        }
    };

    const handleUpdateCVExp = async () => {
        if (start >= getCurrentDate()) {
            toast.error('Ngày bắt đầu không được lớn hơn ngày kết thúc và ngày hiện tại!!!')
        }
        else {
            let res = await updateCVExp(dataExp.id, position, company, start, end, present, des);
            // console.log(res);
            if (res) {
                handleClose();
                toast.success('Chỉnh sửa kinh nghiệm làm việc thành công!!!');

            }
            else {
                toast.error('Có lỗi xảy ra');
            }
        }
    }
    useEffect(() => {
        if (show) {
            setPosition(dataExp.position);
            setCompany(dataExp.company);
            setStart(dataExp.start);
            setEnd(dataExp.end);
            setPresent(dataExp.present);
            setDes(dataExp.des);
        }

    }, [dataExp])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Thêm kinh nghiệm làm việc</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <div className='body-add-new'>

                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Chức vụ</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={position}
                                        onChange={(event) => setPosition(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Công ty</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={company}
                                        onChange={(event) => setCompany(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={present === 'Hiện tại'}
                                        onChange={xuLyThayDoiCheckbox}
                                    />
                                    Tôi đang theo học tại đây
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="6">
                                <Label style={{ fontWeight: "bold" }}>Từ</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="date"
                                        value={start}
                                        onChange={(event) => setStart(event.target.value)}
                                    />
                                </FormGroup>

                            </Col>
                            <Col xs="6">
                                <Label style={{ fontWeight: "bold" }}>Đến</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="date"
                                        value={end}
                                        onChange={(event) => setEnd(event.target.value)}
                                        disabled={present}
                                    />
                                </FormGroup>

                            </Col>
                        </Row>


                        <Label>Mô tả chi tiết</Label>
                        <Row >
                            <Col md="12" style={{ border: '1px solid black' }}>
                                <ReactQuill theme="snow"
                                    value={des}
                                    onChange={(value) => setDes(value)}
                                />
                            </Col>
                        </Row>


                        <br></br>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleUpdateCVExp()}
                    >
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal >
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
    )
}

export default ModalUpdateCVExp;