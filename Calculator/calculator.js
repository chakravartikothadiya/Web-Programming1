
function checNumber(val, valname)
{
    if(typeof val!= "number"){throw `${valname}`}
}

module.exports ={
    addTwoNumbers: (num1,num2) => {
        
        checNumber(num1,"Input1 invalid");
        checNumber(num2,"Input2 invalid");
        return num1 + num2;
    },
    subTwoNumbers: (num1,num2) => {
        
        checNumber(num1,"Input1 invalid");
        checNumber(num2,"Input2 invalid");
        return num1 - num2;
    },
    mulTwoNumbers: (num1,num2) => {
        
        checNumber(num1,"Input1 invalid");
        checNumber(num2,"Input2 invalid");
        return num1 * num2;
    },
    divTwoNumbers: (num1,num2) => {
        
        checNumber(num1,"Input1 invalid");
        checNumber(num2,"Input2 invalid");
        return num1 / num2;
    }


}