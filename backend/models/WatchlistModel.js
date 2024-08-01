import mongoose from 'mongoose';

const watchlistSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        maxLength: 500,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tickers: [
        {
            symbol: {
                type: String,
                required: true,
            },
            priceTarget: {
                type: Number
            },
            notes: {
                type: String,
                maxLength: 500
            }
        }, { timestamps: true }
    ]
}, { timestamps: true });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;