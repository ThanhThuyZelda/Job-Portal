import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deletePost } from 'services/Employer/PostService';

const ModalConfirm = (props) => {

    const { handleClose, show, dataPostDelete } = props
    const confirmDeleate = async () => {
        let res = await deletePost(dataPostDelete.id);
        if (res) {
            toast.success("Xóa thành công!!");
            handleClose();
        }
        else {
            toast.error("Có lỗi xảy ra");
        }
        console.log(">> check res1: ", res)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Xóa thành phố</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Bạn chắc chắn muốn xóa <b className='text-danger'>{dataPostDelete.headline}</b> không? Sau khi xóa dữ liệu sẽ không thể khôi phục lại!!!
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