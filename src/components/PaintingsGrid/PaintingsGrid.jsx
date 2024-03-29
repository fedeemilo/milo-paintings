import React, { useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardBody,
    Button
} from 'reactstrap'
import './paintings-grid.css'
import { FaEdit, FaTrash } from 'react-icons/fa'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import { URL_API } from '../../constants/urls'
import { useStateContext } from '../../context/ContextProvider'
import { RxUpdate } from 'react-icons/rx'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom'

function PaintingsList() {
    const { paintings, setPaintings, updatePaintings, frameColor } = useStateContext()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [paintingToDelete, setPaintingToDelete] = useState(null)
    const [paintingToEdit, setPaintingToEdit] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        paintingType: '',
        price: '',
        src: ''
    })

    const navigate = useNavigate()

    const goToPaintingForm = () => {
        navigate('/painting-form')
    }

    const handleDelete = paintingId => {
        setPaintingToDelete(paintingId)
        setDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        try {
            await fetch(`${URL_API}/${paintingToDelete}`, {
                method: 'DELETE'
            })
            setDeleteModalOpen(false)
            setPaintingToDelete(null)
            setPaintings(paintings.filter(p => p._id !== paintingToDelete))
        } catch (err) {
            console.log(err)
        }
    }

    const cancelDelete = () => {
        setDeleteModalOpen(false)
        setPaintingToDelete(null)
    }


    const handleEdit = painting => {
        setPaintingToEdit(painting)
        setFormData({
            title: painting.title,
            paintingType: painting.paintingType,
            price: painting.price,
            src: painting.src
        })
        setEditModalOpen(true)
    }

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            await fetch(`${URL_API}/${paintingToEdit._id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setEditModalOpen(false)
            setPaintingToEdit(null)
            setFormData({
                title: '',
                paintingType: '',
                price: '',
                src: ''
            })
            const response = await fetch(URL_API)
            const paintingsData = await response.json()
            setPaintings(paintingsData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (paintingToEdit) {
            setFormData({
                title: paintingToEdit.title,
                paintingType: paintingToEdit.paintingType,
                price: paintingToEdit.price,
                src: paintingToEdit.src
            })
        }
    }, [paintingToEdit])

    return (
        <div className="paintings-list-container d-flex flex-column align-items-center">
            <NavBar frameColor={frameColor} />
            <Container className="mt-5">
                <Button
                    outline
                    onClick={goToPaintingForm}
                    style={{ position: 'absolute', top: '10px', left: '10px' }}
                >
                    Cargar Pintura
                </Button>
                <button
                    onClick={updatePaintings}
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                >
                    <div className="d-flex align-items-center fw-bold">
                        <RxUpdate />
                        <p style={{ marginLeft: '5px' }}>Actualizar</p>
                    </div>
                </button>
                <Row>
                    {paintings?.map(painting => (
                        <Col sm="3" key={painting._id}>
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
                                    <button
                                        onClick={() => handleEdit(painting)}
                                        className="btn btn-primary btn-sm card-btn-edit"
                                    >
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
                <DeleteModal
                    isOpen={deleteModalOpen}
                    confirmDelete={confirmDelete}
                    cancelDelete={cancelDelete}
                />
                <EditModal
                    isOpen={editModalOpen}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    closeModal={() => setEditModalOpen(false)}
                />
            </Container>
        </div>
    )
}

export default PaintingsList
