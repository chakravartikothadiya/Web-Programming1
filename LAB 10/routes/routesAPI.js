//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const data = require('../data');
const { title } = require('process');
const userData = data.users;
const validate = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try
    {
      //Check if the user is authenticated or not 
      if(!req.session.user)
      {
        res.render('userLogin',{title:"Login Form"});
      }
      else
      {
        res.redirect('/protected');
      }
    }
    catch(e)
    {
      res.render('userLogin',{title:"Login Form",error:e})
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try
    {
          //Check if the user is authenticated or not 
          if(!req.session.user)
          {
            res.render('userRegister',{title:"User Registeration"});
          }
          else
          {
            res.redirect('/protected');
          }  
    }
    catch(e)
    {
      res.render('userRegister',{title:"User Registeration",error:e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try
    {
      //Handling inputs here as well
      validate(req.body.usernameInput,req.body.passwordInput);
      const create = await userData.createUser(req.body.usernameInput,req.body.passwordInput);
      if(create.insertedUser===true)
      {
        res.redirect('/');
      }
      else
      {
       res.status(500).render('userRegister',{title:"User Registeration",error:"Internal Server Error"});
      }
    }
    catch(e)
    {
      res.status(400).render('userRegister',{title:"User Registeration",error:e});
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    try
    {
      //Handling inputs here as well
      validate(req.body.usernameInput,req.body.passwordInput);
      const pass_check = await userData.checkUser(req.body.usernameInput,req.body.passwordInput);
      if(pass_check.authenticatedUser===true)
      {
        req.session.user = {UserName:req.body.usernameInput,Password:req.body.passwordInput};
        res.redirect('./protected');
      }
    }
    catch(e)
    {
      res.status(400).render('userLogin',{title:"Login Form",error:e});
    } 
  })

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    res.render('private',{title:"Logged In",user:req.session.user.UserName,date_time:new Date().toUTCString()});
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.render('logout',{title:"Logged Out"});
  })

  module.exports=router;