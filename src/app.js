const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/register");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path)); 
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res) =>{
    res.render("index")

});
//register
app.get("/register", (req,res) =>{

    res.render("register")

})

app.get("/login",(req,res)=> {
    res.render("login");
})
//create a new user in our database:

app.post("/register", async(req,res) =>{

    try{

        //console.log(req.body.name);
        //res.send(req.body.name);

        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        if(password === confirm_password){
            const registerEmployee = new Register({
                name : req.body.name,
                email : req.body.email,
                password: req.body.password,
                confirm_password : req.body.confirm_password
            })

         const registered = await registerEmployee.save();
         res.status(201).render("index");

        }else{
            res.send("password do not match");
        }
        
    }catch(error){
        res.status(400).send(error);
    }

})

//login check
app.post("/login",async(req,res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;

      const useremail =  await Register.findOne({email:email});
      //res.send(useremail.password);
      //console.log(useremail.password);
      if(useremail.password === password){
          res.status(201).render("index");
      }
      else{
          res.send("password does not matched")
      }

        //console.log(`${email} and password is ${password}`)
        
    } catch (error) {
        res.status(400).send("Invalid login details")
    }
})


app.listen(port , () =>{
    console.log(`server is running at port no ${port}`);
})