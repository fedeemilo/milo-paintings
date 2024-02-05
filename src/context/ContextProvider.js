import { createContext, useContext, useEffect, useState } from 'react'
import { URL_API } from '../constants/urls'

const StateContext = createContext()

const initialState = {
    frameColor: '#2e424d',
    frameWidth: 20,
    imgPlusWidth: 0
}

export const ContextProvider = ({ children }) => {
    const [frameColor, setFrameColor] = useState(initialState.frameColor)
    const [frameWidth, setFrameWidth] = useState(initialState.frameWidth)
    const [imgPlusWidth, setImgPlusWidth] = useState(initialState.imgPlusWidth)

    useEffect(() => {
        fetch(URL_API)
            .then(res => res.json())
            .then(data => setPaintings(data))
            .catch(err => console.error(err))
    }, [])

    const [paintings, setPaintings] = useState([])

    return (
        <StateContext.Provider
            value={{
                frameColor,
                setFrameColor,
                frameWidth,
                setFrameWidth,
                imgPlusWidth,
                setImgPlusWidth,
                paintings,
                setPaintings
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
