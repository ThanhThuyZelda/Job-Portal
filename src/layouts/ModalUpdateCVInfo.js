import { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchCVInfor, updateCVInfor } from '../services/Homepage/PostService.js';
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
import axios from "axios";
import moment from 'moment';
import { set } from 'lodash';




const ModalUpdateCVInfo = (props) => {
    const { handleClose, show } = props;

    const [fullNameSession, setFullNameSession] = useState();
    const [emailSession, setEmailSession] = useState();
    const [imgSession, setImgSession] = useState();
    const [fullnameInfor, setFullnameInfor] = useState();
    const [imgInfor, setImgInfor] = useState();
    const [emailInfor, setEmailInfor] = useState();
    const [position, setPosition] = useState();
    const [gender, setGender] = useState();
    const [phone, setPhone] = useState();
    const [link, setLink] = useState();
    const [address, setAdress] = useState();
    const [birthday, setBirthday] = useState();
    const [id, setID] = useState();
    const getCurrentDate = () => moment().format('YYYY-MM-DD');
    const fileRef = useRef(null);


    const navigate = useNavigate();
    //Lay id nguoi tim viec
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/nguoi-tim-viec/home/session')
            .then(res => {

                if (res.data.loggedIn) {
                    setFullNameSession(res.data.jobseeker.fullname);
                    setEmailSession(res.data.jobseeker.email);
                    setImgSession(res.data.jobseeker.img);
                }
                else {
                    toast.error("Phiên làm việc đã hết hạn. Bạn cần đăng nhập lại!!!");
                    navigate('/nguoi-tim-viec/dang-nhap');
                }
            })
            .catch(err => console.log(err))
    }, [])


    const fetchInfor = async () => {
        let res = await fetchCVInfor();
        // console.log('Infor', res);
        if (res && res.data) {
            // setInfor(res.data);
            setFullnameInfor(res.data.fullname);
            setImgInfor(res.data.img);
            setEmailInfor(res.data.email);
            setPosition(res.data.position);
            setGender(res.data.gender);
            setPhone(res.data.phone);
            setLink(res.data.link);
            setAdress(res.data.address);
            setBirthday(res.data.birthday);
            setID(res.data.id);
        }
    }
    useEffect(() => {
        fetchInfor();
    }, [])

    const handleUpdateInfoCV = async () => {
        let res = await updateCVInfor(id, imgInfor, fullnameInfor, emailInfor, position, gender, phone, link, address, birthday);
        console.log(res);
        if (res) {
            toast.success("Bạn đã cập nhật thông tin cá nhân thành công!!!");
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

                    <Modal.Title>Thông tin cá nhân</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Row>
                            <Col md="12">
                                <Label>Ảnh đại diện</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="file"
                                        // value={imgInfor}
                                        onChange={(event) => setImgInfor(event.target.files[0])}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12">
                                <Label>Họ và tên</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={fullnameInfor ? fullnameInfor : fullNameSession}
                                        onChange={(event) => setFullnameInfor(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Label>Địa chỉ email</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={emailInfor ? emailInfor : emailSession}
                                        onChange={(event) => setEmailInfor(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8">
                                <Label>Chức danh</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={position}
                                        onChange={(event) => setPosition(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <Label>Số điện thoại</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md="6">
                                <Label>Ngày sinh</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="date"
                                        placeholder="0"
                                        value={moment(birthday).format('YYYY-MM-DD')}
                                        onChange={(event) => setBirthday(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <Label>Giới tính</Label>
                                <FormGroup>
                                    <select
                                        id="exampleSelect"
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                        className="form-control-alternative"
                                    >
                                        <option >Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Label>Địa chỉ</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        value={address}
                                        onChange={(event) => setAdress(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Label>Link cá nhân</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        placeholder="Link cá nhân (Github, Facebook,...) "
                                        value={link}
                                        onChange={(event) => setLink(event.target.value)}
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
                        onClick={() => handleUpdateInfoCV()}
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