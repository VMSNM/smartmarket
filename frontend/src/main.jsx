import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import { MainDrawerContextProvider } from './context/MainDrawerContext.jsx'
import { WatchlistsContextProvider } from './context/WatchlistsContext.jsx'
import { CommonModalContextProvider } from './context/CommonModalContext.jsx'
import { PortfoliosContextProvider } from './context/PortfoliosContext.jsx'
import { ViewedContextProvider } from './context/ViewedContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <MainDrawerContextProvider>
            <CommonModalContextProvider>
              <WatchlistsContextProvider>
                <PortfoliosContextProvider>
                  <ViewedContextProvider>
                    <App />
                  </ViewedContextProvider>
                </PortfoliosContextProvider>
              </WatchlistsContextProvider>
            </CommonModalContextProvider>
          </MainDrawerContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
