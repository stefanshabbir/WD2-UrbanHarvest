import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import bookingRoutes from './routes/bookingRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/products', productRoutes);
app.get('/', (req, res) => res.send('Urban Harvest Hub API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
