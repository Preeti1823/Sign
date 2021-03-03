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
    confirm_password :{
        type : String,
        required : true
    }
})

//employeeSchema.pre("create",async function(next){
  //  if(this.ismodified("password")){
    //    this.password = await bcrypt.hash(this.password,10);
      //  this.confirm_password = undefined;
      //console.log(`${this.password}`)

    //}

    //next();
//})




//create a collection
 const Register = new mongoose.model("Register",employeeSchema);
 module.exports = Register; 