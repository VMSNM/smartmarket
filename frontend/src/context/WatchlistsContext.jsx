import { createContext, useContext, useState } from "react";

export const WatchlistsContext = createContext();

export const useWatchlistsContext = () => {
    return useContext(WatchlistsContext);
}

export const WatchlistsContextProvider = ({ children }) => {
    const [watchlists, setWatchlists] = useState(null);
    const [watchlistSelected, setWatchlistSelected] = useState('');

    const value = {
        watchlists, setWatchlists,
        watchlistSelected, setWatchlistSelected,
    }

    return <WatchlistsContext.Provider value={{value}}>
        {children}
    </WatchlistsContext.Provider>
}