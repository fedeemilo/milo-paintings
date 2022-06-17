import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
    frameColor: "#2e424d",
    frameWidth: 20
};

export const ContextProvider = ({ children }) => {
    const [frameColor, setFrameColor] = useState(initialState.frameColor);
    const [frameWidth, setFrameWidth] = useState(initialState.frameWidth);

    return (
        <StateContext.Provider
            value={{ frameColor, setFrameColor, frameWidth, setFrameWidth }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
