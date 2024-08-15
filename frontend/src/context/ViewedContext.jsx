import { createContext, useContext, useState } from "react";

export const ViewedContext = createContext();

export const useViewedContext = () => {
    return useContext(ViewedContext);
}

export const ViewedContextProvider = ({ children }) => {
    const [viewedByUser, setViewedByUser] = useState(localStorage.getItem('viewed-companies') || null);
    const [viewedLimit, setViewedLimit] = useState({
        numberOfTickers: 3,
        numberOfDays: 7
    });
    
    return <ViewedContext.Provider value={{viewedByUser, setViewedByUser, viewedLimit}}>
        {children}
    </ViewedContext.Provider>
}