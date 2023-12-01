//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const validate_user_pass = (username, password) =>{
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
};

module.exports = validate_user_pass;
