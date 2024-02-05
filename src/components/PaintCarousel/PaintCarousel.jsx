import { useEffect, useState } from 'react'
import './paint-carousel.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import { Spinner } from 'reactstrap'

const PaintCarousel = () => {
    const { paintings } = useStateContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (paintings.length > 0) {
            setLoading(false)
        }
    }, [paintings])

    return (
        <div>
            <h1 className="grid-title">
                Guillermo Milone (MILO) - guillemilo@gmail.com
            </h1>
            {loading ? (
                <div className="spinner-container">
                    <Spinner
                        color="secondary"
                        style={{
                            width: '4rem',
                            height: '4rem',
                            marginLeft: '.5rem'
                        }}
                        type="grow"
                    />
                </div>
            ) : (
                <div className="image-grid">
                    {paintings.map(image => (
                        <Link
                            key={image.title}
                            to={`/milo-painting/${image.title}`}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="image-grid-item"
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PaintCarousel
