const Answer = require("../models/answer.model");

module.exports.findAllAnswers = (req,res)=>{
    Answer
        .find()
        .then(allAnswers=>{
            console.log("bkend get all Answers res-->", res)
            res.json({results: allAnswers})
        })
        .catch(err=>{
            res.json({err:err})
            
        })   
}


module.exports.createNewAnswer = (req,res)=>{
    Answer.create(req.body)
        .then(newAnswerObj=>{
            console.log("bkend create Answer res-->", res)
            res.json({results: newAnswerObj})
        })
        .catch(err=>{
            res.json({err:err})
        })   
}


module.exports.findOneAnswer = (req,res)=>{ 
    Answer.findOne({_id:req.params.id})
        .then(foundAnswer=>{
            console.log("bkend find one Answer res-->", res)
            res.json({results: foundAnswer })
        })
        .catch(err=>{
            res.json({err:err})
        })
}


module.exports.deleteOneAnswer = (req,res)=>{
    Answer.deleteOne({_id: req.params.id})
        .then(deletedAnswer =>{
            console.log("bkend delete Answer res-->", res)
            res.json({results: deletedAnswer})
        })
        .catch(err=>{
            res.json({err:err})
        })
}

