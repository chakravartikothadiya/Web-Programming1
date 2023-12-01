/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
const connection = require('./config/mongoConnection');
const movies = require('./data/movies');

const main = async() => {
    
    //Setting up database connection
    const db = await connection.dbConnection();

    //Drop any initial available database
    await db.dropDatabase();

    let movie1 = undefined;
    let movie2 = undefined;
    let movie3 = undefined;

    //1. Creating a movie named 'Vikram Vedha'
    try{
        movie1 = await movies.createMovie("Vikram Vedha", "I have to watch the movie to know the plot of the movie",["Action","Drama","Thriller"], "PG", "United Artists", "Gayatri Pushkar",["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "01/31/1900","3h 59mins");
        console.log(movie1);
    }
    catch(e)
    {
        console.log(e);
    }

    //2. Creating 2nd movie named 
    try{
        movie2 = await movies.createMovie("Thor Ragnarok", "2017 American superhero film based on the Marvel Comics character Thor",["Action","Fantacy","Comedy"], "PG", "United Artists", "Taika Waititi",["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett", "Idris Elba"], "03/31/2017","2h 15mins");
    }
    catch(e)
    {
        console.log(e);
    }


    //3. Querrying all the movies
    try
    {
        const movie_list = await movies.getAllMovies();
        console.log(movie_list);
    }
    catch(e)
    {
        console.log(e);
    }

    //4. Creating the 3rd Movie named: 
    try{
        movie3 = await movies.createMovie("The Conjuring", "2021 American supernatural horror film ",["Thriller","Horror"], "PG", "Horror Studio", "Michael Chaves",["Vera Farmiga", "Patrick Wilson", "Ruairi OConnor"], "08/06/2021","2h 30mins");
        console.log(movie3);
    }
    catch(e)
    {
        console.log(e);
    }

    //5. Rename the 1st Movie: Vikram Vedha
    try
    {
        const updateMovie = await movies.renameMovie(movie1._id,"Vikram Vedha Part 1");
        console.log(updateMovie);
    }
    catch(e)
    {
        console.log(e);
    }

    //6. Remove the 2nd Movie: Thor Ragnarok 
    try
    {
        const deleted = await movies.removeMovie(movie2._id);
        console.log(deleted);
    }
    catch(e)
    {
        console.log(e);
    }

    //7. Querrying all the movies
    try
    {
        const movie_list = await movies.getAllMovies();
        console.log(movie_list);
    }
    catch(e)
    {
        console.log(e);
    }

    //8. Creating a movie with bad input paramaters ('JK' in rating)
    try{
        const movie1 = await movies.createMovie("Spiderman", "I have to watch the movie to know the plot of the movie",["Action","Drama","Thriller"], "JK", "United Artists", "Gayatri Pushkar",["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "01/31/1900","3h 59mins");
        console.log(movie1);
    }
    catch(e)
    {
        console.log(e);
    }

    //9. Removing a movie that does not exsist (putting random ID)
    try
    {
        const deleted = await movies.removeMovie("63460055b613fb34318125ez");
        console.log(deleted);
    }
    catch(e)
    {
        console.log(e);
    }

    //10 Renaming a movie that does not exsist
    try
    {
        const updateMovie = await movies.renameMovie("63460055b613fb34318125ez","42");
        console.log(updateMovie);
    }
    catch(e)
    {
        console.log(e);
    }

    //11. Renaming a movie with invalid newName data
    try
    {
        
        const updateMovie = await movies.renameMovie(movie1._id,"  ");
        console.log(updateMovie);
    }
    catch(e)
    {
        console.log(e);
    }

    //12. Getting a movie that does not exist
    try
    {
        const movie_by_id = await movies.getMovieById("63460055b613fb34318125ez");
        console.log(movie_by_id);
    }
    catch(e)
    {
        console.log(e);
    }

    //Closing the database connection
    await connection.closeConnection();
}


main();