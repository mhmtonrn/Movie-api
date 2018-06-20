const mongoose = require("mongoose");

module.exports = () => {
    //connect database
    mongoose.connect("mongodb://mhmtonrn:Mo4231666@ds147450.mlab.com:47450/movie-api_");

    mongoose.connection.on("open", () => {
        console.log(__dirname,"\\movie.js => veri tabanı bağlantısı gerçekleşti")
    });

    mongoose.connection.on("error",(err)=>{
        console.log(__dirname,"\\movie.js => veri tabanı bağlant hatası:"+err);
    });

    mongoose.Promise = global.Promise;

};