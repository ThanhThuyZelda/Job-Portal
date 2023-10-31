import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postCreateCity } from 'services/Admin/CityService';
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {

    const { handleClose, show, handleUpdateTable } = props
    const [name, setName] = useState("");

    const handleSaveCity = async () => {
        let res = await postCreateCity(name);
        console.log(">>check res: ", res);
        if (res && res.city.id) {
            //success
            handleClose();
            setName('');
            toast.success("Thành phố đã được tạo thành công!!!")
            props.handleUpdateTable({ name: name, id: res.city.id });
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

                    <Modal.Title>Thêm thành phố</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <label className='form-label'>Thành phố </label>
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
                    <Button variant="primary" onClick={() => handleSaveCity()}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalAddNew;