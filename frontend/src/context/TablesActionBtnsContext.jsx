import { createContext, useContext, useState } from "react";

export const TablesActionBtnsContext = createContext();

export const useTablesActionBtnsContext = () => {
    return useContext(TablesActionBtnsContext);
}

export const TablesActionBtnsContextProvider = ({ children }) => {
    const [reversed, setReversed] = useState(false);
    const [showGrowth, setShowGrowth] = useState(true);
    const [showMargins, setShowMargins] = useState(true);

    const value = {
        reversed, setReversed,
        showGrowth, setShowGrowth,
        showMargins, setShowMargins
    }
    return <TablesActionBtnsContext.Provider value={value}>
        {children}
    </TablesActionBtnsContext.Provider>
}