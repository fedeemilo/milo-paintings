import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";

const EditModal = ({
    isOpen,
    formData,
    setFormData,
    handleSubmit,
    closeModal
}) => {
    return (
        <Modal isOpen={isOpen} toggle={closeModal}>
            <ModalHeader toggle={closeModal}>Editar pintura</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Título</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="paintingType">Tipo de pintura</Label>
                        <Input
                            type="text"
                            name="paintingType"
                            id="paintingType"
                            value={formData.paintingType}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    paintingType: e.target.value
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Precio</Label>
                        <Input
                            type="text"
                            name="price"
                            id="price"
                            value={formData.price}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value
                                })
                            }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="src">URL de la imagen</Label>
                        <Input
                            type="text"
                            name="src"
                            id="src"
                            value={formData.src}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    src: e.target.value
                                })
                            }
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" outline>
                        Guardar cambios
                    </Button>{" "}
                    <Button color="secondary" onClick={closeModal} outline>
                        Cancelar
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default EditModal;
