import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import stockdetailsRoutes from './routes/stockdetailsRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import portfolioRoutes from './routes/portfolio/portfolioRoutes.js';
import viewedRoutes from './routes/viewedRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json({limit:'50mb'})); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse Form data in the req.body
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stockdetails', stockdetailsRoutes);
app.use('/api/watchlists', watchlistRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/viewed', viewedRoutes);

// http://localhost:5000 => backend, frontend
app.use(express.static(path.join(__dirname, '/frontend/dist')))

// react app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`)
});