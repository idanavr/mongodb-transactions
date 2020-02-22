const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSyncSystems = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },
        system: {
            url: String,
            shouldUpdate: Boolean
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
    }
);

module.exports = mongoose.model('UserSyncSystems', userSyncSystems);