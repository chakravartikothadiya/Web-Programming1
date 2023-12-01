//require express and express router as shown in lecture code

const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const validation = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      //call helpers validation
      validation.validate_ID(req.params.movieId);

      //call getAllReviews function 
      const all_movies = await reviewsData.getAllReviews(req.params.movieId);
      res.json(all_movies);
    } catch(e)
    {
      res.status(e.code).json(e.error);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try{
      const reivewData = req.body;
      const {reviewTitle, reviewerName, review, rating} = reivewData;

      //call helpers validation
      validation.validate_create_review(req.params.movieId,reviewTitle, reviewerName, review, rating);

      //call createReview function 
      const all_movies = await reviewsData.createReview(req.params.movieId,reviewTitle, reviewerName, review, rating);
      res.json(all_movies);
    } catch(e)
    {
        if(e==="404")
        {
           res.status(404).json("Could Not find the movie or failed to add");
        }
        else
        {
          res.status(400).json(e);
        }   
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try{
      //call helpers validation
      validation.validate_ID(req.params.reviewId);

      //call getReview function 
      const all_movies = await reviewsData.getReview(req.params.reviewId);
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
      validation.validate_ID(req.params.reviewId);

      //call removeReview function 
      const all_movies = await reviewsData.removeReview(req.params.reviewId);
      res.json(all_movies);
    } catch(e)
    {
      res.status(e.code).json(e.error);
    }
  });

  module.exports = router;