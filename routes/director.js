var express = require('express');
var router = express.Router();

/**
 * models
 */
const DirectorSchema = require("../models/Director");
/**
 * end models
 */


router.post("/", (req, res) => {

    const director = new DirectorSchema(req.body);
    const savedDirector = director.save();
    savedDirector.then((savedDate)=>{
        res.json({status:"ok", saved :{savedDate}});
    }).catch((err)=>{
        console.log(__dirname," director.js :", " event of save directory",err);
    });


});


/**
 *
 */
router.get("/",(req,res)=>{
    const promise = DirectorSchema.aggregate([
        {
            $lookup:
                {
                    from:"movies",
                    localField:"_id",
                    foreignField:"director",
                    as:"movies"
                },

        },
        {
            $unwind:
                {
                    path:"$movies"
                }
        }
    ]);
});
/**
 *
 */

/**
 *
 */


module.exports = router;
