import User from "../models/UserModel.js";
import Watchlist from "../models/WatchlistModel.js";

const createWatchlist = async (req, res) => {    
    try {
        const { name, description } = req.body;
        const createdBy = req.user._id;
        if (!name) return res.status(400).json({ error: 'Name field is required' });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const maxLength = 500;
        if (description.length > maxLength) return res.status(400).json({ error: `Description must be less than ${maxLength} characters` });
        

        const newWatchlist = new Watchlist({
            name,
            description,
            createdBy
        })
        await newWatchlist.save();

        /* const watchlists = await Watchlist.find({ createdBy: user._id }); */

        res.status(200).json({ message: "Watchlist created successfully", result: newWatchlist });
    } catch (error) {
        console.log("Error in createWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const deleteWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });

        if (watchlist.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized to delete this watchlist' });

        await Watchlist.findByIdAndDelete(req.params.id);

        const watchlists = await Watchlist.find({ createdBy: req.user._id })
        res.status(200).json({ message: "Watchlist deleted successfully", result: watchlists });

    } catch (error) {
        console.log("Error in deleteWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const updateWatchlist = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user._id;
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
        if (watchlist.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized to update this watchlist' });
        
        watchlist.name = name || watchlist.name;
        watchlist.description = description || watchlist.description;

        await watchlist.save();

        res.status(200).json({message: 'Watchlist successfully updated', result: watchlist});
        
    } catch (error) {
        console.log("Error in updateWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const updateTickerData = async (req, res) => {
    const { tickerSymbol, priceTarget, notes, checkboxed } = req.body;
    const userId = req.user._id;
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
        if (watchlist.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'Unauthorized to update this watchlist' });
        
        let ticker = watchlist?.tickers.find(element => element.symbol === tickerSymbol);
        if (!ticker) return res.status(404).json({ message: 'Ticker not found' });
        ticker.priceTarget = priceTarget || ticker.priceTarget;
        ticker.notes = notes || ticker.notes;
        await watchlist.save();

        if (checkboxed) {
            // Find all watchlists that have this ticker and update priceTarget and notes fields
            await Watchlist.updateMany(
                { "createdBy": userId, "tickers.symbol": tickerSymbol },
                {
                    $set: {
                        "tickers.$[ticker].priceTarget": priceTarget,
                        "tickers.$[ticker].notes": notes,
                    },
                },
                { arrayFilters: [{ "ticker.symbol": tickerSymbol }] }
            );
            return res.status(200).json({message: 'Ticker successfully updated on all watchlists', result: watchlist});
        }
        res.status(200).json({message: 'Ticker successfully updated', result: watchlist});
        
    } catch (error) {
        console.log("Error in updateWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}


const addRemoveFromWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { tickerSymbol } = req.body;

        let watchlist = await Watchlist.findById(id)
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
        if (!tickerSymbol) return res.status(404).json({ message: 'Ticker symbol required' });

        const isWatchlisted = watchlist.tickers?.find(element => element.symbol === tickerSymbol);

        if (isWatchlisted) {
            await Watchlist.updateOne({ _id: id }, { $pull: { tickers: isWatchlisted }}, {new: true});
            watchlist = await Watchlist.findById(id)
            res.status(200).json({ message: "Ticker deleted successfully from watchlist", result: watchlist });

        } else {
            const newTicker = { symbol: tickerSymbol, priceTarget: 0, notes: 'No relevant notes' }
            await Watchlist.updateOne({ _id: id }, { $push: { tickers: newTicker }}, {new: true});
            watchlist = await Watchlist.findById(id)
            res.status(200).json({ message: "Ticker added successfully to watchlist", result: watchlist });
            // or watchlist.tickers.push(newTicker); await watchlist.save();
        }
        
    } catch (error) {
        console.log("Error in addRemoveFromWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.findById(req.params.id);
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
        res.status(200).json(watchlist);

    } catch (error) {
        console.log("Error in getWatchlist controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getUserWatchlists = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne( { username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const watchlists = await Watchlist.find({ createdBy: user._id })/* .sort({ createdAt: -1 }) */;
        
        res.status(200).json(watchlists);

    } catch (error) {
        console.log("Error in getUserWatchlists controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { createWatchlist, deleteWatchlist, updateWatchlist, updateTickerData, addRemoveFromWatchlist, getWatchlist, getUserWatchlists };