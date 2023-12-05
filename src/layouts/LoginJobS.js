import Header from "components/Headers/JobSeeker.js"
import Footer from "components/Footers/JobSeeker.js"
import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { LoginJS } from '../services/Homepage/PostService.js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {
        // alert("hello login!!!");
        if (!email || !password) {
            toast.error("Email/password is required!");
            return;
        }
        let res = await LoginJS(email, password);
        console.log(">>> check res: ", res);
        if (res && res.token) {
            localStorage.setItem("token", res.token);
            navigate("/trang-chu");
        }
        else {
            //error
            // if (res && res.status === 401) {
            //   toast.error(res.data.message);
            // }
            navigate("/nguoi-tim-viec/dang-nhap");
        }
    }

    return (
        <>
            <Header />
            <MDBContainer fluid className="p-3 my-5 h-custom">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <div className="d-flex flex-row align-items-center justify-content-center">

                            <h1 className="lead fw-normal mb-0 me-5"
                                style={{ fontSize: "30px", fontWeight: "bold", color: "blue" }}>
                                ĐĂNG NHẬP</h1>



                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            {/* <p className="text-center fw-bold mx-3 mb-0">Or</p> */}
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg'
                            type='email' size="lg"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)} />

                        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg'
                            type='password' size="lg"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <div className="d-flex justify-content-between mb-4">
                            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}

                        </div>

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'
                                onClick={() => handleLogin()}
                            >Đăng nhập</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Bạn chưa có tài khoản? <a href="/nguoi-tim-viec/dang-ky" className="link-danger">Đăng ký</a></p>
                        </div>

                    </MDBCol>

                </MDBRow>


            </MDBContainer>
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

export default Login;