import './paint-carousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'

const PaintCarousel = ({ paintCards }) => {
    return (
        <div>
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                showArrows={true}
                showStatus={false}
                dynamicHeight={true}
            >
                {paintCards.map(image => (
                    <div
                        key={image.title}
                        style={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Link to={`/milo-painting/${image.title}`}>
                            <img
                                key={image.title}
                                src={image.src}
                                alt={image.title}
                                width={484}
                                height={300}
                                style={{
                                    maxHeight: '80vh',
                                    objectFit: 'contain'
                                }}
                            />
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default PaintCarousel
