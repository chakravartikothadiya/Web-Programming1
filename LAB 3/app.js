/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

const people = require("./people");
const company = require("./companies");

async function main(){
    try{
        const peopledata = await people.getPersonById("8f94862b-f03e-40f3-a311-25970a5cc34a");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.sameJobTitle("marketing mAnager");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.getPostalCodes("New York City", "New York");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.sameCityAndState("New York City", "New York");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

     try{
        const peopledata = await company.listEmployees("O'Hara, Marquardt and Dare");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await company.sameIndustry("semiconductors");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await company.getCompanyById("7Cf7185c-a759-42a2-a673-031929e0cb27");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

main();
