//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

let str = "34.56";
let str2 = "0.43";
let str3 = "7";
let str4 = ".689";
let str5 = "545b";
let reg = /^[0-9.,]+$/
let substr = [];

if(str4===".")
{
    str4 = "0.00";
}
console.log(reg.test(str4));

if(str4.includes("."))
{
    substr = str4.split('.');
    if(substr[1].length>2)
    {
        console.log("Decimal shoulde be till 2");
    }

}


console.log(parseFloat(str4));