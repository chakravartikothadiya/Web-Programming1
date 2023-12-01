//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const validation = require('../helpers');
//const validateID = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try{
      const all_movies = await moviesData.getAllMovies();
      res.json(all_movies);
    } catch(e)
    {
      res.status(400).json(e);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      const movieData = req.body;
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieData;

      //call helpers validation
      validation.validate_create_movie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);

      //call createMovie function
      const all_movies = await moviesData.createMovie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(all_movies);
    } catch(e)
    {
      res.status(400).json(e);
    }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      //call helpers validation
      validation.validate_ID(req.params.movieId);

      //call getMovieById function
      const all_movies = await moviesData.getMovieById(req.params.movieId);
      res.json(all_movies);
    } catch(e)
    {
      res.status(e.code).json(e.error);
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      //call helpers validation
      validation.validate_ID(req.params.movieId);

      //call removeMovie function
      const all_movies = await moviesData.removeMovie(req.params.movieId);
      res.json(all_movies);
    } catch(e)
    {
      if(typeof(e)==='object')
      {
        res.status(e.code).json(e.error);
      }
      else
      {
        if(e==="404")
        {
           res.status(404).json("Could Not find the movie to be deleted");
        }
        else
        {
          res.status(400).json(e);
        }   
      }
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    try{
      const movieData = req.body;
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieData;

      //call helpers validation
      validation.validate_create_movie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      validation.validate_ID(req.params.movieId);

      //call updateMovie function
      const all_movies = await moviesData.updateMovie(req.params.movieId,title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(all_movies);
    } catch(e)
    {
      if(typeof(e)==='object')
      {
        res.status(e.code).json(e.error);
      }
      else
      {
        if(e==="404")
        {
           res.status(404).json("Could Not find the movie to be updated");
        }
        else
        {
          res.status(400).json(e);
        }   
      }
    }
  });

  module.exports = router;