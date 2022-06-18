import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
    frameColor: "#2e424d",
    frameWidth: 20,
    imgPlusWidth: 0
};

export const ContextProvider = ({ children }) => {
    const [frameColor, setFrameColor] = useState(initialState.frameColor);
    const [frameWidth, setFrameWidth] = useState(initialState.frameWidth);
    const [imgPlusWidth, setImgPlusWidth] = useState(initialState.imgPlusWidth);

    return (
        <StateContext.Provider
            value={{
                frameColor,
                setFrameColor,
                frameWidth,
                setFrameWidth,
                imgPlusWidth,
                setImgPlusWidth
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
