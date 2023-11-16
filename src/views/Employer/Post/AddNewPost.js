
import {
    Container,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Card,
    Label,
    Button
} from "reactstrap";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from "components/Headers/EmployerHeader";
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postCreate, fetchEmployerFromSession } from "services/Employer/PostService.js"

const AddNewPost = (props) => {
    const [headline, setHeadline] = useState("");
    const [salary, setSalary] = useState("");
    const [gender, setGender] = useState("");
    const [require, setRequire] = useState("");
    const [des, setDes] = useState("");
    const [benefit, setBenefit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const [workform, setWorkform] = useState("");
    const [positionID, setPositionID] = useState("");
    const [empID, setEmpID] = useState("");
    const [DeadlineSubmission, setDeadlineSubmission] = useState(() => {
        const currentDate = moment();
        const futureDate = currentDate.add(30, 'days');
        return futureDate.format('YYYY-MM-DD');
    });
    const [status, setStatus] = useState();

    useEffect(() => {
        getNTD();
    }, []);
    const getNTD = async () => {
        const res = await fetchEmployerFromSession();
        if (res) {
            setEmpID(res.fullname);
        }
    }
    const handleSavePost = async () => {
        let res = await postCreate(headline, salary, gender, require, des, benefit, quantity, address, workform, positionID, empID, status, DeadlineSubmission);
        console.log(">>check res: ", res);
        if (res && res.post.id) {
            //success
            // handleClose();
            setHeadline('');
            setSalary('');
            setGender('');
            setRequire('');
            setDes('');
            setBenefit('');
            setQuantity('');
            setAddress('');
            setWorkform('');
            setPositionID('');
            setEmpID('');
            setDeadlineSubmission('');
            setStatus('');
            toast.success("Bài tuyển dụng đã được tạo thành công!!!")
            //     // props.handleUpdateTable({ name: name, id: res.city.id });
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");

        }
    }
    return (
        <>
            <Header />
            <Container className="mt--6" >
                <Row>
                    <Col >
                        <div className="justify-content-left">
                            <h4 className="text-black">Tạo tin tuyển dụng</h4>
                        </div>
                    </Col>
                </Row>
                <br></br><br></br>
                <Form >
                    <Row>
                        <Col md="10">
                            <Label>Tiêu đề</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={headline}
                                    onChange={(event) => setHeadline(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Label>Mức lương</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    placeholder="10Tr/ 1000USD"
                                    value={salary}
                                    onChange={(event) => setSalary(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <Label>Giới tính</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={gender}
                                    onChange={(event) => setGender(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <Label>Số lượng tuyển</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="number"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(event) => setQuantity(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Label>Hình thức làm việc</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    placeholder="Fulltime/Part-time"
                                    value={workform}
                                    onChange={(event) => setWorkform(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <Label>Vị trí</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    placeholder="Fresher"
                                    value={positionID}
                                    onChange={(event) => setPositionID(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <Label>Hạn nộp hồ sơ</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="date"
                                    placeholder="0"
                                    value={DeadlineSubmission}
                                    onChange={(event) => setDeadlineSubmission(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="7">
                            <Label>Địa chỉ làm việc</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <Label>Người đăng</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    disabled
                                    value={empID}
                                // onChange={(event) => setName(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Label>Bạn có muốn bài đăng này hiển thị không ?</Label>
                    <Row>
                        <Col md="10">
                            <input

                                type="radio"
                                value="1"
                                name="status"
                                onChange={(event) => setStatus(event.target.value)}
                            />  Hiển thị
                            <br></br>

                            <input

                                type="radio"
                                value="0"
                                name="status"
                                onChange={(event) => setStatus(event.target.value)}
                            />  Tạm ẩn
                        </Col>
                    </Row>

                    <br></br>
                    <Label>Yêu cầu công việc</Label>
                    <Row >
                        <Col md="10" style={{ border: '1px solid black' }}>
                            <ReactQuill theme="snow"
                                value={require}
                                onChange={(value) => setRequire(value)}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Label>Mô tả chi tiết</Label>
                    <Row >
                        <Col md="10" style={{ border: '1px solid black' }}>

                            <ReactQuill theme="snow"
                                value={des}
                                onChange={(value) => setDes(value)}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Label>Quyền lợi</Label>
                    <Row >
                        <Col md="10" style={{ border: '1px solid black' }}>

                            <ReactQuill theme="snow"
                                value={benefit}
                                onChange={(value) => setBenefit(value)}
                            />
                        </Col>
                    </Row>
                    <br></br>
                    <Button color="warning" type="button" className="left"
                        onClick={() => handleSavePost()}
                    >
                        Đăng tin
                    </Button>
                </Form>
            </Container >

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
}

export default AddNewPost;