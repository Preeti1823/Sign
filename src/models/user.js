const mongoose = require("mongoose")
const employeeSchema = new mongoose.Schema({
    Name: {
        type:String,
        required : true
    },
    Email: {
        type: String,
        required : true,
        unique: true
    },
    Password: {
        type : String,
        required : true
    },
    Confirm_Password:{
        type : String,
        required : true
    }
})

//create a collection
 const Register = new mongoose.model("Register",employeeSchema);
 module.exports = Register;