import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

const Apply = (props) => {

    const { handleClose, show, dataApply } = props
    const [postID, setPostID] = useState();
    const [name, setname] = useState();
    const [desc, setDesc] = useState();

    const location = useLocation();
    console.log("check: ", location.state.id);


    useEffect(() => {
        if (show) {
            setPostID(dataApply.postID)
        }

    }, [dataApply])


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
                            // value={name}
                            //     onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary"
                    // onClick={() => handleSaveCity()}
                    >
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default Apply;