// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const adsSchema = new Schema({
//     title: {
//         required: true,
//         type: String
//     },
//     description: {
//         required: true,
//         type: String
//     },
//     price: {
//         required: true,
//         type: Number
//     },
//     id: {
//         required: true,
//         type: String
//     },
//     images: {
//         required: true,
//         type: []
//     },
//     thumbnail: {
//         required: true,
//         type: String
//     },
//     stock: {
//         required: true,
//         type: Number
//     },
//     locations: {
//         required: true,
//         type: []
//     },
// });

// const Ads = mongoose.model('ads', adsSchema);

// export default Ads;

import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const Ads = mongoose.model('ads', itemSchema);

export default Ads;
