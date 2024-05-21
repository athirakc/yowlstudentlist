const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    enrollNumber: String,
    dateOfAdmission: Date
});

module.exports = mongoose.model('Student', studentSchema);
