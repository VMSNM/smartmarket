import mongoose from 'mongoose';

const viewedSchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    viewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Viewed = mongoose.model("Viewed", viewedSchema);

export default Viewed;