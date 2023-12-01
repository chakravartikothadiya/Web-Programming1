const { default: axios } = require("axios");

// function to get data from people.json
const getData = async () => {
    const {data}= await axios.get("https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json");
    return data;
}

const getPersonById = async (id) => {

    // Error handling
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

    // get people data
    let data = await getData();
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
        throw "Person Not Found";
    }
    else
    {
        return obj;
    }
};

const sameJobTitle = async (jobTitle) => {
   
    if(!jobTitle)
    {
        throw "Error";
    }
    else if(typeof(jobTitle)!=='string')
    {
        throw "Error";
    }
    else if(jobTitle.trim()==="")
    {
        throw "Error";
    }
    else if(jobTitle.trim().length===0)
    {
        throw "Error";
    }

    jobTitle=jobTitle.trim();
    let data = await getData();
    let arr=[];
    let k=0;
    for (let i=0;i<data.length;i++)
    {
        let str=data[i].job_title;
        if(str.toLowerCase()===jobTitle.toLowerCase())
        {
            arr[k]=data[i];
            k++;
        }
    }
    if(arr.length<2)
    {
        throw "Error since there are not two people with that job title";
    }
    return arr;
};

const getPostalCodes = async (city, state) => {

    if(!city || !state)
    {
        throw "Error";
    }
    else if(typeof(city)!=='string' || typeof(state)!=='string')
    {
        throw "Error";
    }
    else if(city.trim()==="" || state.trim()==="")
    {
        throw "Error";
    }
    else if(city.trim().length===0 || state.trim().length===0)
    {
        throw "Error";
    }

    city=city.trim();
    state=state.trim();
    let data = await getData();
    let arr=[];
    let k=0;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].city.toLowerCase()===city.toLowerCase() && data[i].state.toLowerCase()===state.toLowerCase())
        {
            arr[k]=parseInt(data[i].postal_code);
            k++;
        }
    }

    if(arr.length===0)
    {
        throw "Error: There are no postal_codes for the given city and state combination"
    }
    arr=arr.sort((a,b)=>(a-b));
    return arr;
};

const sameCityAndState = async (city, state) => {

    if(!city || !state)
    {
        throw "Error";
    }
    else if(typeof(city)!=='string' || typeof(state)!=='string')
    {
        throw "Error";
    }
    else if(city.trim()==="" || state.trim()==="")
    {
        throw "Error";
    }
    else if(city.trim().length===0 || state.trim().length===0)
    {
        throw "Error";
    }

    city=city.trim();
    state=state.trim();
    let data = await getData();
    let arr=[];
    let k=0;
    for(let i=0;i<data.length;i++)
    {
        if(data[i].city.toLowerCase()===city.toLowerCase() && data[i].state.toLowerCase()===state.toLowerCase())
        {
            let fname=data[i].first_name;
            let lname=data[i].last_name;
            arr[k]=fname+" "+lname;
            k++;
        }
    }

    if(arr.length<2)
    {
        throw "Error: there are not two people who live in the same city and state";
    }

    //sort by last name
    for(let j=0;j<arr.length;j++)
    {
        arr.sort((n1,n2)=> n1.split(" ")[1].localeCompare(n2.split(" ")[1]));
    }

    return arr;
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};

