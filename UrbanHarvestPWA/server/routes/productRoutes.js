import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
// @route   GET /api/products
// @desc    Get all products (optionally filtered by location)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { lat, lng, dist } = req.query;
        let query = {};

        if (lat && lng) {
            query.geometry = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: (parseFloat(dist) || 10) * 1000 // default 10km in meters
                }
            };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/products
// @desc    Create a product (Admin)
// @access  Public (for now)
router.post('/', async (req, res) => {
    // Construct geometry if lat/lng provided
    let geometry;
    if (req.body.lat && req.body.lng) {
        geometry = {
            type: 'Point',
            coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        };
    }

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        type: req.body.type,
        date: req.body.date,
        location: req.body.location,
        duration: req.body.duration,
        geometry: geometry
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
