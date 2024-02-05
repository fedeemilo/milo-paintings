import { useParams } from 'react-router-dom'
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
    const { frameColor, paintings } = useStateContext()
    const { title } = useParams()
    const findCard = paintings.filter(card => title.includes(card.title))[0]

    return (
        <div className="d-flex flex-column justify-center align-items-center">
            <div className="mt-5">
                <NavBar frameColor={frameColor} />
            </div>
            <Container
                className=" d-flex justify-center align-center align-items-center align-self-center"
                style={{
                    transition: '300ms'
                }}
            >
                <Card style={{ width: '38rem' }}>
                    <CardImg
                        alt={title}
                        src={findCard?.src}
                        height={'100%'}
                        top
                        style={{
                            border: `15px solid #5D727E`
                        }}
                    />
                    <CardBody>
                        <CardTitle tag="h5">{title}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            {findCard?.paintingType}
                        </CardSubtitle>
                    </CardBody>
                    <CardFooter className="text-end text-bold">
                        U$S {findCard?.price}
                    </CardFooter>
                </Card>
            </Container>
            <InfoFooter />
        </div>
    )
}

export default Painting
