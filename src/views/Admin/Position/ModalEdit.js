import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { putUpdatePosition } from 'services/Admin/PositionService';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



const ModalEditPosition = (props) => {

    const { handleClose, show, dataPositionEdit, handleUpdateTable } = props
    const [name, setName] = useState("");

    const handleEditPosition = async () => {
        let res = await putUpdatePosition(dataPositionEdit.id, name)

        // console.log(res.city.name);
        if (res) {
            //success
            handleClose();
            setName('');
            toast.success("Vị trí đã cập nhật thành công!!!")
            props.handleUpdateTable({ name: name });
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");

        }
    }


    useEffect(() => {
        if (show) {
            setName(dataPositionEdit.name)
        }

    }, [dataPositionEdit])

    // console.log(">> check props: ", dataCityEdit);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Chỉnh sửa vị trí</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <label className='form-label'>Vị trí</label>
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
                    <Button variant="primary" onClick={() => handleEditPosition()}>
                        Cập nhập
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalEditPosition;