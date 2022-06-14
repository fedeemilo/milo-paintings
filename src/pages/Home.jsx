import PaintCarousel from "../components/PaintCarousel";
import { Container, Col } from "reactstrap";

const Home = () => {
    return (
        <>
            <Container className="mt-5">
                <Col
                    className="bg-light border p-4 rounded"
                    sm={{
                        size: "auto"
                    }}
                >
                    <h2 className="text-center text-uppercase font-medium leading-tight text-5xl mt-0 mb-2 text-gray-600">
                        Milo Pinturas
                    </h2>
                    <PaintCarousel />
                </Col>
            </Container>
        </>
    );
};

export default Home;
