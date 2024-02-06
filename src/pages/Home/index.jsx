import { Container, Col, Badge } from 'reactstrap'
import { useStateContext } from '../../context/ContextProvider'
import { PaintCarousel } from '../../components'
import './home.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    const { frameColor, paintings, updatePaintings } = useStateContext()

    useEffect(() => {
        updatePaintings()
    }, [])
    
    return (
        <>
            <Container>
                <Link
                    to="/"
                    className="milo-logo d-flex justify-center text-center text-uppercase font-medium leading-tight text-3xl mt-3"
                    style={{ color: frameColor }}
                >
                    <Badge color="dark">M</Badge>ilo Pinturas
                </Link>

                <Col
                    md={12}
                    className="home__carousel-container rounded mx-auto d-flex justify-center align-middle"
                >
                    <PaintCarousel paintCards={paintings} />
                </Col>
            </Container>
        </>
    )
}

export default Home
