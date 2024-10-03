// // models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['Organizer'], default: 'Organizer' },
//      // Only organizer role is allowed
//     isApproved: { type: Boolean, default: false } // Field to check if the organizer is approved
// });

// module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['volunteer', 'Organizer'],
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isSuspended: {  // Add this field to track suspension
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('User', userSchema);
