const mongoose = require('../../../database');
const bcrypt = require('bcryptjs');

const StoresSchema = mongoose.Schema({

    name: {
        type: String,
        requerid: true,
    },
   
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    passwordResetToken: {
        type: String,
        select: false,
    },

    passwordResetExpires: {
        type: Date,
        select: false,
    },

    title: {
        type: String,
    },

    description: {
        type: String,
    },

    telefone: {
        type: String,
    },

    state: {
        type: String,
        requerid: true,
    },

    street: {
        type: String,
        requerid: true,
    },

    city: {

        type: String,
        requerid: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },

});

StoresSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const Stores = mongoose.model('stores', StoresSchema);

module.exports = Stores;