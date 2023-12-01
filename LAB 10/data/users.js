const mongoCollections = require('../config/mongoCollections');
const user_collection = mongoCollections.user_collection;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');

const createUser = async (
  username, password
) => { 
  //handling of username and password
let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
let spaces = /[ ]+/;
let alpha = /[A-Z]+/;
let numeric = /[0-9]+/;

  if(!username || !password || typeof(username)!=='string' || typeof(password)!=='string')
  {
    throw "Enter a valid usename and password";
  }
  if(username.trim().length===0 || password.trim().length===0)
  {
    throw "Enter a valid usename and password";
  }
  if(username.trim().length<4)
  {
    throw "Username should be atlest 4 letters";
  }

  if(spChars.test(username) || spaces.test(username))
  {
    throw "Username should be alphanumeric characters only without any spaces";
  }
  if(spaces.test(password))
  {
    throw "No spaces allowed in password";
  }
  if(password.trim().length<6)
  {
    throw "Passsword should be atleast 6 characters";
  }
  if(!spChars.test(password) || !alpha.test(password) || !numeric.test(password))
  {
    throw "Password should follow all the required constraints";
  }
//////////////////////////////////////////////////////////////////////////////////////////
  username=username.trim();
  username=username.toLowerCase();


  const usercollection = await user_collection();
  let check_user = await usercollection.findOne({ username: username});
  if(check_user!==null)
  {
    throw "User alreay registered";
  }

  const salt_rounds = 16;

  const hash = await bcrypt.hash(password,salt_rounds);

  let newObj = {
    username: username,
    password: hash
  }

  let user_entry = await usercollection.insertOne(newObj);
  if (!user_entry.acknowledged || !user_entry.insertedId)
  {
    throw 'Could not create user';
  }

  return {insertedUser: true}
};



const checkUser = async (username, password) => { 
  //handling of username and password
  let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let spaces = /[ ]+/;
  let alpha = /[A-Z]+/;
  let numeric = /[0-9]+/;
  
    if(!username || !password || typeof(username)!=='string' || typeof(password)!=='string')
    {
      throw "Enter a valid usename and password";
    }
    if(username.trim().length===0 || password.trim().length===0)
    {
      throw "Enter a valid usename and password";
    }
    if(username.trim().length<4)
    {
      throw "Username should be atlest 4 letters";
    }
  
    if(spChars.test(username) || spaces.test(username))
    {
      throw "Username should be alphanumeric characters only without any spaces";
    }
    if(spaces.test(password))
    {
      throw "No spaces allowed in password";
    }
    if(password.trim().length<6)
    {
      throw "Passsword should be atleast 6 characters";
    }
    if(!spChars.test(password) || !alpha.test(password) || !numeric.test(password))
    {
      throw "Password should follow all the required constraints";
    }
  //////////////////////////////////////////////////////////////////////////////////////////
  username=username.toLowerCase();
const usercollection = await user_collection();
let check_user = await usercollection.findOne({ username: username});
if(check_user===null)
{
  throw "User not found";
}

let compare_password = false;
compare_password = await bcrypt.compare(password,check_user.password);

if(compare_password===true)
{
  return {authenticatedUser: true};
}
else
{
  throw "Either the username or password is invalid";
}
};

module.exports = {
  createUser,
  checkUser
};
