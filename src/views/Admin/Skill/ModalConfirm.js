import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteSkill } from 'services/Admin/SkillService';


const ModalConfirm = (props) => {

    const { handleClose, show, dataSkillDelete, handleDeleteSkillFromModal } = props
    const confirmDeleate = async () => {
        let res = await deleteSkill(dataSkillDelete.id);
        if (res) {
            toast.success("Xóa thành công!!");
            handleClose();
            handleDeleteSkillFromModal(dataSkillDelete);

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

                    <Modal.Title>Xóa kỹ năng</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Bạn chắc chắn muốn xóa <b className='text-danger'>{dataSkillDelete.name}</b> không? Sau khi xóa dữ liệu sẽ không thể khôi phục lại!!!
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