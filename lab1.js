
function questionOne(arr) {
  // TODO: Implement question 1 here
  let output=[];
  for(let k=0;k<arr.length;k++)
  {
    output[k]=true;
  }
 
  for (let i=0;i<arr.length;i++)
  {
    let num=arr[i];
    if(num<=0 || num==1)
    {
      output[i]=false;
      continue;
    }

    let j=2;
    while(j<=num/2)
    {
        if(num%j==0)
        {
            output[i]=false;
            break;
        }
        j++;
    }
  }
  return output;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  if(startingNumber==0 || commonRatio==0)
  {
    return 0;
  }
  else if(numberOfTerms<=0 || numberOfTerms%1!=0)
  {
    return NaN;
  }
  
  let mul=startingNumber;
  let sum=mul;
  for(let i=1;i<numberOfTerms;i++)
  {
    mul*=commonRatio;
    sum+=mul;
  }
  return sum;
}

function questionThree(str) {
  // TODO: Implement question 3 here
let counter=0;
let str2=str.toLowerCase();

let m=str2.match(/[a-z]/gi);
console.log(m);
for (let i=0;i<m.length;i++)
{
    let char=m[i];
    if(char=="a"||char=="e"||char=="i"||char=="o"||char=="u")
    {
        continue;
    }
    else{
        counter++;
    }
}
return counter;
}

function questionFour(fullString, substring) {
  // TODO: Implement question 4 here
 
  if(substring=='')
  {
    return 0;
  }

    let r=new RegExp(substring,'gi');
    //console.log(r);
    let arr=fullString.match(r);
  
  if(arr==null)
  {
    return 0;
  }
  else{
    return arr.length;
  }
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Chakravarti',
  lastName: 'Kothadiya',
  studentId: '20012229',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
