/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {

  //Error Handling
      if(typeof(obj1)!== 'object'  || typeof(obj2)!== 'object')
      {
            throw "Error: Both arguments passed should be an object";
      }
      if(Array.isArray(obj1)===true || Array.isArray(obj2)===true)
      {
            throw "Error: Arguments should be objects and not arrays";
      }   
      if(obj1 === null || obj2 === null)
      {
            throw "Error: Arguments passed are null";
      }

  if(obj1 === obj2) return true;
  if(obj1 === null || obj2 === null)
  {
      return false;
  }

  let obj1_keys = Object.getOwnPropertyNames(obj1);
  let obj2_keys = Object.getOwnPropertyNames(obj2);

  if(obj1_keys.length !== obj2_keys.length) return false;

  for(let key of obj1_keys) {
     
      if(typeof(obj1[key])==='object')
      {
            if(deepEquality(obj1[key],obj2[key])==false)
            {
                  return false;
            }
      }
      else
      {
            if(obj1[key]!==obj2[key])
            {
                  return false;
            }
      }
  } 
  return true;
};

let commonKeysValues = (obj1, obj2) => {

       //Error Handling
       if(typeof(obj1)!== 'object'  || typeof(obj2)!== 'object')
       {
             throw "Error: Both arguments passed should be an object";
       }
       if(Array.isArray(obj1)===true || Array.isArray(obj2)===true)
       {
              throw "Error: Arguments should be objects and not arrays";
       }   
       if(obj1 === null || obj2 === null)
       {
             throw "Error: Arguments passed are null";
       }

      obj1keys = Object.keys(obj1);
      obj2keys = Object.keys(obj2);
      let final = {};

      function checkEquality(fst,snd)
      {
            if(fst === snd) return true;
            if(fst === null || snd === null)
            {
                return false;
            }

            let f_keys = Object.getOwnPropertyNames(fst);
            let s_keys = Object.getOwnPropertyNames(snd);
          
            if(f_keys.length !== s_keys.length) return false;
            
            for(let key of f_keys) {
               
                if(typeof(fst[key])==='object')
                {
                      if(deepEquality(fst[key],snd[key]))
                      {
                        return false;
                      }
                }
                else
                {
                      if(fst[key]!==snd[key])
                      {
                            return false;
                      }
                }
            } 
            return true;
      }

      function comvalObjs(oj1,oj2)
      {
            oj_ky1=Object.keys(oj1);
            oj_ky2=Object.keys(oj2);

            for(let ky of oj_ky1)
            {
                  if(typeof(oj1[ky])==='object')
                  {
                        comvalObjs(oj1[ky],oj2[ky]);
                  }
                  else
                  {
                        if(oj1[ky]===oj2[ky])
                        {
                              final[ky]=oj1[ky];
                        }
                  }
            }
      }

      for (let key of obj1keys)
      {
            if(typeof(obj1[key])==='object')
            {
                  if(checkEquality(obj1[key],obj2[key]))
                  {
                        final[key]=obj1[key];
                  }
                  comvalObjs(obj1[key],obj2[key]);
            }
            else
            {
                  if(obj1[key]===obj2[key])
                  {
                        final[key]=obj1[key];
                  }
            }
      }
      return final;
};

let calculateObject = (object, func) => {

      //Error Handling
      if(typeof(object)!== 'object')
      {
            throw "Error: 1st Argument passed should be an object";
      }
      if(typeof(func)!=='function')
      {
            throw "Error: 2nd Argument passed should be a function";
      }
      if(Array.isArray(object)===true)
      {
            throw "Error: Arguments should be objects and not arrays";
      }   
      if(object===null || func===null)
      {
            throw "Error: Arguments passed are null";
      }
      for(let k in object)
      {
            if(typeof(object[k])!=='number')
            {
                  throw "Error: All elements in the object should be numbers";
            }
      }

      let new_obj={};
      let obj_keys=Object.keys(object);
      for(let ky of obj_keys)
      {  
         new_obj[ky]=Math.sqrt(func(object[ky])).toFixed(2);
      }
      return new_obj;
};

module.exports = {
      deepEquality,
      commonKeysValues,
      calculateObject,
}
