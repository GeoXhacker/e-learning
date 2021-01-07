const mongoose = require('mongoose')
const studentSchema = mongoose.Schema;

student = new studentSchema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
studentModel = mongoose.model('students', student);
module.exports = studentModel;