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
  Col,
} from "reactstrap";
import { AdminLogin } from "services/Admin/LoginService.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();



  const handleLogin = async () => {
    // alert("hello login!!!");
    if (!email || !password) {
      toast.error("Email/password is required!");
      return;
    }
    let res = await AdminLogin(email, password);
    console.log(">>> check res: ", res);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/admin/index");
    }
    else {
      //error
      if (res && res.status === 401) {
        toast.error(res.data.message);
      }
    }

  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center">
              <h2 className=" text-danger">ĐĂNG NHẬP</h2>
            </div>
            <br></br>
            <Form role="form" >
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button"
                  onClick={() => handleLogin()} >
                  Đăng nhập
                </Button>
              </div>
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
  );
};

export default Register;
