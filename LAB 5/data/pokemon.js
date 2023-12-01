//Your data modules to make the Axios calls and get the data

const axios = require("axios");

const pokemon = async () => { 
    const {data}= await axios.get("https://pokeapi.co/api/v2/pokemon");
    return data;
};

const pokemonById = async (id) => {
    const {data}= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
 };

module.exports = {
    pokemon,
    pokemonById
};