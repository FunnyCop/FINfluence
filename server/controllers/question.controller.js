const { Question } = require( "../models/question.model" )
const { Answer } = require( "../models/answer.model" )

/**
 * Create New Question - POST - /api/question
 */
module.exports.createNewQuestion = ( req, res ) => {

    Question.create( req.body )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )

}

/**
 * Find All Questions - GET - /api/questions
 */
module.exports.findAllQuestions = ( req, res ) => {

    Question.find().populate( "answers" )
        .then( questions => res.json( questions ) )
        .catch( err => res.json( err ) )

}

/**
 * Find One Question - GET - /api/question/:id
 */
module.exports.findOneQuestion = ( req,res ) => {

    Question.findById( req.params.id )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )

}

/**
 * Add Answer to Question - PUT - /api/question/:id
 */
module.exports.pushAnswer = async ( req, res ) => {

    const answer = await Answer.create( req.body )

    Question.findByIdAndUpdate(

        req.params.id,
        { $push: { answers: answer._id } },
        { new: true }

    ).populate( "answers" )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )

}

/**
 * Delete One Question - DELETE - /api/question/:id
 */
module.exports.deleteOneQuestion = async ( req, res ) => {

    const question = await Question.findByIdAndDelete( req.params.id ).exec()

    Answer.deleteMany( { _id: { $in: question.answers } } )
        .then( () => res.json( { message: "Deleted Question Successfully" } ) )
        .catch( err => res.json( err ) )

}

/**
 * Find Answers for Question - GET - /api/question/answers/:id
 */
module.exports.findAnswersToThisQuestion = ( req, res ) => {

    Question.findById( req.params.id ).populate( "answers" )
        .then( question => res.json( question.answers ) )
        .catch( err => res.json( err ) )

}

/**
 * Update One Question - PUT - /api/question/update/:id
 */
module.exports.updateQuestion = ( req, res ) => {

    Question.findByIdAndUpdate(

        req.params.id,
        req.body,
        { new: true, runValidators: true }

    ).populate( "answers" )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )

}

// module.exports.pushAnswer = async ( req, res ) => {

//     const newAnswer = new Answer(req.body)
//     await newAnswer.save

//     Question.findByIdAndUpdate(req.params.id, { $push: { answers: newAnswer } }, { new: true })
//         .then( q => res.json( q ) )
//         .catch( err => res.json( err ) )
// }
//above --> if I put { $push: { answers: newAnswer_id }}, does not like, if I just put newAnswer mongoose generates a newAnswer _id, 
// but when I use the Answer route localhost:8000/api/answer/:id it returns 
//{
//    "results": null
//}

//after dropping db schema, I also tried:
// const newAnswer = await Answer.create(req.body)
// but I am returned an error that Answer.create is not a function on the backend


