import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postCreatePosition } from 'services/Admin/PositionService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {

    const { handleClose, show, handleUpdateTable } = props
    const [name, setName] = useState("");

    const handleSavePosition = async () => {
        let res = await postCreatePosition(name);
        // console.log(">>check res: ", res);
        if (res && res.position.id) {
            //success
            handleClose();
            setName('');
            toast.success("Vị trí đã được tạo thành công!!!")
            props.handleUpdateTable({ name: name, id: res.position.id });
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

                    <Modal.Title>Thêm vị trí</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <label className='form-label'>Vị trí </label>
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
                    <Button variant="primary" onClick={() => handleSavePosition()}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalAddNew;