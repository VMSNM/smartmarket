import User from "../models/UserModel.js";
import Viewed from "../models/ViewedModel.js";

const addToViewed = async (req, res) => {
    try {
        const userId = req.user._id;
        const { tickerSymbol } = req.body;

        if (!tickerSymbol) return res.status(404).json({ message: 'Ticker symbol required' });

        const newViewed = new Viewed({
            symbol: tickerSymbol,
            viewedBy: userId
        })
        await newViewed.save();

        const viewedCompanies = await Viewed.find({ viewedBy: userId })/* .sort({ createdAt: -1 }) */;

        res.status(200).json({ message: "Company added to viewed companies list", result: viewedCompanies });
        
    } catch (error) {
        console.log("Error in addToViewed controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getViewedByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const viewedCompanies = await Viewed.find({ viewedBy: id });

        // Delete tickers that reached the limit of days
        const handleUpdateTickersDate = async () => {
            (viewedCompanies.length > 0) && viewedCompanies?.map(async (company) => {
                if (getDaysLeft(company.createdAt, process.env.LIMIT_NUM_OF_DAYS) === 0) {
                    await Viewed.findByIdAndDelete(company._id);
                } 
            });
        }
        await handleUpdateTickersDate();
        res.status(200).json(viewedCompanies);

    } catch (error) {
        console.log("Error in getViewedByUser controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { addToViewed, getViewedByUser };

const getDaysLeft = (start, totalNumOfDays) => {
    let startDate = new Date(start);
    let nowDate = new Date();
    let daysPassed = new Date(nowDate - startDate);
    let daysLeft = totalNumOfDays - (daysPassed.getDate() - 1);
    return daysLeft;
}