const mongoose = require('../../../database');

const ProductsSchema = mongoose.Schema({

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stores',
        required: true,
    },
    title: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },

});

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;