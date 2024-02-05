import { useParams, useLocation } from 'react-router-dom'
import {
    Container,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardFooter
} from 'reactstrap'
import InfoFooter from '../../components/InfoFooter/InfoFooter'
import NavBar from '../../components/NavBar/NavBar'
import { useStateContext } from '../../context/ContextProvider'

const Painting = () => {
    const { frameWidth, frameColor, paintings } = useStateContext()
    const { title } = useParams()
    const location = useLocation()

    const findCard = paintings.filter(card => title.includes(card.title))[0]

    console.log({ findCard })

    const imgSrc = findCard?.src
    const imgPrice = findCard?.price
    const imgCaption = findCard?.paintingType

    return (
        <div
            className="d-flex flex-column justify-center align-items-center"
            style={{ height: '90vh' }}
        >
            <div className="mt-5" style={{ position: 'relative', top: '1rem' }}>
                <NavBar frameColor={frameColor} />
            </div>
            <Container
                className="mt-4 d-flex justify-center align-center align-items-center align-self-center"
                style={{
                    transition: '300ms'
                }}
            >
                <Card style={{ width: '38rem' }}>
                    <CardImg
                        alt={title}
                        src={imgSrc}
                        top
                        style={{
                            border: `${frameWidth}px solid ${frameColor}`
                        }}
                    />
                    <CardBody>
                        <CardTitle tag="h5">{title}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {imgCaption}
                        </CardSubtitle>
                    </CardBody>
                    <CardFooter className="text-end text-bold">
                        U$S {imgPrice}
                    </CardFooter>
                </Card>
            </Container>
            <InfoFooter />
        </div>
    )
}

export default Painting
