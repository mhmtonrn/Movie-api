var express = require('express');
var router = express.Router();

/**
 * models
 */
const MovieSchema = require("../models/Movie");
/**
 * end models
 */

/**
 * get all movies
 */
router.get("/", (req, res) => {

    const allMovies = MovieSchema.find({});
    allMovies.then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(__dirname,"~/api-movie/ url hatası :", err)
    })

});
/**
 * end get all movies
 */
router.get("/:movie_id",(req,res)=>{
    //req.params => :movie_id
    const movieById = MovieSchema.findById(req.params.movie_id);
    movieById.then((movie)=>{
        res.json(movie);
    }).catch((err)=>{
        res.json("/api/movies/:movie_id =>",err);
        console.log("/api/movies/:movie_id =>",err);
    });

});

/**
 * save data
 */
router.post('/', (req, res, next) =>{
    const {title, imdb_score, category, country, year} = req.body;

    const movie = new MovieSchema({
        title: title,
        imdb_score: imdb_score,
        category: category,
        country: country,
        year: year
    });

    //const movie = new MovieSchema(req.body);

    const promise = movie.save();
    promise.then((savedData) => {
        if (savedData)
            res.json({status: "ok"});
    }).catch((err) => {
        if (err)
            console.log("movie save error:", err);
    });
});

/**
 * end save data
 */

module.exports = router;
