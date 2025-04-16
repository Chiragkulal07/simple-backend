const express = require('express');
const app = express();
const usermodel = require("./models/user");
const postmodel = require("./models/post");

// app.set("view engine","ejs");
app.use((express.json()));
app.use(express.urlencoded({ extended: true }));
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');
app.set("views", path.join(__dirname, "views"));



// Uncomment the next line if you want to use cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/register', (req, res) => {

    res.render('index');
    // res.render('index');
});
app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    const user = await usermodel.findOne({ email });
    if (user) return res.status(500).send("user already created")


    bcrypt.genSalt
        (10, (err, Salt) => {
            bcrypt.hash(password, Salt, async (err, hash) => {
                console.log(hash);
              const user= await usermodel.create({
                    username,
                    email,
                    age,
                    name,
                    password:hash

                });
                
               let token= jwt.sign({email:email, userid:user._id},"chirag");
               res.cookie("token",token);
               res.send("registerd");

            });


        });

});
app.get("/login",(req,res)=>{
    
   res.render("login");

})

app.post("/login",async(req,res)=>{
    
   let {email,password}=req.body;
  const user= await usermodel.findOne({email});
  if(!user)return res.status(500).send("something went wrong");

  bcrypt.compare(password,user.password,function(err,result){
    if(result)res.status(500).send("you can login")
    else  res.status(500).send("something went wrong");
  })
 
 }),

app.listen(3000, () => {
    console.log('✅ Server running at http://localhost:3000');
    console.log('hi');
});
