const Question = require("../models/question.model");
const Answer = require("../models/answer.model")


module.exports.findAllQuestions = (req,res)=>{
    Question.find()
        .then(allQuestions=>{
            console.log("bkend get all questions res-->", res)
            res.json({results: allQuestions})
        })
        .catch(err=>{
            res.json({err:err})
            
        })  
}

module.exports.createNewQuestion = (req,res)=>{
    Question.create(req.body)
        .then(newQuestionObj=>{
            console.log("bkend create question res-->", res)
            res.json({results: newQuestionObj})
        })
        .catch(err=>{
            res.json({err:err})
        })   
}

module.exports.updateQuestion = (req, res) => {
    Question.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedQuestion => {
            res.json({ message: 'question updated-->', updatedQuestion })
        })
        .catch(err => {
            res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.pushAnswer = (req, res) => { 
    Question.findByIdAndUpdate( { _id:req.params.id },
        { $push: { answers: req.body.newAnswer } }, {new: true} )
        .then(pushedAnswer => {
            res.json( { pushedAnswer } )
        })
        .catch(err => {
            res.json( { err } )
        });
}

// module.exports.pushAnswer = async ( req, res ) => {

//     const newAnswer = new Answer(req.body)
//     await newAnswer.save

//     Question.findByIdAndUpdate(req.params.id, { $push: { answers: newAnswer } }, { new: true })
//         .then( q => res.json( q ) )
//         .catch( err => res.json( err ) )
// }
//above --> if I put { $push: { answers: newAnswer_d }}, does not like, if I just put newAnswer mongoose generates a newAnswer _id, 
// but when I use the Answer route localhost:8000/api/answer/:id it returns 
//{
//    "results": null
//}

//after dropping db schema, I also tried:
// const newAnswer = await Answer.create(req.body)
// but I am returned an error that Answer.create is not a function on the backend

module.exports.findAnswersToThisQuestion = (req, res) =>{
    Question.findById({_id: req.params.id}).populate("answers")
        .then(questWithAnswers=>{
            console.log("this is the populated answer array to this question")
            res.json({results: questWithAnswers})
        })
        .catch(err=>{
            res.json({err:err})
        })
}


module.exports.findOneQuestion = ( req,res )=>{ 
    Question.findOne( { _id:req.params.id } )
        .then( foundQuestion=>{
            console.log( "bkend find one question res-->", res )
            res.json( { results: foundQuestion } )
        })
        .catch( err => {
            res.json( { err:err } )
        })
}


module.exports.deleteOneQuestion = (req,res)=>{
    Question.deleteOne({_id: req.params.id})
        .then(deletedQuestion =>{
            console.log("bkend delete question res-->", res)
            res.json({results: deletedQuestion})
        })
        .catch(err=>{
            res.json({err:err})
        })
}


