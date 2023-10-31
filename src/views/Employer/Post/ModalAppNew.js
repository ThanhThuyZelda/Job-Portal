import { Row, Col } from 'reactstrap';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postCreate } from 'services/Employer/PostService.js';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {

    const { handleClose, show, handleUpdateTable } = props
    const [headline, setHeadline] = useState("");
    const [salary, setSalary] = useState("");
    const [gender, setGender] = useState("");
    const [require, setRequire] = useState("");
    const [des, setDes] = useState("");
    const [address, setAddress] = useState("");
    const [emp, setEmp] = useState("");

    const handleSavePost = async () => {
        let res = await postCreate(headline, salary, gender, require, des, address, emp);
        console.log(">>check res: ", res);
        if (res && res.post.id) {
            //success
            handleClose();
            setHeadline('');
            setSalary('');
            setGender('');
            setRequire('');
            setDes('');
            setAddress('');
            setEmp('');
            toast.success("Bài tuyển dụng đã được tạo thành công!!!")
            // props.handleUpdateTable({ name: name, id: res.city.id });
        }
        else {
            //error
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

                    <Modal.Title>Thêm nhà tuyển dụng</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs="12">
                            <div className='body-add-new'>
                                <div className='mb-3'>
                                    <label className='form-label'>Tiêu đề</label>
                                    <input type="text" className="form-control fullname"
                                        value={headline}
                                        onChange={(event) => setHeadline(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs="7">
                            <div className='body-add-new'>
                                <div className='mb-3'>
                                    <label className='form-label'>Mức lương</label>
                                    <input type="text" className="form-control fullname"
                                        value={salary}
                                        onChange={(event) => setSalary(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xs="5">
                            <div className='body-add-new'>
                                <div className='mb-3'>
                                    <label className='form-label'>Giới tính</label>
                                    <input type="text" className="form-control fullname"
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <div className='body-add-new'>
                                <div className='mb-3'>
                                    <label className='form-label'>Yêu cầu</label>
                                    <textarea type="text" className="form-control fullname"
                                        value={require}
                                        onChange={(event) => setRequire(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <div className='body-add-new'>
                                <div className='mb-3'>
                                    <label className='form-label'>Mô tả thêm</label>
                                    <textarea type="text" className="form-control fullname"
                                        value={des}
                                        onChange={(event) => setDes(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <div className='body-add-new'>
                                <div className='mb-3'>
                                    <label className='form-label'>Địa chỉ làm việc</label>
                                    <input type="text" className="form-control fullname"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSavePost()}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalAddNew;