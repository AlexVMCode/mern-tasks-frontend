import { createContext, useReducer } from 'react';
import appReducer from './AppReducer';

let initialState = {
    URI: 'http://localhost:4000/api/v1.0',
    logged: false,
    token: ''
};

export const GlobalContext = createContext(initialState);

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState);

    const setToken = (token) => {
        dispatch({ type: 'SET_TOKEN', payload: token });
    };

    return <GlobalContext.Provider value={{ ...state, setToken }}>
        {children}
    </GlobalContext.Provider>
}
