import Header from "components/Headers/JobSeeker.js"
import Footer from "components/Footers/JobSeeker.js";
import Chatbot from "./Chatbot";
import React from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { RegisterJS } from "../services/Homepage/PostService";


const Register = () => {

    const [fullname, setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleRegister = async () => {
        let res = await RegisterJS(fullname, email, password);
        console.log(">>check res: ", res);
        if (res) {
            //success
            setFullname('');
            setEmail('');
            setPassword('');
            toast.success("Bạn đã tạo tài khoản người tìm việc thành công!!! Giờ đây bạn có thể đăng nhập!")
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");
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
                                ĐĂNG KÝ</h1>
                        </div>

                        <MDBInput wrapperClass='mb-4' label='Họ tên' id='formControlLg'
                            type='text' size="lg"
                            value={fullname}
                            onChange={(event) => setFullname(event.target.value)} />

                        <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg'
                            type='email' size="lg"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <MDBInput wrapperClass='mb-4' label='Password'
                            id='formControlLg' type='password' size="lg"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="d-flex justify-content-between mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Bạn chấp nhận điều khoản và chính sách của chúng tối' />

                        </div>

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" size='lg'
                                onClick={() => handleRegister()}
                            > Đăng ký</MDBBtn>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Bạn đã có tài khoản? <a href="/nguoi-tim-viec/dang-nhap" className="link-danger">Đăng nhập</a></p>
                        </div>

                    </MDBCol>

                </MDBRow>


            </MDBContainer >
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
            <Chatbot />
            <Footer />
        </>
    );
}

export default Register;