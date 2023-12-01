//Here you will require route files and export them as used in previous labs.

const ArraySortRouter = require('./sortArray');
const path = require("path");

const constructorMethod = (app) => {
    app.use('/',ArraySortRouter);
    app.use('*',(req,res) =>{
        res.redirect('/');
    });
};


module.exports = constructorMethod;