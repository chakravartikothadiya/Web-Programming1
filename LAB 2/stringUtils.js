/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {

      //Error Handling
      if(typeof(string)!='string')
      {
            throw "Error: Element passed is not a string";
      }
      if(string.length===0)
      {
            throw "Error: Empty String";
      }
      if(string===null || string===undefined)
      {
            throw "Error: Pass a string"
      }
      if(string.trim().length===0)
      {
            throw "Error: String with only spaces is not valid";
      }
     string=string.replace(/[^a-zA-Z ]/g,"");
     let array = string.split(" ");
     let ans=[];
     for(let i=0;i<array.length;i++)
     {
      let str1=array[i];
      let str2=array[i].split("").reverse().join();
      str2=str2.replace(/[^a-zA-Z ]/g,"");
      if(str1.toLowerCase() == str2.toLowerCase())
      {
            ans.push(array[i]);
      }
      else{
            continue;
      }
     }
     return ans;
};

let replaceChar = (string) => {

      //Error Handling
      if(typeof(string)!='string')
      {
            throw "Error: Element passed is not a string";
      }
      if(string.length===0)
      {
            throw "Error: Empty String";
      }
      if(string.trim().length===0)
      {
            throw "Error: String with only spaces is not valid";
      }
      if(string===null || string===undefined)
      {
            throw "Error: Pass a string"
      }

      let arrar=[];
      let final="";
      for(let i=0;i<string.length;i++)
      {
            if(i==1 || i%4==1)
            {
                  arrar.push("*");
            }
            else if(i==3 || i%4==3)
            {
                  arrar.push("$");
            }
            else
            {
                  arrar.push(string[i]);
            }
      }
      final=arrar.join('');
      return final;
};

let charSwap = (string1, string2) => {

      //Error Handling
      if(typeof(string1)!='string' || typeof(string2)!='string')
      {
            throw "Error: One or more elements passed is not a string";
      }
      if(string1.length===0 || string2.length===0)
      {
            throw "Error: Empty String";
      }
      if(string1.length<4 || string2.length<4)
      {
            throw "Error: length of the strings should be atleast 4";
      }
      if(string1 ===null || string1===undefined || string2===null || string2===undefined)
      {
            throw "Error: Pass a string"
      }
      if(string1.trim().length===0 || string2.trim().length===0)
      {
            throw "Error: String with only spaces is not valid";
      }

      let sub1=string1.substring(0,4);
      let sub12=string1.substring(4,string1.length);
      let sub2=string2.substring(0,4);
      let sub22=string2.substring(4,string2.length);
      let string3=sub2+sub12+" "+sub1+sub22;
      return string3;
};

module.exports = {
      palindromes,
      replaceChar,
      charSwap,
}

