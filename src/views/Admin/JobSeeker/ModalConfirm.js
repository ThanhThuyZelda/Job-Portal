
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteJobSeeker } from 'services/Admin/JobSeekerService';


const ModalConfirm = (props) => {

    const { handleClose, show, dataJobSeekerDelete, handleDeleteJobSeekerFromModal } = props
    const confirmDeleate = async () => {
        let res = await deleteJobSeeker(dataJobSeekerDelete.id);
        if (res) {
            toast.success("Xóa thành công!!");
            handleClose();
            handleDeleteJobSeekerFromModal(dataJobSeekerDelete);

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
                        Bạn chắc chắn muốn xóa nhà tuyển dụng <b className='text-danger'>{dataJobSeekerDelete.fullname}</b> có
                        email là <b className='text-danger'>{dataJobSeekerDelete.email}</b> không?
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