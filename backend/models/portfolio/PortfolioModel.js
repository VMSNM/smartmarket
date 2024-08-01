import mongoose from 'mongoose';

const portfolioSchema = mongoose.Schema({
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
    tickers:
    [
      {
        symbol: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
        sharesCount: {
            type: Number,
        },
        avgBuyPrice: {
            type: Number,
        },
        notes: {
            type: String,
        },
      }, { timestamps: true }
    ],
    cashPosition: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;