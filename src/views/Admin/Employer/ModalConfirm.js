import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteEmployer } from 'services/Admin/EmployerService';


const ModalConfirm = (props) => {

    const { handleClose, show, dataEmployerDelete, handleDeleteEmployerFromModal } = props
    const confirmDeleate = async () => {
        let res = await deleteEmployer(dataEmployerDelete.id);
        if (res) {
            toast.success("Xóa thành công!!");
            handleClose();
            handleDeleteEmployerFromModal(dataEmployerDelete);

        }
        else {
            toast.error("Có lỗi xảy ra");
        }
        console.log(">> check res: ", res)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Xóa nhà tuyển dụng</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Bạn chắc chắn muốn xóa nhà tuyển dụng <b className='text-danger'>{dataEmployerDelete.fullname}</b> có
                        email là <b className='text-danger'>{dataEmployerDelete.email}</b> không?
                        <br></br>
                        <div className='text-warning'>Lưu ý: </div>Sau khi xóa dữ liệu sẽ không thể khôi phục lại!!!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => confirmDeleate()}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalConfirm;