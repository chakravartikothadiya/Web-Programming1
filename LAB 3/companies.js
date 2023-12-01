const axios = require("axios");

// function to get data from companies.json
const getCompanyData = async () => {
    const {data}= await axios.get("https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json");
    return data;
}

// function to get data from people.json
const getPeopleData = async () => {
    const {data}= await axios.get("https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json");
    return data;
}

const listEmployees = async (companyName) => {

    if(!companyName)
    {
        throw "Error";
    }
    else if(typeof(companyName)!=='string')
    {
        throw "Error";
    }
    else if(companyName.trim()==="")
    {
        throw "Error";
    }
    else if(companyName.trim().length===0)
    {
        throw "Error";
    }

    companyName=companyName.trim();
    let c_data = await getCompanyData();
    let p_data = await getPeopleData();
    let obj={};
    let flag=0;
    let emp=[];
    let e=0;
    let companyID="";

    for (let g=0;g<c_data.length;g++)
    {
        if(c_data[g].name===companyName)
        {
            companyID=c_data[g].id;
        }
    }

    for(let i=0;i<p_data.length;i++)
    {
        if(p_data[i].company_id===companyID)
        {
            let fname=p_data[i].first_name;
            let lname=p_data[i].last_name;
            emp[e]=fname+" "+lname;
            e++;
        }
    }

    //sort by last name
    for(let j=0;j<emp.length;j++)
    {
         emp.sort((n1,n2)=> n1.split(" ")[1].localeCompare(n2.split(" ")[1]));
    }

    for (let i=0;i<c_data.length;i++)
    {
        if(c_data[i].name===companyName)
        {
            c_data[i].employees = emp;
            obj=c_data[i];
            flag=1;
            break;
        }
    }

    if(flag===0)
    {
        throw `Error: No company name with ${companyName}`;
    }
    else
    {
        return obj;
    }
};

const sameIndustry = async (industry) => {

    if(!industry)
    {
        throw "Error";
    }
    else if(typeof(industry)!=='string')
    {
        throw "Error";
    }
    else if(industry.trim()==="")
    {
        throw "Error";
    }
    else if(industry.trim().length===0)
    {
        throw "Error";
    }

    industry=industry.trim();
    let c_data= await getCompanyData();
    let arr = [];
    let d=0;
    for(let i=0; i<c_data.length;i++)
    {
        if(c_data[i].industry.toLowerCase()===industry.toLowerCase())
        {
            arr[d]=c_data[i];
            d++;
        }
    }
    
    if(arr.length===0)
    {
        throw "error No companies in that industry  ";
    }

    return arr;
};

const getCompanyById = async (id) => {

    if(!id)
    {
        throw "Error";
    }
    else if(typeof(id)!=='string')
    {
        throw "Error";
    }
    else if(id.trim()==="")
    {
        throw "Error";
    }
    else if(id.trim().length===0)
    {
        throw "Error";
    }

    id=id.trim();
    let data = await getCompanyData();
    let obj={};
    let flag=0;
    for(let i=0;i<data.length; i++)
    {

        if(data[i].id===id)
        {
            obj=data[i];
            flag=1;
            break;
        }
    }
    if(flag===0)
    {
        throw "company not found";
    }
    else
    {
        return obj;
    }
};

module.exports = {
    listEmployees,
    sameIndustry,
    getCompanyById
};
