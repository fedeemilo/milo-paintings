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
    Alert,
    Spinner
} from "reactstrap";
import { URL_API } from "../../constants/urls";

const CreatePaintingForm = () => {
    const [title, setTitle] = useState("");
    const [paintingType, setPaintingType] = useState("");
    const [price, setPrice] = useState("");
    const [painting, setPainting] = useState(null);

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fileInput = useRef(null);

    const handleSubmit = async event => {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("paintingType", paintingType);
        formData.append("price", price);
        formData.append("painting", painting);

        try {
            const response = await fetch(URL_API, {
                method: "POST",
                body: formData
            });
            setIsLoading(false);
            if (!response.ok) {
                handleErrorAlert();
                clearInputs();
                throw new Error("Error creating painting");
            }

            clearInputs();

            handleSuccessAlert();

            const newPainting = await response.json();
            console.log("New painting created:", newPainting);
        } catch (err) {
            console.error(err);
        }
    };

    const clearInputs = () => {
        setTitle("");
        setPaintingType("");
        setPrice("");
        fileInput.current.value = "";
    };

    const handleSuccessAlert = () => {
        setSubmitSuccess(true);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 5000);
    };

    const handleErrorAlert = () => {
        setSubmitError(true);

        setTimeout(() => {
            setSubmitError(false);
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
                <Container className="w-50 mt-4">
                    <Alert color="success">Pintura subida con exito!</Alert>
                </Container>
            )}
            {submitError && (
                <Container className="w-50 mt-4">
                    <Alert color="danger">
                        Error al subir la pintura, intente de nuevo.
                    </Alert>
                </Container>
            )}
            <Container
                className={
                    "mt-2 bg-light p-3 border rounded w-50 d-flex justify-center align-center"
                }
            >
                <Row className="justify-center">
                    <h1
                        class="display-4 text-center"
                        style={{ fontSize: "1.9rem" }}
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

                            <div className={"d-flex"}>
                                <Button color="primary" className="w-100">
                                    Cargar
                                </Button>
                                {isLoading && (
                                    <Spinner
                                        color="primary"
                                        style={{
                                            width: "2rem",
                                            height: "2rem",
                                            marginLeft: ".5rem"
                                        }}
                                        type="grow"
                                    />
                                )}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreatePaintingForm;
