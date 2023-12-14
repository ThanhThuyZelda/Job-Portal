import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { createCVSkill } from '../services/Homepage/PostService.js';
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

const ModalCreateCVSkill = (props) => {
    const { handleClose, show } = props;
    const [name, setName] = useState();
    const [des, setDes] = useState();



    const handleCreateCVEdu = async () => {

        let res = await createCVSkill(name, des);
        // console.log(res);
        if (res) {
            setName('');
            setDes('');
            handleClose();
            toast.success('Thêm kỹ năng thành công!!!');

        }
        else {
            toast.error('Có lỗi xảy ra');
        }

    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Thêm học vấn</Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <div className='body-add-new'>

                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Tên kỹ năng</Label>
                                <br></br>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Label style={{ fontWeight: "bold" }}>Mô tả chi tiết kỹ năng</Label>
                                <br></br>

                                <textarea
                                    className="form-control "
                                    type="text"
                                    value={des}
                                    cols="4"
                                    onChange={(event) => setDes(event.target.value)}
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
                        onClick={() => handleCreateCVEdu()}
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

export default ModalCreateCVSkill;