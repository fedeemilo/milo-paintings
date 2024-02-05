import './paint-carousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'

const PaintCarousel = () => {
    const { paintings } = useStateContext()

    return (
        <div className="image-grid">
            {paintings.map(image => (
                <Link key={image.title} to={`/milo-painting/${image.title}`}>
                    <img
                        src={image.src}
                        alt={image.title}
                        className="image-grid-item"
                    />
                </Link>
            ))}
        </div>
    )
}

export default PaintCarousel
