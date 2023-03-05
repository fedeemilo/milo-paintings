import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const DeleteModal = ({ isOpen, confirmDelete, cancelDelete }) => {
    return (
        <Modal isOpen={isOpen} toggle={cancelDelete}>
            <ModalHeader toggle={cancelDelete}>Confirmación</ModalHeader>
            <ModalBody>¿Está seguro que desea eliminar esta pintura?</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={cancelDelete} outline>
                    Cancelar
                </Button>{" "}
                <Button color="danger" onClick={confirmDelete} outline>
                    Eliminar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteModal;
