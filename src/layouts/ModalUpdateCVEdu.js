import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { updateCVEdu } from '../services/Homepage/PostService.js';
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
const getCurrentDate = () => moment().format('YYYY-MM-DD');




const ModalCreateCVEdu = (props) => {
    const { handleClose, show, dataEdu } = props;
    const [school, setSchool] = useState();
    const [major, setMajor] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [present, setPresent] = useState();
    const [more, setMore] = useState();

    const xuLyThayDoiCheckbox = (event) => {
        if (event.target.checked) {
            setPresent('Hiện tại');
            setEnd(event.target.checked ? '' : end);
        } else {
            setPresent('');
        }
    };

    const handleUpdateCVEdu = async () => {
        if (start >= getCurrentDate()) {
            toast.error('Ngày bắt đầu không được lớn hơn ngày kết thúc và ngày hiện tại!!!')
        }
        else {
            let res = await updateCVEdu(dataEdu.id, school, major, start, end, present, more);
            // console.log(res);
            if (res) {
                handleClose();
                toast.success('Chỉnh sửa học vấn thành công!!!');

            }
            else {
                toast.error('Có lỗi xảy ra');
            }
        }
    }
    useEffect(() => {
        if (show) {
            setSchool(dataEdu.school);
            setMajor(dataEdu.major);
            setStart(dataEdu.start);
            setEnd(dataEdu.end);
            setPresent(dataEdu.present);
            setMore(dataEdu.more);
        }

    }, [dataEdu])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Chỉnh sửa học vấn</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <div className='body-add-new'>

                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Trường học</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={school}
                                        onChange={(event) => setSchool(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Ngành học</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={major}
                                        onChange={(event) => setMajor(event.target.value)}
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
                                        value={moment(start).format('YYYY-MM-DD')}
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
                                        value={moment(end).format('YYYY-MM-DD')}
                                        onChange={(event) => setEnd(event.target.value)}
                                        disabled={present}
                                    />
                                </FormGroup>

                            </Col>
                        </Row>


                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Mô tả thêm</Label>
                                <br></br>

                                <textarea
                                    className="form-control "
                                    type="text"
                                    value={more}
                                    cols="4"
                                    onChange={(event) => setMore(event.target.value)}
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
                        onClick={() => handleUpdateCVEdu()}
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

export default ModalCreateCVEdu;