const mongoose = require('mongoose')
const studentSchema = mongoose.Schema;

student = new studentSchema({
    name: String,
    email: String,
    password: String
});
studentModel = mongoose.model('students', student);
module.exports = studentModel;