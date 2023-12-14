import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { applyCV } from "services/Homepage/PostService.js";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const Apply = (props) => {

    const { handleClose, show, dataApply } = props
    const [postID, setPostID] = useState();
    const [jobseekerID, setJobseekerID] = useState();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [img, setImg] = useState();

    const location = useLocation();
    const navigate = useNavigate();
    // console.log("check: ", location.state.id);

    //Lay id nguoi tim viec
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/nguoi-tim-viec/home/session')
            .then(res => {

                if (res.data.loggedIn) {
                    setJobseekerID(res.data.jobseeker.id);
                    setName(res.data.jobseeker.fullname);
                }
                else {
                    toast.error("Phiên làm việc đã hết hạn. Bạn cần đăng nhập lại!!!");
                    navigate('/nguoi-tim-viec/dang-nhap');
                }
            })
            .catch(err => console.log(err))
    }, [])

    // lay Id post
    useEffect(() => {
        if (show) {
            setPostID(dataApply.id)
            // console.log("post: ", dataApply.id);
        }

    }, [dataApply])

    const handleSaveCV = async () => {
        if (!img) {
            toast.error("Bạn cần upload CV của mình!!")
        }
        else {
            let res = await applyCV(img, desc, jobseekerID, postID);
            console.log(res);
            if (res) {
                handleClose();
                toast.success("Bạn đã nộp CV thành công!!");
            }
            else {
                toast.error("Có lỗi xảy ra!!");
            }
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

                    <Modal.Title>Ứng tuyển</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3' style={{ marginBottom: "30px" }}>
                            <label className='form-label' style={{ fontWeight: "bold", fontSize: "20px" }}>
                                Tên ứng cử viên <span style={{ color: "red" }}>*</span> </label>
                            <input type="text" className="form-control "
                                value={name}
                                onChange={(event) => setJobseekerID(event.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' style={{ fontWeight: "bold", fontSize: "20px" }}>
                                Upload CV của bạn <span style={{ color: "red" }}>*</span> </label>
                            <p>     Hỗ trợ định dạng .doc .docx .pdf</p>
                            <input type="file" className="form-control "
                                value={img}
                                onChange={(event) => setImg(event.target.files[0])}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' style={{ fontWeight: "bold", fontSize: "20px" }}>
                                Thư xin việc <span style={{ color: "grey" }}>(Không bắt buộc)</span></label>
                            <p>Những kỹ năng, dự án hay thành tựu nào chứng tỏ bạn là một ứng viên tiềm năng cho vị trí ứng tuyển này?</p>

                            <textarea className="form-control "
                                rows="6"
                                value={desc}
                                onChange={(event) => setDesc(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleSaveCV()}
                    >
                        Ứng tuyển
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
export default Apply;