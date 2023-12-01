//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const { ObjectId } = require('mongodb');

const validate_create_movie = ( title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime) =>{

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
}

const validate_create_review = (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating ) =>
{
  //Handling all the parameters
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating) 
  {
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
  rating=rating.toFixed(1);
  if (rating % 1 !== 0) {
    if (rating > 4.8 || rating < 1.5) {
      throw "Error: decimal should be in between range 1.5 - 4.8 if it is a float"
    }
  }
}

const validate_ID = (Id) => {
 //Handling ID
 if(!Id || typeof(Id)!=='string' || Id.trim().length===0)
 {
   throw {code:400,error:"Error: id should be a valid non-empty string"};
 }
 if(!ObjectId.isValid(Id))
 {
   throw {code:400,error:"ID is not a valid object ID"};
 }
}

module.exports = {
    validate_create_movie,
    validate_create_review,
    validate_ID
}