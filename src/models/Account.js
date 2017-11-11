const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: [
        {
            number: Number,
            prefix: Number,
        },
    ],
    updated_at: Date,
    logged_at: Date,
    created_at: Date,
});

module.exports = mongoose.model('Account', schema);
