/**
 * pagecode : MonarchMrd001
 */
const pageCode = "MonarchMrd001";

const mongoose = require("mongoose");
var express = require('express');
var router = express.Router();

/**
 * models
 */
const DirectorSchema = require("../models/Director");
/**
 * end models
 */

/**
 * save director
 */
router.post("/", (req, res) => {

    const director = new DirectorSchema(req.body);
    const savedDirector = director.save();
    savedDirector.then((savedDate) => {
        res.json({status: "ok", saved: {savedDate}});
    }).catch((err) => {
        console.log(__dirname, " director.js :", " event of save directory", err);
    });


});
/**
 * end save director
 */

/**
 *  gelişmiş gösterme
 */
router.get("/", (req, res) => {
    const promise = DirectorSchema.aggregate([
        {
            $lookup:
                {
                    from: "movies",
                    localField: "_id",
                    foreignField: "director_id",
                    as: "movies"
                }

        },
        {
            $unwind: // dönen verilern yolu
                {
                    path: "$movies",
                    preserveNullAndEmptyArrays: true//boş olan filmi olamayan yönetmenlerin listelenmesi
                }
        },
        {
            $group://dönen verilerin nasıl gruplanacağı
                {
                    _id:
                        {
                            _id: "$_id",
                            name: "$name",
                            surname: "$surname",
                            bio: "$bio"
                        },
                    movies: {
                        $push: "$movies"//her yönetmenin filmini obje olarak göstermek için
                    }
                }
        },
        {
            $project: {//dönen verilerden hangisinin gösterileceği
                _id: "$_id._id",
                name: "$_id.name",
                surname: "$_id.surname",
                movies: "$movies"
            }
        }
    ]);

    promise.then((getDirectories) => {
        res.json(getDirectories)
    }).catch((err) => {
        res.json(errs);
    });

});
/**
 * end gelişmiş gösterme
 */

/**
 * get director using id
 */
router.get("/:director_id", (req, res) => {
    const promise = DirectorSchema.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:
                {
                    from: "movies",
                    localField: "_id",
                    foreignField: "director_id",
                    as: "movies"
                },

        },
        {
            $unwind: // dönen verilern yolu
                {
                    path: "$movies",
                    preserveNullAndEmptyArrays: true//boş olan filmi olamayan yönetmenlerin listelenmesi
                }
        },
        {
            $group://dönen verilerin nasıl gruplanacağı
                {
                    _id:
                        {
                            _id: "$_id",
                            name: "$name",
                            surname: "$surname",
                            bio: "$bio"
                        },
                    movies: {
                        $push: "$movies"//her yönetmenin filmini obje olarak göstermek için
                    }
                }
        },
        {
            $project: {//dönen verilerden hangisinin gösterileceği
                _id: "$_id._id",
                name: "$_id.name",
                surname: "$_id.surname",
                movies: "$movies"
            }
        }
    ]);
    promise.then((getDirectories) => {
        res.json(getDirectories)
    }).catch((err) => {
        res.json(errs);
    });

});
/**
 * end get director using id
 */

/**
 * update director using id
 */
router.put("/:director_id", (req, res, next) => {
    const getDirector = DirectorSchema.findByIdAndUpdate(req.params.director_id, req.body, {new: true});
    getDirector.then((updatedDirector) => {
        res.json(updatedDirector);
        /*if (!updatedDirector)
            next()*/
    }).catch((err) => {
        console.log(__filename, " api/director/:director_id ", err)
        res.json({
            status: "fail",
            error: {
                message: `${__filename}, => put:api/directors/:director_id `, code: pageCode
            }
        });
    });
});
/**
 * end update director using id
 */

/**
 * delete director using id
 */
router.delete("/:director_id", (req, res, next) => {
    const getDirector = DirectorSchema.findByIdAndRemove(req.params.director_id);
    getDirector.then((removeDirector) => {
        res.json(removeDirector);
    }).catch((err) => {
        console.log(__filename, " => delete:api/director/:director_id ", err)
        res.json({
            status: "fail",
            error: {
                message: `${__filename}, => delete:api/directors/:director_id `, code: pageCode
            }
        });
    });
});
/**
 * delete director using id
 */


/**
 *
 * @type {Router|router|*}
 */




module.exports = router;
