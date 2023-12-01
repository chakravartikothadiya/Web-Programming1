//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;
const validateID = require('../helpers');

router
  .route('/')
  .get(async(req,res)=>{
    try{
      const all_pokemon = await pokemonData.pokemon();
      res.json(all_pokemon);
    } catch(e)
    {
      res.status(404).json(e);
    }
  })
//Request Method

router
  .route('/:id')
  .get(async(req,res)=>{
    try{
      validateID(req.params.id);
      const pokemon_id = await pokemonData.pokemonById(req.params.id);
      res.json(pokemon_id);
    } catch(e)
    {
      if(e==="invalid_id")
      {
        res.status(400).json({message: "Invalid URL Parameter"});
      }
      else
      {
        res.status(404).json({message: "Pokémon Not Found!"});
      }
    }
  })
//Request Method

module.exports = router;