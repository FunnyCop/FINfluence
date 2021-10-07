const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
        answer: {
            type: String, 
            required: [true, "Answer is required"],
            minlength: [10, "Answer must be at least 10 characters"]
        },
},{timestamps: true}); 


const Answer = mongoose.model("Answer", AnswerSchema)
module.exports = Answer;