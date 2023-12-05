import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from "reactstrap";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { postCreateEmployer } from "services/Employer/LoginService.js";
import { Link, useNavigate } from "react-router-dom";
const Register = (props) => {

    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [address, setAddress] = useState("");
    const [website, setWebsite] = useState("");
    const navigate = useNavigate();


    const handleRegister = async () => {
        let res = await postCreateEmployer(fullname, phone, email, password, position, company, address, website);
        console.log(">>check res: ", res);
        if (res && res.result.id) {
            //success
            setFullname('');
            setPhone('');
            setEmail('');
            setPassword('');
            setCompany('');
            setPosition('');
            setAddress('');
            setWebsite('');
            toast.success("Bạn đã tạo tài khoản nhà tuyển dụng thành công!!! Giờ đây bạn có thể đăng nhập!")
            // navigate("/employer/dang-nhap");
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");

        }
    }

    return (
        <>
            <Col lg="6" md="10" className="center">
                <Card className="shadow border-0">
                    <CardBody className="px-lg-10 py-lg-10">
                        <div className="text-center">
                            <h2 className=" text-danger">Đăng ký</h2>
                        </div>
                        <br></br>
                        <Form role="form" >
                            <h5>Thông tin nhà tuyển dụng</h5>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Họ và tên"
                                            type="email"
                                            // autoComplete="new-email"
                                            value={fullname}
                                            onChange={(event) => setFullname(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Số điện thoại"
                                            type="text"
                                            autoComplete="new-password"
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col >
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Email"
                                            type="email"
                                            // autoComplete="new-email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Password"
                                            type="password"
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col >
                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Chức vụ"
                                            type="text"
                                            // autoComplete="new-email"
                                            value={position}
                                            onChange={(event) => setPosition(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                {/* <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Tên công ty"
                                            type="text"
                                            // autoComplete="new-email"
                                            value={company}
                                            onChange={(event) => setCompany(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col> */}
                            </Row>

                            <h5>Thông tin công ty</h5>
                            <Row>
                                <Col xs="8">
                                    <FormGroup>
                                        <Input
                                            placeholder="Tên công ty"
                                            type="text"
                                            // autoComplete="new-email"
                                            value={company}
                                            onChange={(event) => setCompany(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col>


                            </Row>
                            <Row>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Địa chỉ làm việc"
                                            type="text"
                                            // autoComplete="new-email"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs="6">
                                    <FormGroup>
                                        <Input
                                            placeholder="Website"
                                            type="text"
                                            // autoComplete="new-email"
                                            value={website}
                                            onChange={(event) => setWebsite(event.target.value)}
                                        />
                                    </FormGroup>
                                </Col>


                            </Row>


                            <div className="text-center">
                                <Button className="mt-4" color="primary" type="button"
                                    onClick={() => handleRegister()}
                                >Đăng ký
                                </Button>
                            </div>
                            <br></br>
                            <span className="text-black text-center">Bạn đã có tài khoản!!! Quay lại trang <Link to="/employer/dang-nhap">Đăng nhập</Link> </span>


                        </Form>
                    </CardBody>
                </Card>
            </Col >
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

export default Register;

