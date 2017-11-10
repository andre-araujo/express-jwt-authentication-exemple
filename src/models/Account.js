const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: [
        {
            number: Number,
            prefix: Number,
        },
    ],
});

module.exports = mongoose.model('Account', schema);
