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


module.exports = router;
