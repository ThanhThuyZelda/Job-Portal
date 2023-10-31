import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { putUpdateCity } from 'services/Admin/CityService';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



const ModalEditCity = (props) => {

    const { handleClose, show, dataCityEdit, handleUpdateTable } = props
    const [name, setName] = useState("");

    const handleEditCity = async () => {
        let res = await putUpdateCity(dataCityEdit.id, name)

        // console.log(res.city.name);
        if (res) {
            //success
            handleClose();
            setName('');
            toast.success("Thành phố đã cập nhật thành công!!!")
            props.handleUpdateTable({ name: name });
        }
        else {
            //error
            toast.error("Có lỗi xảy ra!!!");

        }
    }


    useEffect(() => {
        if (show) {
            setName(dataCityEdit.name)
        }

    }, [dataCityEdit])

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
                    <Button variant="primary" onClick={() => handleEditCity()}>
                        Cập nhập
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalEditCity;