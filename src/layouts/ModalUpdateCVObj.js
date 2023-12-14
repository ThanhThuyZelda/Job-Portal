import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchCVObj, updateCVObj } from '../services/Homepage/PostService.js';
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

const ModalUpdateCVInfo = (props) => {
    const { handleClose, show } = props;

    const [obj, setObj] = useState();
    const [id, setID] = useState();



    const fetchObj = async () => {
        let res = await fetchCVObj();
        // console.log('check', res);
        if (res) {
            setObj(res.data.obj);
            setID(res.data.id)
        }
    }

    useEffect(() => {
        fetchObj();
    }, [])

    const handleUpdateCVObj = async () => {
        let res = await updateCVObj(id, obj);
        console.log("check", res);
        if (res) {
            toast.success("Bạn đã cập nhật mục tiêu nghề nghiệp thành công!!!");
            handleClose();
        }
        else {
            toast.error("Có lỗi xảy ra!!!");
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

                    <Modal.Title>Mục tiêu nghề nghiệp</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Row>
                            <Col md="10">
                                <Label style={{ fontWeight: "bold" }}>Mục tiêu nghề nghiệp</Label>
                                <FormGroup>
                                    <textarea className="form-control "
                                        rows="8"
                                        cols="12"
                                        value={obj}

                                        onChange={(event) => setObj(event.target.value)}
                                    />
                                </FormGroup>
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
                        onClick={() => handleUpdateCVObj()}
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

export default ModalUpdateCVInfo;