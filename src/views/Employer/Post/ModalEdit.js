import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { putUpdatePost, fetchAllCity } from 'services/Employer/PostService.js';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { head } from 'lodash';
import moment from 'moment';
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const ModalEditCity = (props) => {

    const { handleClose, show, dataPostEdit, handleUpdateTable } = props
    const [headline, setHeadline] = useState("");
    const [salary, setSalary] = useState("");
    const [gender, setGender] = useState("");
    const [require, setRequire] = useState("");
    const [des, setDes] = useState("");
    const [benefit, setBenefit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [address, setAddress] = useState("");
    const [workform, setWorkform] = useState("");
    const [empID, setEmpID] = useState("");
    const [compID, setCompID] = useState("");
    const [DeadlineSubmission, setDeadlineSubmission] = useState("");
    const [status, setStatus] = useState('');
    const [cities, setCities] = useState([]);
    const [skillID, setSkillID] = useState("");

    // display list city
    const getCities = async () => {
        let res = await fetchAllCity();
        // console.log(">>> Check new city:", res.data.rows);
        if (res && res.data.rows) {
            setCities(res.data.rows);
        }
    }
    const handleEditCity = async () => {
        let res = await putUpdatePost(dataPostEdit.id, headline, salary, gender, require, des, benefit, quantity, address, workform, skillID, empID, compID, status, DeadlineSubmission)

        console.log("check:", res);
        if (res) {
            //success
            handleClose();
            // setName('');
            toast.success("Thành phố đã cập nhật thành công!!!")
            // props.handleUpdateTable({ name: name });
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");

        }
    }


    useEffect(() => {
        if (show) {
            setHeadline(dataPostEdit.headline);
            setSalary(dataPostEdit.salary);
            setGender(dataPostEdit.gender);
            setRequire(dataPostEdit.require);
            setDes(dataPostEdit.des);
            setBenefit(dataPostEdit.benefit);
            setQuantity(dataPostEdit.quantity);
            setAddress(dataPostEdit.address);
            setWorkform(dataPostEdit.workform);
            setDeadlineSubmission(dataPostEdit.DeadlineSubmission);
            setStatus(dataPostEdit.status);
            setSkillID(dataPostEdit.skillID);
            getCities();
        }

    }, [dataPostEdit])

    // console.log(">> check props: ", dataCityEdit);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Chỉnh sửa thành phố</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        {/* <div className='mb-3'>
                            <label className='form-label'>Tiêu đề </label>
                            <input type="text" className="form-control fullname"
                                value={headline}
                                onChange={(event) => setHeadline(event.target.value)}
                            />
                        </div> */}


                        <Row>
                            <Col md="12">
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
                            <Col md="6">
                                <Label>Mức lương</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="text"
                                        placeholder="10 triệu/ 1000 USD/ Thỏa thuận"
                                        value={salary}
                                        onChange={(event) => setSalary(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6">
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

                        </Row>
                        <Row>
                            <Col md="6">
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
                            <Col md="6">
                                <Label>Hình thức làm việc</Label>
                                <FormGroup>
                                    {/* <Input
                                        className="form-control-alternative"
                                        type="text"
                                        placeholder="Fulltime/Part-time"
                                        value={workform}
                                        onChange={(event) => setWorkform(event.target.value)}
                                    /> */}
                                    <select
                                        id="exampleSelect"
                                        value={workform}
                                        onChange={(event) => setWorkform(event.target.value)}
                                        className="form-control-alternative"
                                    >
                                        <option >Chọn hình thức làm việc</option>
                                        <option value="Fulltime">Fulltime</option>
                                        <option value="Parttime">Parttime</option>

                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <Label>Hạn nộp hồ sơ</Label>
                                <FormGroup>
                                    <Input
                                        className="form-control-alternative"
                                        type="date"
                                        // placeholder="0"
                                        value={moment(DeadlineSubmission).format('YYYY-MM-DD')}
                                        onChange={(event) => setDeadlineSubmission(event.target.value)}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="7">
                                <Label>Khu vực làm việc</Label>
                                <FormGroup>
                                    <select
                                        id="exampleSelect"
                                        value={skillID}
                                        onChange={(event) => setSkillID(event.target.value)}
                                        className="form-control-alternative"
                                    >
                                        <option value=""> --- Chọn khu vực làm việc ---</option>
                                        {cities.map((city) => (

                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}

                                    </select>

                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12">
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

                        </Row>
                        <Label>Bạn có muốn bài đăng này hiển thị không ?</Label>
                        <Row>
                            <Col md="12">
                                <input

                                    type="radio"
                                    value="1"
                                    name="status"
                                    // checked
                                    checked={status === 1}
                                    onChange={(event) => { setStatus(event.target.value) }}

                                />  Hiển thị
                                <br></br>
                                <input

                                    type="radio"
                                    value="0"
                                    name="status"
                                    checked={status === 0}
                                    onChange={(event) => setStatus(event.target.value)}

                                />  Tạm ẩn
                            </Col>
                        </Row>

                        <br></br>
                        <Label>Yêu cầu công việc</Label>
                        <Row >
                            <Col md="12" >
                                <ReactQuill theme="snow"
                                    value={require}
                                    onChange={(value) => setRequire(value)}
                                />
                            </Col>
                        </Row>
                        <br></br>
                        <Label>Mô tả chi tiết</Label>
                        <Row >
                            <Col md="12" >

                                <ReactQuill theme="snow"
                                    value={des}
                                    onChange={(value) => setDes(value)}
                                />
                            </Col>
                        </Row>
                        <br></br>
                        <Label>Quyền lợi</Label>
                        <Row >
                            <Col md="12" >

                                <ReactQuill theme="snow"
                                    value={benefit}
                                    onChange={(value) => setBenefit(value)}
                                />
                            </Col>
                        </Row>
                        <br></br>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleEditCity()}>
                        Cập nhập
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalEditCity;