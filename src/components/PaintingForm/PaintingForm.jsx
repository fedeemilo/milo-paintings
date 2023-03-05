import React, { useState, useRef } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from "reactstrap";

const CreatePaintingForm = () => {
    const [title, setTitle] = useState("");
    const [paintingType, setPaintingType] = useState("");
    const [price, setPrice] = useState("");
    const [painting, setPainting] = useState(null);

    const [submitSuccess, setSubmitSuccess] = useState(false);

    const fileInput = useRef(null);

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("paintingType", paintingType);
        formData.append("price", price);
        formData.append("painting", painting);

        try {
            const response = await fetch(
                "http://localhost:3000/api/paintings",
                {
                    method: "POST",
                    body: formData
                }
            );
            if (!response.ok) {
                throw new Error("Error creating painting");
            }

            setTitle("");
            setPaintingType("");
            setPrice("");
            fileInput.current.value = "";

            handleSuccessAlert(response.ok);

            const newPainting = await response.json();
            console.log("New painting created:", newPainting);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSuccessAlert = ok => {
        setSubmitSuccess(true);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 5000);
    };

    const handleTitleChange = event => {
        setTitle(event.target.value);
    };

    const handlePaintingTypeChange = event => {
        setPaintingType(event.target.value);
    };

    const handlePriceChange = event => {
        setPrice(event.target.value);
    };

    const handlePaintingChange = event => {
        setPainting(event.target.files[0]);
    };

    return (
        <>
            {submitSuccess && (
                <Container className="w-75 mt-4">
                    <Alert color="success">Pintura subida con exito!</Alert>
                </Container>
            )}
            <Container
                className={
                    "mt-2 bg-light p-3 border rounded w-75 d-flex justify-content-center"
                }
            >
                <Row className="justify-content-center">
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
                            <Button color="primary" className="w-100">
                                Cargar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreatePaintingForm;
