const { Answer } = require("../models/answer.model")

/**
 * Create New Answer - POST - /api/answer
 */
 module.exports.createNewAnswer = ( req,res ) => {

    Answer.create( req.body )
        .then( answer => res.json( answer ) )
        .catch( err => res.json( err ) )

}

/**
 * Find All Answers - GET - /api/answers
 */
module.exports.findAllAnswers = ( req,res ) => {

    Answer.find()
        .then( answers => res.json( answers ) )
        .catch( err => res.json( err ) )

}

/**
 * Find One Answer - GET - /api/answer/:id
 */
module.exports.findOneAnswer = ( req,res ) => {

    Answer.findById( req.params.id )
        .then( answer => res.json( answer ) )
        .catch( err => res.json( err ) )

}

/**
 * Delete One Answer - DELETE - /api/answer/:id
 */
module.exports.deleteOneAnswer = ( req,res ) => {

    Answer.findByIdAndDelete( req.params.id )
        .then( answer => res.json( answer ) )
        .catch( err => res.json( err ) )

}

