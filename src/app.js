const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/user");

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

app.get("/index", (req,res) =>{

    res.render("index")

});
//create a new user in our database:

app.post("/index", async(req,res) =>{

    try{

        //console.log(req.body.Name);
        //res.send(req.body.Name);

        const pass1 = req.body.Password;
        const confirm_pass = req.body.Confrim_Password;

        if(pass1 == confirm_pass){
            const registerEmployee = new Register({
                Name: req.body.Name,
                Email : req.body.Email,
                Password: req.body.Password,
                Confrim_Password : req.body.Confrim_Password
            })

         const registered = await registerEmployee.save();
        res.status(201).render(index);

        }else{
            res.send("password do not match");
        }
        
    }catch(error){
        res.status(400).send(error);
    }

});


app.listen(port , () =>{
    console.log(`server is running at port no ${port}`);
})