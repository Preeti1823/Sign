const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const employeeSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type : String,
        required : true
    },
    confirm_password:{
        type : String,
        required : true
    }
})

employeeSchema.pre("save", async function(next){

    if(this.isModified("password")){
        //const hashPassword = await bcrypt.hash(password,10);
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`);
        this.confirm_password = undefined;

    }
    next();
})

//create a collection
 const Register = new mongoose.model("Register",employeeSchema);
 module.exports = Register;