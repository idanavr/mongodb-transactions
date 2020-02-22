const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
    }
);

module.exports = mongoose.model('User', userSchema);