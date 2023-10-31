import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postCreateSkill } from 'services/Admin/SkillService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {

    const { handleClose, show, handleUpdateTable } = props
    const [name, setName] = useState("");

    const handleSaveSkill = async () => {
        let res = await postCreateSkill(name);
        // console.log(">>check res: ", res);
        if (res && res.skill.id) {
            //success
            handleClose();
            setName('');
            toast.success("Kỹ năng đã được tạo thành công!!!")
            props.handleUpdateTable({ name: name, id: res.skill.id });
        }
        else {
            //error
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

                    <Modal.Title>Thêm kỹ năng</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <label className='form-label'>Kỹ năng</label>
                            <input type="text" className="form-control fullname"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveSkill()}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalAddNew;