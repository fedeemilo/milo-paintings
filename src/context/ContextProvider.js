import { createContext, useContext } from "react";

const StateContext = createContext();

// const initialState = {};

export const ContextProvider = ({ children }) => {
    return (
        <StateContext.Provider value={{ a: "1" }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
