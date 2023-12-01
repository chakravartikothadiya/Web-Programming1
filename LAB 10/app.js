// Setup server, session and middleware here.

const express = require('express');
const session = require('express-session');
const configureRoutes = require('./routes');
const exphbs = require("express-handlebars");
const { title } = require('process');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true
  })
);


app.use(async(req,res,next)=>{
  if(!req.session.user)
  {
    console.log("["+new Date().toUTCString()+"]:",req.method,req.originalUrl,"(Non-Authenticated User)");
  }
  else{
    console.log("["+new Date().toUTCString()+"]:",req.method,req.originalUrl,"(Authenticated User)");
  }
  next();
});

app.use('/protected',async(req,res,next) =>{
  if(!req.session.user)
  {
    return res.status(403).render('forbiddenAccess',{title:"Access Denied"});
  }
  next();
});


configureRoutes(app);
app.listen(3000, ()=>{
    console.log("Welcome");
    console.log("http://localhost:3000 is running");
});

