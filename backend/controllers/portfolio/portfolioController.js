import Portfolio from "../../models/portfolio/PortfolioModel.js";
import User from "../../models/UserModel.js";
import priceAction from '../../dummy-data/priceAction.json' assert { type: "json" };
import priceHistory from '../../dummy-data/priceHistory.json' assert { type: "json" };

const createPortfolio = async (req, res) => {    
    try {
        const { name, description } = req.body;
        const createdBy = req.user._id;
        if (!name) return res.status(400).json({ error: 'Name field is required' });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const maxLength = 500;
        if (description.length > maxLength) return res.status(400).json({ error: `Description must be less than ${maxLength} characters` });
        

        const newPortfolio = new Portfolio({
            name,
            description,
            createdBy,
        })
        await newPortfolio.save();

        /* const watchlists = await Watchlist.find({ createdBy: user._id }); */

        res.status(200).json({ message: "Portfolio created successfully", result: newPortfolio });
    } catch (error) {
        console.log("Error in createWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const deletePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });

        if (portfolio.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized to delete this portfolio' });

        await Portfolio.findByIdAndDelete(req.params.id);

        const portfolios = await Portfolio.find({ createdBy: req.user._id })
        res.status(200).json({ message: "Portfolio deleted successfully", result: portfolios });

    } catch (error) {
        console.log("Error in deletePortfolio controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const updatePortfolio = async (req, res) => {
    const { name, description, cashPosition } = req.body;
    const userId = req.user._id;
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
        if (portfolio.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized to update this portfolio' });
        
        portfolio.name = name || portfolio.name;
        portfolio.description = description || portfolio.description;
        portfolio.cashPosition = cashPosition || portfolio.cashPosition;

        await portfolio.save();

        res.status(200).json({message: 'Portfolio successfully updated', result: portfolio});
        
    } catch (error) {
        console.log("Error in updatePortfolio controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const addRemoveFromPortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const { tickerSymbol, tickerName, sharesCount, avgBuyPrice } = req.body;

        let portfolio = await Portfolio.findById(id)
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
        if (!tickerSymbol) return res.status(404).json({ error: 'Ticker symbol required' });

        const isPortfolioed = portfolio.tickers?.find(element => element.symbol === tickerSymbol);

        if (isPortfolioed) {
            await Portfolio.updateOne({ _id: id }, { $pull: { tickers: isPortfolioed }}, {new: true});
            portfolio = await Portfolio.findById(id)
            res.status(200).json({ message: "Holding deleted successfully from portfolio", result: portfolio });

        } else {
            const newHolding = { symbol: tickerSymbol, name: tickerName || '', sharesCount: sharesCount, avgBuyPrice: avgBuyPrice, notes: 'No relevant notes' }
            await Portfolio.updateOne({ _id: id }, { $push: { tickers: newHolding }}, {new: true});
            portfolio = await Portfolio.findById(id)
            res.status(200).json({ message: "Holding added successfully to portfolio", result: portfolio });
            // or portfolio.tickers.push(newHolding); await portfolio.save();
        }
        
    } catch (error) {
        console.log("Error in addRemoveFromPortfolio controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const updateHoldingData = async (req, res) => {
    const { tickerSymbol, sharesCount, avgBuyPrice, notes } = req.body;
    const userId = req.user._id;
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });
        if (portfolio.createdBy.toString() !== userId.toString()) return res.status(401).json({ error: 'Unauthorized to update this portfolio' });
        
        let ticker = portfolio?.tickers.find(element => element.symbol === tickerSymbol);
        if (!ticker) return res.status(404).json({ message: 'Holding not found' });

        ticker.sharesCount = sharesCount || ticker.sharesCount;
        ticker.avgBuyPrice = avgBuyPrice || ticker.avgBuyPrice;
        ticker.notes = notes || ticker.notes;
        await portfolio.save();

        res.status(200).json({message: 'Holding successfully updated', result: portfolio});
        
    } catch (error) {
        console.log("Error in updateHoldingData controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) return res.status(404).json({ message: 'Portfolio not found' });
        res.status(200).json(portfolio);

    } catch (error) {
        console.log("Error in getPortfolio controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getUserPortfolios = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne( { username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const portfolios = await Portfolio.find({ createdBy: user._id })/* .sort({ createdAt: -1 }) */;
        
        res.status(200).json(portfolios);

    } catch (error) {
        console.log("Error in getUserPortfolios controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getHoldingPriceAction = async (req, res) => {
    try {
        const ticker = req.params.ticker;

        let data = priceHistory[ticker];
        if (data.error || data === null) { throw new Error(data.error); } 

        let dataDates = data?.historical?.map(element => element.date);
        let dataPrices = data?.historical?.map(element => element.close);
        
        res.status(200).json({dataDates, dataPrices})
        
    } catch (error) {
        console.log("Error in getPriceHistory controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
    /* try {
        const ticker = req.params.ticker;

        let data = priceAction[ticker];
        if (data.error) { throw new Error(data.error); }

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
    } */
}

export { createPortfolio, deletePortfolio, updatePortfolio, addRemoveFromPortfolio, updateHoldingData, getPortfolio, getUserPortfolios, getHoldingPriceAction };