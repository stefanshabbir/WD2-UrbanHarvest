import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        enum: ['food', 'lifestyle', 'education'],
    },
    type: {
        type: String,
        enum: ['product', 'workshop'],
        default: 'product'
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    // Workshop specific fields
    date: String,
    location: String,
    duration: String
});

export default mongoose.model('Product', productSchema);
