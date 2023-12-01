/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/

let submit_btn = document.getElementById('submit_btn');
let textInput = document.getElementById('textInput');
let ul = document.getElementById('results');
let errorDiv = document.getElementById('errorDiv');
flag = 0;

submit_btn.addEventListener('click',(event)=>{

   let reg = /^[\[\]\ \-\d\,]+$/g;
   let reg_remove = /[\[\]\ ]+/g;
   let empty_arr_reg = /[\[]]/g;
   let empty_arr_with_commma = /[\[ , ]]+/g;

   
   let text="";
   let int_arr = [];
   event.preventDefault();
   let last_comma_flag=0;

   errorDiv.hidden = false;
   errorDiv.innerHTML = "Successfull";
   errorDiv.className = "is-valid";
   if(textInput)
   {
    let li = document.createElement('li');
    let str = textInput.value.trim();

    for(let i=0;i<str.length;i++)
    {
        if(str.charAt(i)===']')
        {
            let cnt = i;
            cnt=cnt-1;
            while(true)
            {
                if(str.charAt(cnt)!==' ')
                {
                    break;
                }
                str=str.substring(0,cnt)+str.substring(cnt+1,str.length)
                cnt--;
            }
        }
    }
    console.log(str.charAt(str.length-1));
    

    if((str[str.length-1]==',' && str[str.length-2]==',') || str[0]==',' || str.includes(',,') || str.includes('[,') || str.includes(',]') || str.includes(']['))
    {
        last_comma_flag=1;
    }
    if(str.charAt(str.length-1)!=',' && str.charAt(str.length-1)!=']')
    {
        last_comma_flag=1;
    }
    if(str.charAt(str.length-1)==',')
    {
        if(str.charAt(str.length-2)!=']')
        {
            last_comma_flag=1;
        }
    }
    //
    // console.log(reg.test(str));
    // console.log(!empty_arr_reg.test(str));
    // console.log(!empty_arr_with_commma.test(str));

    //stack 
    let stack = [];
    let stack_flag = 0;
    let stack_inst = 0;
    for (a in str)
    {
        //console.log("at "+a+" interation");
        //console.log(stack);
        if(stack.length==0)
        {
            stack_inst=0;
        }
        if(stack_inst==1)
        {
            if(str[a]==']')
            {
                stack.pop();
                if(stack.length==0)
                {
                    stack_inst=0;
                }
            }
            else if(str[a]=='[')
            {
            stack.push("dumy");
            break;
            }
        }
        else if(str[a]=='[')
        {
            if(stack_inst==1)
            {
            stack.push("dumy");
            break;
            }
            else{
                stack.push(textInput[a]);
                stack_inst=1;
            }
        }
        else if(str[a]=="]" && stack_inst==0 && stack.length==0)
        {
            stack.push("dumy");
            break;
        }
    }

    if(stack.length===0)
    {
        stack_flag=1;
    }
    else
    {
        stack_flag=0;
    }
 /////////////////////////////////////////////////////////////


    if(reg.test(str) && !empty_arr_reg.test(str) && !empty_arr_with_commma.test(str) && stack_flag==1 && last_comma_flag==0)
    {
        text = str.replace(reg_remove,"");
        let arr = text.split(',');
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]=='')
            {
                continue;
            }
        
            int_arr.push(parseFloat(arr[i]));
            int_arr.sort((a,b)=> a-b);
        }

            //console.log(int_arr);
            li.innerHTML="["+int_arr+"]";
            if(flag==0)
            {
                li.className = "is-green";
                flag=1;
            }
            else{
                li.className = "is-red";
                flag=0;
            }
            
            ul.appendChild(li);   
    }
    else{
        errorDiv.className="not-valid";
        errorDiv.hidden = false;
        errorDiv.innerHTML = "Input Error";
    }

    textInput.value="";
    textInput.focus();
   }
   else
   {
    textInput.focus();
   }
   
});