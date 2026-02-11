import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, guests, notes } = req.body;

        // Basic Validation (Schema handles most, but we can check here too)
        if (!name || !email || !guests) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const booking = await Booking.create({
            name,
            email,
            phone,
            guests,
            notes,
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking confirmed successfully',
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/bookings
// @desc    Get all bookings (for Admin/Testing)
// @access  Public (Should be protected in prod)
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
