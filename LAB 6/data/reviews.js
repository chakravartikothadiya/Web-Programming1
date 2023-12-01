const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');
const { reviews } = require('.');

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {

  //Handling all the parameters
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating) {
    throw "All fields need to have valid values";
  }

  if (typeof (movieId) !== 'string' || typeof (reviewTitle) !== 'string' || typeof (reviewerName) !== 'string' || typeof (review) !== 'string') {
    throw "Error: Fields must be in string format";
  }

  if (movieId.trim().length === 0 || reviewTitle.trim().length === 0 || reviewerName.trim().length === 0 || review.trim().length === 0) {
    throw "Error: Field should not be an empty string";
  }


  //trimming all the parameters
  movieId = movieId.trim();
  reviewTitle = reviewTitle.trim();
  reviewerName = reviewerName.trim();
  review = review.trim();

  //Handling movieId
  if (!ObjectId.isValid(movieId)) {
    throw "Error: invalid object ID";
  }

  //Handling rating
  if (typeof (rating) !== 'number' || rating > 5 || rating < 1) {
    throw "Error: rating should be a number between 1-5";
  }
  if(rating!=rating.toFixed(1))
  {
    throw "Rating should be upto 1 decimal";
  }
  rating=rating.toFixed(1);
  if (rating % 1 !== 0) {
    if (rating > 4.8 || rating < 1.5) {
      throw "Error: decimal should be in between range 1.5 - 4.8 if it is a float"
    }
  }

  let Date1 = new Date();
  //handling Date
  let day = Date1.getDate();
  let mon = Date1.getMonth() + 1;
  let yer = Date1.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (mon < 10) {
    mon = '0' + mon;
  }
  const reviewDate = mon + "/" + day + "/" + yer;


  //Getting new ID
  const id = new ObjectId();

  //Creating a new object to be inserted
  const newReviewObj = {
    _id: id,
    reviewTitle: reviewTitle,
    reviewDate: reviewDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  }

  const movieCollection = await movies();

  //Fetching once for Computing overall rating 
  const fetch1 = await movieCollection.findOne({_id:ObjectId(movieId)})
  if (fetch1 === null) {
    throw "404";
  }

  //Calculating the average rating 
  let counter=0;
  let sum=0;
  let rev_arr = fetch1.reviews;
  for(let j=0;j<rev_arr.length;j++)
  {
    sum=sum+parseFloat(rev_arr[j].rating);
    counter++;
  }
  sum+=parseFloat(rating);
  counter++;

  let overallRating = sum/counter;
  overallRating=overallRating.toFixed(1);


  //Updating movies by pushing the new review object
  const addReview = await movieCollection.updateOne({ _id: ObjectId(movieId) }, { $push: { reviews: newReviewObj}});
  if (addReview.modifiedCount === 0) {
    throw '404';
  }
  const addOvRat = await movieCollection.updateOne({ _id: ObjectId(movieId) }, { $set:{overallRating:overallRating}});
  if (addOvRat.modifiedCount === 0) {
    throw '404';
  }
 
  //fetch again
  const updatedObj = await movieCollection.findOne({ _id: ObjectId(movieId) });
  if (updatedObj === null) {
    throw "404";
  }

  //Converting Obj ID to string 
  updatedObj._id = updatedObj._id.toString();

  //Return whole movie
  return updatedObj;
};

const getAllReviews = async (movieId) => {
  //Handling movieID
  if (!movieId || typeof (movieId) !== 'string' || movieId.trim().length === 0) {
    throw {code:400,error:"Id should be a valid non-empty string"};
  }
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) {
    throw {code:400,error:"Invalid object ID"};
  }

  const reviewCollection = await movies();
  const movie_by_id = await reviewCollection.findOne({ _id: ObjectId(movieId) }, { projection: { _id: 1, reviews: 1 } });
  if (movie_by_id === null) {
    throw {code:404,error:"No movie by this ID found"};
  }

  if(movie_by_id.reviews.length===0)
  {
    throw {code:404,error:"No reviews for the given movie found"};
  }

  //Return Array of reviews
  return movie_by_id.reviews;
};

const getReview = async (reviewId) => {
  //Handling reviewId
  if (!reviewId || typeof (reviewId) !== 'string' || reviewId.trim().length === 0) {
    throw {code:400,error:"Id should be a valid non-empty string"};
  }
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) {
    throw {code:400,error:"Invalid object ID"};
  }

  const movieCollection = await movies();
  const review_by_id = await movieCollection.findOne({ "reviews._id": ObjectId(reviewId) });
  if (review_by_id === null) {
    throw {code:404,error:"No review by this ID"};
  }

  const rev_arr = review_by_id.reviews;
  let flag=0;
  for (let i = 0; i < rev_arr.length; i++) {
    if (rev_arr[i]._id.toString() === reviewId) {
      rev_arr[i]._id = rev_arr[i]._id.toString();
      flag ==1;
      return rev_arr[i];
    }
  }

  if(flag==0)
  {
    throw {code:404,error:"No review by this ID"};
  }
};

const removeReview = async (reviewId) => {
  //Handling reviewId
  if (!reviewId || typeof (reviewId) !== 'string' || reviewId.trim().length === 0) {
    throw {code:400,error:"Id should be a valid non-empty string"};
  }
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) {
    throw {code:400,error:"Invalid object ID"};
  }

  const movieCollection = await movies();

  
  //first get the movie ID who's review to be deleted
  const review_by_id = await movieCollection.findOne({ "reviews._id": ObjectId(reviewId) });
  if (review_by_id === null) {
    throw {code:404,error:"No review by this ID"};
  }
  
  //setiing the movie ID
  let movieID = review_by_id._id.toString();

  const rev_arr = review_by_id.reviews;
  let rev_obj = {};
  for (let i = 0; i < rev_arr.length; i++) {
    if (rev_arr[i]._id.toString() === reviewId) {
      rev_arr[i]._id = rev_arr[i]._id.toString();
      rev_obj=rev_arr[i];
      break;
    }
  }

  
  //Recalculating the overall rating
   let counter = 0;
   let sum = 0;
   let new_sum = 0;
   let new_overallRating = 0;
   sum = review_by_id.overallRating;
   counter = rev_arr.length;
   new_sum = sum * counter;
   new_sum-= rev_obj.rating;
   counter--;
   if(counter==0)
   {
    new_overallRating=0;
   }
   else
   {
    new_overallRating = new_sum/counter;
   }
  
  new_overallRating=new_overallRating.toFixed(1);
  
  // remove the desired review
  const review_to_be_deleted = await movieCollection.updateOne({ reviews: { $elemMatch: { _id: ObjectId(reviewId) } } }, { $pull: { reviews: { _id: ObjectId(reviewId) } } });
  if (review_to_be_deleted.modifiedCount === 0) {
    throw {code:404,error:"Could not delete review with given id"};
  }

  //Updating with the new overallRating
  const upOvRat = await movieCollection.updateOne({ _id: ObjectId(movieID) }, { $set:{overallRating:new_overallRating}});
  if (upOvRat.modifiedCount === 0) {
    throw {code:404,error:"Could not update movie successfully"};
  }

  //Fetching the movie again to display the object
  const fetchagain = await movieCollection.findOne({ _id: ObjectId(movieID)});
  if(fetchagain===null)
  {
    throw {code:404,error:"Could not find the movie after removing the review"};
  }
  fetchagain._id=fetchagain._id.toString();

  return fetchagain;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
