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
            _id: false,
            number: Number,
            prefix: Number,
        },
    ],
    updated_at: {
        type: Date,
        default: Date.now,
    },
    logged_at: {
        type: Date,
        default: Date.now,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

if (!schema.options.toObject) {
    schema.options.toObject = {};
}

schema.options.toObject.transform = (doc, { _id, __v, ...ret }) => ({
    id: _id,
    ...ret,
});

module.exports = mongoose.model('Account', schema);
