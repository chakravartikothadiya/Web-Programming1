/* Todo: Implment the functions below and then export them
    using the module.exports syntax. 
    DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {

//Error Handling
if(typeof(array)!=='object' && !Array.isArray(array))
{
  throw "Error: The element passed is not an array";
}
if(array===undefined || array===null)
{
  throw "Error: Array is undefined or empty";
}
if(array.length===0)
{
  throw "Error: Array is empty"
}
for(let i=0;i<array.length;i++)
{
  if(typeof(array[i])!=='number')
  {
    throw "Error: All elements of the arrays are not valid numbers";
  }
}

//mean
let mean=0;
let meadian=0;
let sum=0;
let range=0;
let sum_2=0;
let obj={};
array.sort((a,b)=>(a-b));
array.forEach(element => {
  sum+=element;
});
mean=sum/array.length;
//Adding Mean
obj.mean=mean;


//meadian
let mid=array.length/2;
mid=~~mid;
if(array.length%2==0)
{
  meadian=(array[mid-1]+array[(mid)])/2;
}
else
{
  meadian=array[mid];
}
//Adding Meadian
obj.median=meadian;

//mode
let obj1={};
let mode=[];
let maxf=0;
let same_flag=0;
array.forEach(elem => obj1[elem] = obj1[elem] + 1 || 1);
let dumy=[];
for(key in obj1)
{
  dumy.push(obj1[key]);
}
let m=dumy[0];
for(let j=0;j<dumy.length;j++)
{
  if(dumy[j]===m)
  {
      continue;
  }
  else{
      same_flag=1;
      break;
  }
}

for(const key in obj1)
{
    if(obj1[key]>maxf)
    {
        mode=[Number(key)];
        maxf=obj1[key];
    }
    else if(obj1[key]===maxf)
    {
        mode.push(Number(key));
    }
}

  mode=mode.sort((a,b)=>(a-b));
  if(same_flag==0)
  {
    obj.mode=0;
  }
  else if(mode.length===0)
  {
    obj.mode=0;
  }else if(mode.length===1)
  {
    obj.mode=Number(mode[0]);
  }
  else
  {
    obj.mode=mode;
  }

//range
range=array[array.length-1]-array[0];
obj.range=range;

//minimum
obj.minimum=array[0];
obj.maximum=array[array.length-1];
obj.count=array.length;
array.forEach(element=>{
  sum_2+=element;
})
obj.sum=sum_2;

 return obj;
};

let makeObjects = (...arrays) => {
//this function takes in a variable number of arrays that's what the ...arrays signifies

  if(typeof(arrays)!=='object' || Array.isArray(arrays)==false)
  {
    throw "Error: The element passed is not an array";
  }
  if(arrays===undefined || arrays===null)
  {
    throw "Error: Array is undefined or empty";
  }
  if(arrays.length===0)
  {
    throw "Error: Array is empty"
  }

for(let i=0;i<arrays.length;i++)
{
  if(typeof(arrays[i])!=='object' || Array.isArray(arrays[i])==false)
  {
    throw "Error: The element passed is not an array";
  }
  if(arrays[i]===undefined || arrays[i]===null)
  {
    throw "Error: Array is undefined or empty";
  }
  if(arrays[i].length===0)
  {
    throw "Error: Array is empty"
  }
  if(arrays[i].length!==2)
  {
    throw "Error: Arrays should only have 2 elements each";
  }
}

let obj={}
for(let i=0;i<arrays.length;i++)
{
    let key=arrays[i][0];
    let value=arrays[i][1];
    obj[key]=value;  
}
return obj;
};

let commonElements = (...arrays) => {
//this function takes in a variable number of arrays that's what the ...arrays signifies

if(typeof(arrays)!=='object' || Array.isArray(arrays)==false)
  {
    throw "Error: The element passed is not an array";
  }
  if(arrays===undefined || arrays===null)
  {
    throw "Error: Array is undefined or empty";
  }
  if(arrays.length===0)
  {
    throw "Error: Array is empty";
  }
  if(arrays.length<2)
  {
    throw "Error: Atleast 2 arrays should be passed";
  }

for(let i=0;i<arrays.length;i++)
{
  if(typeof(arrays[i])!=='object' || Array.isArray(arrays[i])==false)
  {
    throw "Error: The element passed is not an array";
  }
  if(arrays[i]===undefined || arrays[i]===null)
  {
    throw "Error: Array is undefined or empty";
  }
  if(arrays[i].length===0)
  {
    throw "Error: Array is empty"
  }
}


let arr=[];
let flags=[];
function checkArray(arrayOne, arrayTwo)
{
  if(arrayOne.length!==arrayTwo.length)
  {
    return false;
  }
  return arrayOne.every((val)=>{return arrayTwo.includes(val); });
}

for(let n=0;n<arrays[0].length;n++)
{
  flags[n]=[];
  for(let h=0;h<arrays.length-1;h++)
  {
    flags[n][h]=0;
  }
}

let element=0;
let c=0;
let p_flag=0;

  for(let j=0;j<arrays[0].length;j++)
  {
    element=arrays[0][j];
    for(let k=1;k<arrays.length;k++)
    {
      for(let m=0;m<arrays[k].length;m++)
      {
        if(typeof(element)=='object')
        {
          if(checkArray(arrays[k][m],element))
          {
            flags[j][k-1]=1;
          }
          else
          {
            continue;
          }
        }
        else
        {
              if(arrays[k][m]==element)
              {
                  flags[j][k-1]=1;
                  break;
              }
              else
              {
                  continue;
              }
        }
      }
    }
    for(let l=0;l<arrays.length-1;l++)
    {
      if(flags[j][l]!==1)
      p_flag=1;
      break;
    }
    if(p_flag==0)
    {
      arr[c]=element;
      c++;
    }
    p_flag=0;
  }

return arr;
};


module.exports = {
  arrayStats,
  makeObjects,
  commonElements,
};


