/**
 * pageCode :MonarchMrm001
 */
const pageCode ="MonarchMrm001";

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

/**
 * top 10 list
 */
router.get("/top10", (req, res) => {

    const allMovies = MovieSchema.find({}).sort({imdb_score : -1}).limit(10);
    allMovies.then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(__dirname,"~/api-movie/ url hatası :", err)
    })

});
/**
 * end top 10 list
 */

/**
 * get movie with by id
 */
router.get("/:movie_id",(req,res,next)=>{
    //req.params => :movie_id
    const movieById = MovieSchema.findById(req.params.movie_id);
    movieById.then((movie)=>{
        if (!movie){
            next({message :"data dönmedi", code:1});
        }

        res.json(movie);
    }).catch((err)=>{
        res.json(err);
        console.log("/api/movies/:movie_id =>",err);
    });

});
/**
 * end get movie with by id
 */

/**
 * save data
 */
router.post('/', (req, res, next) =>{
    const {title, imdb_score, category, country, year,director_id} = req.body;

    const movie = new MovieSchema({
        title: title,
        imdb_score: imdb_score,
        category: category,
        country: country,
        year: year,
        director_id:director_id
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

/**
 * update data using id
 */
router.put("/:movie_id",(req,res,next)=>{

    const movieSchema = MovieSchema.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
    movieSchema.then((updatedMovie)=>{
        if (!updatedMovie){
            next({message:"güncelleme hatası", code:2});
        }
        res.json(updatedMovie);
    }).catch((err)=>{
        console.log(_dirname,"movie.js => update error drom movie.js ",err);
        res.json(err);
    });

});
/**
 * update data using id
 */


/**
 * delete movie using movie id
 */
router.delete("/:movie_id",(req,res,next)=>{
    //this.setHeader('Content-Type', 'application/json; charset=utf-8');

    const movieSchema = MovieSchema.findByIdAndRemove(req.params.movie_id);
    movieSchema.then((deletedMovie)=>{
        if (!deletedMovie)
            setTimeout(()=>{
                next({message:"silme hatası", code:3})
            },1000);
        res.json({deletedMovie:{deletedMovie}});
    }).catch((err)=>{
        console.log(__dirname,"movie.js => error while deleting =>",err)
    });
});
/**
 * end delete movie using movie id
 */

/**
 * between two years
 */
router.get("/between/:start_year/:end_year", (req, res) => {
    const {start_year,end_year} = req.params;
    const allMovies = MovieSchema.find(
        {
            year :
            {
                "$gte":parseInt(start_year), "$lte": parseInt(end_year)
                //gt yada lt kullanırsan sınırları almaz
            }
        });
    allMovies.then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(__dirname,"~/api-movie/ iki yıl arasındali sorgu hatası :", err)
    })

});
/**
 * end between two years
 */



/**
 *
 */

//
module.exports = router;
