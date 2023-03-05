import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";
import "./paintings-grid.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function PaintingsList() {
    const [paintings, setPaintings] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [paintingToDelete, setPaintingToDelete] = useState(null);

    const handleDelete = paintingId => {
        setPaintingToDelete(paintingId);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await fetch(
                `https://milo-paintings-backend.vercel.app/api/paintings/${paintingToDelete}`,
                {
                    method: "DELETE"
                }
            );
            setDeleteModalOpen(false);
            setPaintingToDelete(null);
            setPaintings(paintings.filter(p => p._id !== paintingToDelete));
        } catch (err) {
            console.log(err);
        }
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setPaintingToDelete(null);
    };
    useEffect(() => {
        async function fetchPaintings() {
            const response = await fetch(
                "https://milo-paintings-backend.vercel.app/api/paintings"
            );
            const data = await response.json();
            setPaintings(data);
        }
        fetchPaintings();
    }, []);

    return (
        <div className="paintings-list-container">
            <Container>
                <h1 className="title mt-4">Lista Milo Pinturas</h1>
                <Row>
                    {paintings.map(painting => (
                        <Col sm="4" key={painting._id}>
                            <Card>
                                <div className="card-buttons">
                                    <button
                                        onClick={() =>
                                            handleDelete(painting._id)
                                        }
                                        className="btn btn-danger btn-sm card-btn-delete"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button className="btn btn-primary btn-sm card-btn-edit">
                                        <FaEdit />
                                    </button>
                                </div>
                                <CardImg
                                    top
                                    width="100%"
                                    src={painting.src}
                                    alt="Card image cap"
                                />
                                <CardBody>
                                    <CardTitle tag="h5">
                                        {painting.title}
                                    </CardTitle>
                                    <CardSubtitle
                                        tag="h6"
                                        className="mb-2 text-muted"
                                    >
                                        {painting.paintingType}
                                    </CardSubtitle>
                                    <CardSubtitle
                                        tag="h6"
                                        className="mb-2 text-muted"
                                    >
                                        $ {painting.price}
                                    </CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Modal isOpen={deleteModalOpen} toggle={cancelDelete}>
                    <ModalHeader toggle={cancelDelete}>
                        Confirmación
                    </ModalHeader>
                    <ModalBody>
                        ¿Está seguro que desea eliminar esta pintura?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            onClick={cancelDelete}
                            outline
                        >
                            Cancelar
                        </Button>{" "}
                        <Button color="danger" onClick={confirmDelete} outline>
                            Eliminar
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </div>
    );
}

export default PaintingsList;
