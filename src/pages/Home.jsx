import PaintCarousel from "../components/PaintCarousel/PaintCarousel";
import { Container, Col } from "reactstrap";
import ColorPicker from "../components/ColorPicker/ColorPicker";
import FramePicker from "../components/FramePicker/FramePicker";
import { useStateContext } from "../context/ContextProvider";

const Home = () => {
    const { frameColor } = useStateContext();

    return (
        <>
            <div
                className="picker__container"
                style={{
                    border: `1px dashed ${frameColor}`
                }}
            >
                <ColorPicker />
                <FramePicker />
            </div>
            <Container className="mt-3">
                <h2
                    className="text-center text-uppercase font-medium leading-tight text-3xl mt-0 mb-2"
                    style={{ color: frameColor }}
                >
                    Milo Pinturas
                </h2>
                <Col
                    className="bg-light border p-4 rounded mx-auto d-flex justify-center align-middle"
                    sm={{
                        size: "auto"
                    }}
                    style={{ width: "60vw", height: "100%" }}
                >
                    <PaintCarousel />
                </Col>
            </Container>
        </>
    );
};

export default Home;
