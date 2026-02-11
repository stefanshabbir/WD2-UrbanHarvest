import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();
        const count = await Product.countDocuments();
        console.log(`Product Count in DB: ${count}`);
        if (count > 0) {
            const p = await Product.findOne();
            console.log('Sample Product:', p.title);
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkData();
