import { Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import useCreateTheme from './hooks/theme/useCreateTheme';
import { AppContainer } from './styles/main';
import './App.css';
// Layouts
import RootLayout from './layouts/RootLayout';
import StockDetailsLayout from './layouts/StockDetailsLayout';
import FinancialsLayout from './layouts/FinancialsLayout';
// Pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Overview from './pages/stockdetails/Overview';
import IncomeStatement from './pages/stockdetails/financials/IncomeStatement';
import BalanceSheet from './pages/stockdetails/financials/BalanceSheet';
import CashflowStatement from './pages/stockdetails/financials/CashflowStatement';
import Valuation from './pages/stockdetails/Valuation';
import News from './pages/stockdetails/News';
import Watchlists from './pages/Watchlists';
import Portfolios from './pages/Portfolios';
import NotFound from './pages/NotFound';

function App() {
  const { myTheme } = useCreateTheme();
  const { authUser } = useAuthContext();

  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline>
        <Box>
          <AppContainer>
            <Routes>
              <Route path='/' element={<RootLayout />}>
                <Route index element={<Homepage />} />
                <Route path='stockDetails' element={<StockDetailsLayout />}>
                    <Route path=':ticker/overview' element={<Overview />} />
                    <Route path=':ticker/financials' element={<FinancialsLayout />} >
                        <Route path='incomeStatement' element={<IncomeStatement />} />
                        <Route path='balanceSheet' element={<BalanceSheet />} />
                        <Route path='cashflowStatement' element={<CashflowStatement />} />
                    </Route>
                    <Route path=':ticker/valuation' element={<Valuation />} />
                    <Route path=':ticker/news' element={<News />} />
                </Route>
                <Route path='watchlists' element={<Watchlists />}></Route>
                <Route path='portfolios' element={<Portfolios />}></Route>
                <Route path='*' element={<NotFound />} />
              </Route>
              <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <Signup />} />
              <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <Login />} />
            </Routes>
          </AppContainer>
          <Toaster />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App;