import mongoose from "mongoose";
const { Schema } = mongoose;

const adsSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    id: {
        required: true,
        type: String
    },
    images: {
        required: true,
        type: []
    },
    thumbnail: {
        required: true,
        type: String
    },
    stock: {
        required: true,
        type: Number
    },
    locations: {
        required: true,
        type: []
    },
});

const Ads = mongoose.model('ads', adsSchema);

export default Ads;