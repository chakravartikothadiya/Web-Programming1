const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId, MongoMissingCredentialsError} = require('mongodb');
const { stringify } = require('querystring');
const { moveMessagePortToContext } = require('worker_threads');

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
 ) => {

  if(!title || !plot || !genres || !rating || !studio || !director || !castMembers || !dateReleased || !runtime)
  {
    throw "All fields need to have valid values";
  }

  if(typeof(title) !=='string' || typeof(plot) !== 'string' || typeof(rating) !== 'string' || typeof(studio) !== 'string' || typeof(director) !=='string' || typeof(dateReleased) !== 'string' || typeof(runtime) !== 'string')
  {
    throw "Error: Fields must be in string format";
  }

  if(title.trim().length === 0 || plot.trim().length === 0 || rating.trim().length === 0 || studio.trim().length === 0 || director.trim().length === 0 )
  {
    throw "Error: Field should not be an empty string";
  }


  let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let num = /[0-9]/;

  //Handling for title
  title=title.trim();
  if(title.trim().length<2)
  {
    throw "Title length should be atleast 2 characters";
  }
  if(spChars.test(title))
  {
    throw "Title should not have special characters";
  }

  //Handling for studio
  studio= studio.trim();
  if(studio.trim().length<5)
  {
    throw "Studio length should be atleast 5 characters";
  }

  if(spChars.test(studio) || num.test(studio))
  {
    throw "Studio should not have special characters or numbers";
  }

  //Handling director
  director=director.trim();
  let strArr = director.split(" ");
  if(strArr.length!==2)
  {
    throw "Incorrect Name format";
  }
  let str1 = strArr[0];
  let str2 = strArr[1];
 
  if(spChars.test(str1) || num.test(str1) || spChars.test(str2) || num.test(str2))
  {
    throw "Director Name should not have special characters or numbers";
  }
  if(str1.length<3 || str2.length<3)
  {
    throw "Firname and Lastname should have atleast 3 characters";
  }

  //Handling rating 
  rating=rating.trim();
  if(rating !=='G' && rating !=='PG' && rating !== 'PG-13' && rating !== 'R' && rating !=='NC-17')
  {
    throw "Error: Not a valid value for rating";
  }


  //Handling genres
  if(typeof(genres)!== 'object' || Array.isArray(genres)!==true || genres.length===0)
  {
    throw "Error: Genres should be an array with atleast 1 string element"
  }

  for(let i=0;i<genres.length;i++)
  {
    
    if(typeof(genres[i])!=='string' || genres[i].trim().length===0)
    {
      throw "Error: Genres should have valid strings";
    }
    genres[i]=genres[i].trim();
    if(genres[i].trim().length<5)
    {
      throw "Error: length of each string in genres should be at least 5";
    }

    if(spChars.test(genres[i]) || num.test(genres[i]))
    {
      throw "Error: No numbers or special characters or punctuation in genres";
    }
  }

  //Handling castMembers
  if(typeof(castMembers)!== 'object' || Array.isArray(castMembers)!==true || castMembers.length===0)
  {
    throw "Error: castMembers should be an array with atleast 1 string element"
  }

  for(let i=0;i<castMembers.length;i++)
  {
    
    if(typeof(castMembers[i])!=='string' || castMembers[i].trim().length===0)
    {
      throw "Error: castMembers should have valid strings";
    }
    castMembers[i]=castMembers[i].trim();
    if(castMembers[i].trim().length<5)
    {
      throw "Error: length of each string in castMembers should be at least 5";
    }

    let castSplitArray = castMembers[i].split(" ");
    if(castSplitArray.length!==2)
    {
      throw "Incorrect Name format";
    }
    let fname = castSplitArray[0];
    let lname = castSplitArray[1];
   
    if(spChars.test(fname) || num.test(fname) || spChars.test(lname) || num.test(lname))
    {
      throw "Error: In CastMembers Name should not have special characters or numbers";
    }
    if(fname.length<3 || lname.length<3)
    {
      throw "Error: In CastMembers, Firname and Lastname should have atleast 3 characters";
    }
  }

  //dataReleased
  dateReleased=dateReleased.trim();
  let dateregex=/^\d{1,2}\/\d{1,2}\/\d{4}$/
  if(dateregex.test(dateReleased)!==true)
  {
    throw "Error: Invalid date format";
  }

  let dateparts = dateReleased.split("/");
  let month = parseInt(dateparts[0]);
  let day = parseInt(dateparts[1]);
  let year = parseInt(dateparts[2]);
  
  let currentdate = new Date();
  let currentYear = currentdate.getFullYear();
  if(year>currentYear+2 || year<1900)
  {
    throw "Error: Date should neither be greater than 2 years form now nor less than 1900";
  }

  if(month>12 || month<=0 || day<=0 || day>31)
  {
    throw "Error: Invalid date";
  }

  let thirtydaysmonths =[4,6,9,11];
  let thirtydayflag =0;
  for(let i =0;i<thirtydaysmonths.length;i++)
  {
    if(month === thirtydaysmonths[i])
    {
      thirtydayflag = 1;
      break;
    }
  }
 
  if((thirtydayflag ===1 && day===31) || (month === 2 && day>29))
  {
    throw "Error: invalid day for this month";
  }
  thirtydayflag = 0;

  //Handling runtime
  let runtimeregex = /[0-9]+h\s+[0-9]+min/
  if(runtimeregex.test(runtime)===false)
  {
    throw "Error: runtime not in valid format";
  }
  let hour = parseFloat(runtime.split("h")[0]);
  let min = parseFloat(runtime.split("h")[1].split("min")[0]);

  if(hour%1!==0 || min%1!==0)
  {
    throw "Error: hours and mins should be whole numbers";
  }
  if(hour<=0 || min <0 || min>59)
  {
    throw "Error: hours and mins should be whole numbers, hour should be at least 1 and mins should be 59 max";
  } 

  //Handling plot
  plot=plot.trim();

  const movieCollection = await movies();

  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  };

  //Inserting the newly created object
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
  {
    throw 'Could not movie';
  }
  
  //Fetching the newly inserted object 
  let newMovieObj = await movieCollection.findOne({_id: insertInfo.insertedId});
  newMovieObj._id=newMovieObj._id.toString();

  return newMovieObj;
};




const getAllMovies = async () => {
  const movieCollection = await movies();
  const getMovies = await movieCollection.find({}).toArray();
  if(!getMovies) throw "Could not find any movie";

  for(let j=0;j<getMovies.length;j++)
  {
    getMovies[j]._id = getMovies[j]._id.toString();
  }
  return getMovies;
};




const getMovieById = async (id) => {

  //Handling ID
  if(!id || typeof(id)!=='string' || id.trim().length===0)
  {
    throw "Error: id should be a valid non-empty string"
  }
  id=id.trim();
  if(!ObjectId.isValid(id))
  {
    throw "Error: invalid object ID";
  }
  const movieCollection = await movies();
  const movie_by_id = await movieCollection.findOne({_id: ObjectId(id)});
  if(movie_by_id === null) 
  {
    throw "No movie by this ID";
  }

  movie_by_id._id = movie_by_id._id.toString();
  return movie_by_id;
};




const removeMovie = async (id) => {
  if(!id || typeof(id)!=='string' || id.trim().length===0)
  {
    throw "Error: id should be a valid non-empty string"
  }

  id=id.trim();
  
  if(!ObjectId.isValid(id))
  {
    throw "Error: invalid object ID";
  }
  const movieCollection = await movies();

  const Movie_to_be_deleted = await movieCollection.findOne({_id: ObjectId(id)});
  if(Movie_to_be_deleted === null) 
  {
    throw `Could not delete movie with id of ${id}`;
  }
  let Name_of_movie_to_be_deleted = Movie_to_be_deleted.title;

  const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(id)});
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;}

   return `${Name_of_movie_to_be_deleted} has been successfully deleted!`;
};




const renameMovie = async (id, newName) => {

  if(!id || typeof(id)!=='string' || id.trim().length===0 || !newName || typeof(newName)!=='string' || newName.trim().length ===0)
  {
    throw "Error: id and title should be a valid non-empty string"
  }
  id=id.trim();
  newName=newName.trim();

  if(!ObjectId.isValid(id))
  {
    throw "Error: invalid object ID";
  }
  if(newName.trim().length<2)
  {
    throw "New title length should be atleast 2 characters";
  }
  let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if(spChars.test(newName))
  {
    throw "New title should not have special characters";
  }

  const movieCollection = await movies();
 
  const updatedMovie = {
    title: newName,
  };

  const beforeUpdate = await movieCollection.findOne({_id: ObjectId(id)});
  if(beforeUpdate === null)
  {
    throw 'could not find the movie to be updated';
  }
  if(beforeUpdate.title===newName)
  {
    throw "Error: the current title and new title are the same";
  }

  const updateInfo = await movieCollection.updateOne({_id: ObjectId(id)},{$set: updatedMovie});
  if (updateInfo.modifiedCount === 0) {
    throw 'could not update movie successfully';
  }

  const updatedObj = await movieCollection.findOne({_id: ObjectId(id)});
  if(updatedObj === null)
  {
    throw "Error: fetching failed after update";
  }

  updatedObj._id =updatedObj._id.toString();

  return updatedObj;
};




module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
