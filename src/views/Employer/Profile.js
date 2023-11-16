
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/UserHeader";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { putUpdateNTD, fetchEmployerFromSession, fetchNameCompany } from "services/Employer/EmployerService.js"
const Profile = () => {

  axios.defaults.withCredentials = true;
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [img, setImg] = useState("");
  const [company, setCompany] = useState("");
  const [id, setID] = useState("");



  axios.defaults.withCredentials = true;

  useEffect(() => {
    getNTD();
  }, []);

  const getNTD = async () => {
    const res = await fetchEmployerFromSession();
    const res2 = await fetchNameCompany();
    console.log("check find company: ", res, res2);
    if (res && res2) {
      setID(res.id);
      setFullname(res.fullname);
      setPhone(res.phone);
      setEmail(res.email);
      setPosition(res.position);
      setImg(res.img);
      setCompany(res2.name);
    }
  }
  // const getNameCompany = async () => {
  //   const res = await fetchNameCompany();
  //   console.log("check name company", res);
  //   // if(res){
  //   //   setCompany(res.c)
  //   // }
  // }


  const handleEditEmployer = async () => {
    let res = await putUpdateNTD(id, fullname, phone, position, img);
    console.log("chech edit: ", res);
    if (res) {
      //success
      toast.success("Thông tin của bạn đã cập nhật thành công!!!");
    }
    else {
      //error
      toast.error("Có lỗi xảy ra!!!");
    }
  }


  return (
    <>
      <Header />
      <br></br><br></br><br></br>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    {img !== "user.png" && img !== null ?
                      < img className='rounded-circle'
                        src={`http://localhost:8080/uploads/${img}`}
                      />
                      :
                      <img className="rounded-circle"

                        src={`https://api.freelogodesign.org/assets/thumb/logo/ad95beb06c4e4958a08bf8ca8a278bad_400.png`}
                      />
                    }
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              </CardHeader>
              <CardBody className="pt-0 pt-md-4 bg-white">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {fullname}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Công ty: {company}
                  </div>
                  <hr className="my-4" />
                  <div>
                    <i className="ni education_hat mr-2" />
                    Chức vụ: {position}
                  </div>
                  <div >
                    <i className="ni education_hat mr-2" />
                    Số điện thoại liên hệ : {phone}
                  </div>



                </div>
              </CardBody>
            </Card>
          </Col>


          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Cập nhật thông tin cá nhân</h3>
                  </Col>
                  <Col className="text-right" xs="4">

                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="bg-white">
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin của bạn
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Họ tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={fullname}
                            onChange={(event) => setFullname(event.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Số điện thoại
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Chức vụ
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={position}
                            onChange={(event) => setPosition(event.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Hình ảnh
                          </label>
                          <Input
                            className="form-control-alternative"
                            onChange={(event) => setImg(event.target.files[0])}
                            type="file"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <Button className="btn btn-info" onClick={() => handleEditEmployer()}>Cập nhật</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
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
};

export default Profile;
