//Require express and express router as shown in lecture code and worked in previous labs

const express = require("express");
const router = express.Router();
const data = require('../data');
const pepData = data.people;
const path = require("path");

router.route("/").get(async (req, res) => {
  //code here for GET
  try
  {
    res.sendFile(path.resolve('static/homepage.html'));
  }
  catch(e)
  {
    res.status(400).render('error',{Error:e});
  }
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  try
  {
    let searchPersonName=req.body.searchPersonName;
    if(searchPersonName.trim().length===0)
    {
      throw "Error: Name not entered";
    }
    const searchpepdata = await pepData.searchPeopleByName(searchPersonName);
    if(searchpepdata.length===0)
    {
      return res.render('personNotFound',{searchPersonName:searchPersonName,title:"Person Not Found"});
    }
    res.render('peopleFound',{title:"People Found",result:searchpepdata,searchquerry:searchPersonName});
  }
  catch(e)
  {
    res.status(400).render('error',{Error:e,title:"Error"});
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  try
  {
    if(!req.params.id  || req.params.id.trim().length===0)
    {
      throw "Error: Cannot find ID to search the person";
    }
    const getdatabyID = await pepData.searchPeopleByID(req.params.id);
    res.render('personFoundByID',{title:"Person Found",result:getdatabyID})
  }
  catch(e)
  {
    res.status(400).render('error',{Error:e,title:"Error"});
  }
});

module.exports=router;