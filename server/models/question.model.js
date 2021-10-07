const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required:[true, "A question is required"],
        maxlength:[1000, "Questions cannot be longer than 1000 characters."],
        minlength:[10, "A Question must be at least 10 characters long."], 
    },
    answers:[ { type: mongoose.ObjectId, ref:'Answer'} ]
    
},{timestamps: true}); 


const Question = mongoose.model("Question", QuestionSchema)
module.exports = Question;
