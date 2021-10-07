const mongoose = require( "mongoose" )

const AnswerSchema = new mongoose.Schema( {
        answer: {
            type: String,
            required: [ true, "Answer is required" ],
            minlength: [ 10, "Answer must be at least 10 characters" ]
        },
}, { timestamps: true } )


module.exports.Answer = mongoose.model( "Answer", AnswerSchema )