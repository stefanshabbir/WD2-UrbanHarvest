import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const products = [
    {
        title: 'Organic Vegetable Box',
        description: 'Weekly delivery of fresh, seasonal organic vegetables from local farms.',
        longDescription: 'Experience the freshest produce with our weekly Organic Vegetable Box. We partner with over 50 local farms to bring you a curated selection of seasonal vegetables, picked at peak ripeness and delivered within 24 hours of harvest. Each box contains 8-10 different vegetables, enough to feed a family of four for a week. Our farmers follow strict organic practices, using no synthetic pesticides or fertilizers.',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
        category: 'food',
        type: 'product',
        inStock: true,
    },
    {
        title: 'Urban Composting Workshop',
        description: 'Learn how to turn kitchen scraps into garden gold in this hands-on workshop.',
        longDescription: 'Join us for an immersive 3-hour workshop where you\'ll learn the art and science of composting in urban environments. Perfect for apartment dwellers and homeowners alike, this workshop covers everything from vermicomposting to bokashi fermentation. You\'ll leave with a starter kit and the confidence to reduce your kitchen waste by up to 80%.',
        price: 25.00,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
        category: 'education',
        type: 'workshop',
        date: 'Jan 15, 2025',
        location: 'Urban Harvest Community Center',
        duration: '3 hours',
        inStock: true,
    },
    {
        title: 'Bamboo Starter Kit',
        description: 'Complete eco-friendly bathroom essentials made from sustainable bamboo.',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800',
        category: 'lifestyle',
        type: 'product',
        inStock: true,
    },
    {
        title: 'Farm-to-Table Fruit Basket',
        description: 'Handpicked seasonal fruits sourced directly from local orchards.',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800',
        category: 'food',
        type: 'product',
        inStock: true,
    },
    {
        title: 'Rooftop Garden Basics',
        description: 'Transform your rooftop or balcony into a thriving urban garden.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800',
        category: 'education',
        type: 'workshop',
        date: 'Jan 22, 2025',
        inStock: true,
    },
    {
        title: 'Reusable Produce Bags',
        description: 'Set of 6 mesh bags for zero-waste grocery shopping.',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?w=800',
        category: 'lifestyle',
        type: 'product',
        inStock: false,
    },
];

const seedData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        console.log('Products Cleared...');

        await Product.insertMany(products);
        console.log('Data Imported!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
