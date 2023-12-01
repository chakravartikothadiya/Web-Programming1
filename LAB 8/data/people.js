//Axios call to get all data
const axios = require("axios");

const getAllPeople = async () => {
 const peopleData = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
 return peopleData;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    const pData = await getAllPeople();
    const pDataArr = pData.data;
    let matched =[];
    let onlytweenty = [];

    for(let i=0; i<pDataArr.length;i++)
    {
        if(pDataArr[i].firstName.toLowerCase().includes(searchPersonName.toLowerCase()) || pDataArr[i].lastName.toLowerCase().includes(searchPersonName.toLowerCase()))
        {
            matched.push(pDataArr[i]);
        }
    }

    //sorting and returning only 20 
    matched.sort((a,b)=>{return (a.id-b.id)});
    if(matched.length>20)
    {
        let j=0;
        while(j<20)
        {
            onlytweenty.push(matched[j]);
            j++;
        }
        return onlytweenty;
    }
    else
    {
        return matched;
    }  
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    const pData = await getAllPeople();
    const pDataArr = pData.data;
    let matched = {}

    for(let i=0; i<pDataArr.length;i++)
    {
        if(pDataArr[i].id.toString() === id)
        {
            matched = pDataArr[i];
            break;
        }
    }

    return matched;
};

module.exports = {
    searchPeopleByName, 
    searchPeopleByID 
};
