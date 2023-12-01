//Here you will require route files and export them as used in previous labs

const peopleRouter = require('./people');
const path = require("path");

const constructorMethod = (app) => {
    app.use('/',peopleRouter);
    app.use('*',(req,res) =>{
        res.status(404).json({error:'Not Found'})
    });
};



module.exports = constructorMethod;