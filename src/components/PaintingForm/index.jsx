import { useState, useRef } from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Spinner
} from 'reactstrap'
import { URL_API } from '../../constants/urls'
import { useStateContext } from '../../context/ContextProvider'

import QRCode from 'qrcode.react'
import { toPng } from 'html-to-image'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom'

const CreatePaintingForm = () => {
    const { updatePaintings, frameColor } = useStateContext()
    const [title, setTitle] = useState('')
    const [savedTitle, setSavedTitle] = useState('')
    const [paintingType, setPaintingType] = useState('')
    const [price, setPrice] = useState('')
    const [painting, setPainting] = useState(null)

    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [qrValue, setQrValue] = useState(null)

    const fileInput = useRef(null)
    const qrRef = useRef(null)

    const navigate = useNavigate()

    const goToPaintingsList = () => {
        navigate('/paintings-list')
    }

    const downloadQR = () => {
        if (qrRef.current) {
            toPng(qrRef.current)
                .then(dataUrl => {
                    const link = document.createElement('a')
                    link.download = `${savedTitle}-QR.png`
                    link.href = dataUrl
                    link.click()
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()

        setIsLoading(true)

        const formData = new FormData()
        formData.append('title', title)
        formData.append('paintingType', paintingType)
        formData.append('price', price)
        formData.append('painting', painting)

        try {
            const response = await fetch(URL_API, {
                method: 'POST',
                body: formData
            })
            setIsLoading(false)
            if (!response.ok) {
                handleErrorAlert()
                clearInputs()
                throw new Error('Error creating painting')
            }

            // Set the QR value
            setQrValue(
                `https://milo-paintings.vercel.app/milo-painting/${title}`
            )

            clearInputs()
            handleSuccessAlert()
            updatePaintings()
        } catch (err) {
            console.error(err)
        }
    }

    const clearInputs = () => {
        setTitle('')
        setPaintingType('')
        setPrice('')
        fileInput.current.value = ''
    }

    const handleSuccessAlert = () => {
        setSubmitSuccess(true)

        setTimeout(() => {
            setSubmitSuccess(false)
        }, 5000)
    }

    const handleErrorAlert = () => {
        setSubmitError(true)

        setTimeout(() => {
            setSubmitError(false)
        }, 5000)
    }

    const handleTitleChange = event => {
        setTitle(event.target.value)
        setSavedTitle(event.target.value)
    }

    const handlePaintingTypeChange = event => {
        setPaintingType(event.target.value)
    }

    const handlePriceChange = event => {
        const value = event.target.value
        if (value === '' || /^\d+$/.test(value)) {
            setPrice(value)
        }
    }

    const handlePaintingChange = event => {
        setPainting(event.target.files[0])

        setQrValue(null)
    }

    return (
        <>
            {submitSuccess && (
                <Container className="w-50 mt-4 position-absolute top-0 start-50 translate-middle-x">
                    <Alert color="success">Pintura subida con exito!</Alert>
                </Container>
            )}
            {submitError && (
                <Container className="w-50 mt-4 position-absolute top-0 start-50 translate-middle-x">
                    <Alert color="danger">
                        Error al subir la pintura, intente de nuevo.
                    </Alert>
                </Container>
            )}
            <Container
                className="d-flex flex-column align-items-center justify-content-start mt-3"
                style={{ minHeight: '100vh', paddingTop: '20px' }}
            >
                <Button
                    outline
                    onClick={goToPaintingsList}
                    style={{ position: 'absolute', top: '10px', left: '10px' }}
                >
                    Editar/Borrar Pinturas
                </Button>
                <NavBar frameColor={frameColor} />
                <Container
                    className={
                        'd-flex justify-content-center align-items-center'
                    }
                    style={{ minHeight: '90vh' }}
                >
                    <Row
                        className="bg-light p-3 border rounded w-50 "
                        style={{ position: 'relative', bottom: '3.5rem' }}
                    >
                        <h1
                            className="display-4 text-center"
                            style={{ fontSize: '1.9rem' }}
                        >
                            Cargar Pintura
                        </h1>
                        <Col md={12}>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="title">Titulo</Label>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="paintingType">
                                        Tipo de Pintura
                                    </Label>
                                    <Input
                                        type="text"
                                        name="paintingType"
                                        id="paintingType"
                                        value={paintingType}
                                        onChange={handlePaintingTypeChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Precio</Label>
                                    <Input
                                        type="text"
                                        name="price"
                                        id="price"
                                        value={price}
                                        onChange={handlePriceChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="painting">Imagen Pintura</Label>
                                    <Input
                                        innerRef={fileInput}
                                        type="file"
                                        name="painting"
                                        id="painting"
                                        onChange={handlePaintingChange}
                                    />
                                </FormGroup>
                                <div className={'d-flex'}>
                                    <Button color="secondary" className="w-100">
                                        Cargar
                                    </Button>
                                    {isLoading && (
                                        <Spinner
                                            color="primary"
                                            style={{
                                                width: '2rem',
                                                height: '2rem',
                                                marginLeft: '.5rem'
                                            }}
                                            type="grow"
                                        />
                                    )}
                                </div>
                            </Form>
                        </Col>
                    </Row>
                    {qrValue && (
                        <div
                            style={{
                                position: 'absolute',
                                left: '70%',
                                transform: 'translateX(50%)',
                                top: '40%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <div ref={qrRef}>
                                <QRCode value={qrValue} size={256} />
                            </div>
                            <Button
                                onClick={downloadQR}
                                className="btn btn-outline-primary mt-2"
                            >
                                Descargar QR
                            </Button>
                        </div>
                    )}
                </Container>
            </Container>
        </>
    )
}

export default CreatePaintingForm
