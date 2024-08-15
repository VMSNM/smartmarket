import { createContext, useContext, useState } from "react";

export const PortfoliosContext = createContext();

export const usePortfoliosContext = () => {
    return useContext(PortfoliosContext);
}

export const PortfoliosContextProvider = ({ children }) => {
    const [portfolios, setPortfolios] = useState(null);
    const [portfolioType, setPortfolioType] = useState('Beginner Setup');
    const [portfolioSelected, setPortfolioSelected] = useState('');
    const [portfolioTotals, setPortfolioTotals] = useState(null);

    const value = {
        portfolios, setPortfolios,
        portfolioType, setPortfolioType,
        portfolioSelected, setPortfolioSelected,
        portfolioTotals, setPortfolioTotals
    }

    return <PortfoliosContext.Provider value={{value}}>
        {children}
    </PortfoliosContext.Provider>
}