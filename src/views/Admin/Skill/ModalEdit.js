import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { putUpdateSkill } from 'services/Admin/SkillService';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



const ModalEditSkill = (props) => {

    const { handleClose, show, dataSkillEdit, handleUpdateTable } = props
    const [name, setName] = useState("");

    const handleEditSkill = async () => {
        let res = await putUpdateSkill(dataSkillEdit.id, name)

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
            setName(dataSkillEdit.name)
        }

    }, [dataSkillEdit])

    // console.log(">> check props: ", dataCityEdit);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>

                    <Modal.Title>Chỉnh sửa kỹ năng</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className='mb-3'>
                            <label className='form-label'>Kỹ năng</label>
                            <input type="text" className="form-control"
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
                    <Button variant="primary" onClick={() => handleEditSkill()}>
                        Cập nhập
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalEditSkill;