import priceAction from '../dummy-data/priceAction.json' assert { type: "json" };
import priceHistory from '../dummy-data/priceHistory.json' assert { type: "json" };
import keyMetrics from '../dummy-data/overview.json' assert { type: "json" };
import incomeStatement from '../dummy-data/incomeStatement.json' assert { type: "json" };
import balanceSheet from '../dummy-data/balanceSheet.json' assert { type: "json" };
import cashflowStatement from '../dummy-data/cashflowStatement.json' assert { type: "json" };
import keyMetricsFMP from '../dummy-data/keyMetrics.json' assert { type: "json" };

const getPriceAction = async (req, res) => {
    try {
        const userRole = req.user.role;
        const ticker = req.params.ticker;
        let data = null;

        if (userRole === 'local') {
            data = priceAction[ticker];
        }
        else {
            const URL = `${process.env.AV_API_URL}TIME_SERIES_DAILY&outputsize=full&symbol=${ticker}&apikey=${process.env.AV_API_KEY}`;

            const result = await fetch(URL);
            data = await result.json(); 
        }
        if (data.error || data === null) { throw new Error(data.error); } 

        let dataDates = [];
        let dataPrices = [];
        Object.keys(data["Time Series (Daily)"]).forEach(key => {
            dataDates.push(key)
            dataPrices.push(data["Time Series (Daily)"][key]["4. close"])
        })
        res.status(200).json({dataDates, dataPrices})
        
    } catch (error) {
        console.log("Error in getPriceAction controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getPriceHistory = async (req, res) => {
    try {
        const userRole = req.user.role;
        const ticker = req.params.ticker;

        let data = null;

        if (userRole === 'local') {
            data = priceHistory[ticker];
        }
        else {
            const URL = `${process.env.FMP_API_URL}/historical-price-full/${ticker}?apikey=${process.env.FMP_API_KEY}`

            const result = await fetch(URL);
            data = await result.json(); 
        }
        if (data.error || data === null) { throw new Error(data.error); } 

        let dataDates = data?.historical?.map(element => element.date);
        let dataPrices = data?.historical?.map(element => element.close);
        
        res.status(200).json({dataDates, dataPrices})
        
    } catch (error) {
        console.log("Error in getPriceHistory controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getKeyMetrics = async (req, res) => {
    try {
        const userRole = req.user.role;
        const ticker = req.params.ticker;
        let data = null;

        if (userRole === 'local') {
            data = keyMetrics[ticker];
        }
        else {
            const URL = `${process.env.AV_API_URL}OVERVIEW&symbol=${ticker}&apikey=${process.env.AV_API_KEY}`;

            const result = await fetch(URL);
            data = await result.json();    
        }
        
        if (data.error || data === null) { throw new Error(data.error); } 
        res.status(200).json(data);
        
    } catch (error) {
        console.log("Error in getKeyMetrics controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getIncomeStatement = async (req, res) => {
    try {
        const ticker = req.params.ticker;
        const userRole = req.user.role;
        let data = null;

        if (userRole === 'local') {
            data = incomeStatement[ticker];
        }
        else {
            const URL = `${process.env.FMP_API_URL}/income-statement/${ticker}?period=annual&limit=50&apikey=${process.env.FMP_API_KEY}`

            const result = await fetch(URL);
            data = await result.json();
        }

        if (data.error || data === null) { throw new Error(data.error); } 
        res.status(200).json(data);
        
    } catch (error) {
        console.log("Error in getIncomeStatement controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getBalanceSheet = async (req, res) => {
    try {
        const ticker = req.params.ticker;
        const userRole = req.user.role;

        let data = null;

        if (userRole === 'local') {
            data = balanceSheet[ticker];
        }
        else {
            const URL = `${process.env.FMP_API_URL}/balance-sheet-statement/${ticker}?limit=120&apikey=${process.env.FMP_API_KEY}`

            const result = await fetch(URL);
            data = await result.json();
        }
        if (data.error || data === null) { throw new Error(data.error); } 
        res.status(200).json(data);

    } catch (error) {
        console.log("Error in getBalanceSheet controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getCashflowStatement = async (req, res) => {
    try {
        const ticker = req.params.ticker;
        const userRole = req.user.role;

        let data = null;

        if (userRole === 'local') {
            data = cashflowStatement[ticker];
        }
        else {
            const URL = `${process.env.FMP_API_URL}/cash-flow-statement/${ticker}?limit=120&apikey=${process.env.FMP_API_KEY}`

            const result = await fetch(URL);
            data = await result.json();
        }
        if (data.error || data === null) { throw new Error(data.error); } 
        res.status(200).json(data);
        
    } catch (error) {
        console.log("Error in getCashflowStatement controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getKeyMetricsFMP = async (req, res) => {
    try {
        const ticker = req.params.ticker;
        const userRole = req.user.role;

        let data = null;

        if (userRole === 'local') {
            data = keyMetricsFMP[ticker];
        }
        else {
            const URL = `${process.env.FMP_API_URL}/key-metrics/${ticker}?limit=40&apikey=${process.env.FMP_API_KEY}`

            const result = await fetch(URL);
            data = await result.json();
        }
        if (data.error || data === null) { throw new Error(data.error); } 
        res.status(200).json(data);
        
    } catch (error) {
        console.log("Error in getKeyMetricsFMP controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { getPriceAction, getPriceHistory, getKeyMetrics, getIncomeStatement, getBalanceSheet, getCashflowStatement, getKeyMetricsFMP };