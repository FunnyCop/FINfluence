const AnswerController = require('../controllers/answer.controller')


module.exports = app => {
    app.get('/api/answers', AnswerController.findAllAnswers);
    app.get('/api/answer/:id', AnswerController.findOneAnswer);
    app.post('/api/answer', AnswerController.createNewAnswer);
    app.delete('/api/answer/:id', AnswerController.deleteOneAnswer);
}