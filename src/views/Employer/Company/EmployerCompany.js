import {
    Container,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Card,
    Label,
    Button
} from "reactstrap";
import Header from "components/Headers/EmployerHeader";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { fetchCompanyFromSession, putUpdateCompany } from "services/Employer/CompanyService.js"
import { ToastContainer, toast } from 'react-toastify';

const Forms = (props) => {
    // const [dataCompanyEdit, setDataCompanyEdit] = useState({});
    const [name, setName] = useState("");
    const [id, setID] = useState("");
    const [logo, setLogo] = useState("");
    const [address, setAddress] = useState("");
    const [worktime, setWorktime] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [scale, setScale] = useState("");
    const [skill, setSkill] = useState("");


    axios.defaults.withCredentials = true;

    useEffect(() => {
        getCompany();
    }, []);

    const getCompany = async () => {
        const res = await fetchCompanyFromSession();
        // console.log("check find company: ", res);
        if (res) {
            setID(res.id);
            setName(res.name);
            setLogo(res.logo);
            setAddress(res.address);
            setWorktime(res.worktime);
            setCountry(res.country);
            setDescription(res.description);
            setWebsite(res.website);
            setScale(res.scale);
            setSkill(res.skill);

        }
    }
    const [compInfo, setCompInfo] = useState({
        file: [],
        filepreview: null
    });

    const handleInputChange = (event) => {
        setCompInfo({
            ...compInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });
    }
    const handleEditCompany = async () => {
        let res = await putUpdateCompany(id, name, logo, address, worktime, country, description, website, scale, skill);
        // console.log(res);
        if (res) {
            //success
            toast.success("Thông tin công ty đã cập nhật thành công!!!");
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");
        }
    }
    const fileRef = useRef(null);


    return (
        <>
            <Header />
            <Container className="mt--6" >

                <Row className="justify-content-left text-center">
                    {/* className="order-lg-2" */}
                    <Col lg="3">
                        <div className="card-profile-image">
                            {compInfo.filepreview !== null ?
                                <img className="previewimg" src={compInfo.filepreview} alt="UploadImage" />
                                : null}


                            {logo !== "user.png" && logo !== null ?
                                < img className='rounded-circle' onClick={() => fileRef.current.click()}
                                    src={`http://localhost:8080/uploads/${logo}`}
                                />

                                :
                                <img className="rounded-circle"
                                    onClick={() => fileRef.current.click()}
                                    src={`https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`}
                                />
                            }
                        </div>
                    </Col>
                </Row>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                <Row>
                    <Col lg="3" className="text-center text-red ">
                        <input type="file"
                            // setLogo(event.target.files[0])
                            onChange={handleInputChange}
                            ref={fileRef} style={{ display: "none" }} />

                        <Label className="text-color" onClick={() => fileRef.current.click()}>Đổi logo</Label>

                    </Col>
                </Row>
                <br></br>
                <Form >
                    <Row>
                        <Col >
                            <div className="justify-content-left">
                                <h4 className="text-black">Cập nhật thông tin công ty</h4>
                            </div>
                        </Col>
                    </Row>
                    <br></br>


                    <Row>
                        <Col md="5">
                            <Label>Tên công ty</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md="5">
                            <Label>Địa chỉ</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3">
                            <Label>Thời gian làm việc</Label>
                            <FormGroup>

                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={worktime}
                                    onChange={(event) => setWorktime(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <Label>Quốc Gia</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <Label>Quy mô</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={scale}
                                    onChange={(event) => setScale(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="5">

                            <Label>Ngôn ngữ</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={skill}
                                    onChange={(event) => setSkill(event.target.value)}
                                />
                            </FormGroup>
                        </Col>

                        <Col md="5">
                            <Label>Website</Label>
                            <FormGroup>
                                <Input
                                    className="form-control-alternative"
                                    type="text"
                                    value={website}
                                    onChange={(event) => setWebsite(event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Label>Mô tả chi tiết</Label>
                            <FormGroup>
                                <textarea
                                    className="form-control-alternative"
                                    type="text"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Button color="warning" type="button" className="left" onClick={() => handleEditCompany()}>
                        Cập nhật
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

    )
}
export default Forms;