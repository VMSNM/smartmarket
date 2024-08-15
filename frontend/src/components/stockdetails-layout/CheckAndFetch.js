export const checkTicker = async (setLoading, ticker, clearStockDetailsStorage, stockDetails, setStockDetails, getStockData, getPriceAction, getPriceHistory) => {
    if (ticker !== localStorage.getItem('ticker-featured')) {
      clearStockDetailsStorage(); 
      localStorage.setItem('ticker-featured', ticker);
      await fetchFromAPI(stockDetails, setStockDetails, getStockData, getPriceAction, getPriceHistory, setLoading);
      return;
    }
    setLoading(false);
  }
  
  const fetchFromAPI = async (stockDetails, setStockDetails, getStockData, getPriceAction, getPriceHistory, setLoading) => {
    try {
      await Promise.all([
        getPriceHistory(),
        getStockData('keymetrics', 'key-metrics'),
        getStockData('incomestatement', 'income-statement'),
        getStockData('balancesheet', 'balance-sheet'),
        getStockData('cashflowstatement', 'cashflow-statement'),
        getStockData('keymetrics-fmp', 'key-metrics-fmp')
      ]).then((values) => {
        setStockDetails({
          ...stockDetails,
          priceActionDates: JSON.parse(localStorage.getItem('priceaction-dates')) || null,
          priceActionPrices: JSON.parse(localStorage.getItem('priceaction-prices')) || null,
          keyMetrics: values[1] || null,
          incomeStatement: values[2] || null,
          balanceSheet: values[3] || null,
          cashflowStatement: values[4] || null,
          keyMetricsFMP: values[5] || null
        });
      })
    } catch (error) {
      console.log('Something went wrong');
    }
    setLoading(false);
  }