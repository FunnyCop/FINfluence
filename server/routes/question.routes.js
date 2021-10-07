const QuestionController = require('../controllers/question.controller')


module.exports = app => {
    app.put('/api/question/:id', QuestionController.pushAnswer)
    app.get('/api/questions', QuestionController.findAllQuestions);
    app.get('/api/question/:id', QuestionController.findOneQuestion);
    app.get("/api/question/answers/:id", QuestionController.findAnswersToThisQuestion);
    app.post('/api/question', QuestionController.createNewQuestion);
    app.delete('/api/question/:id', QuestionController.deleteOneQuestion);
}