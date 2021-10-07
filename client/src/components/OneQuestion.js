import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import logo from './logo.png';
import axios from 'axios'


const OneQuestion = () => {

    const { idParam } = useParams();
    const [questionInfo, setQuestionInfo] = useState({});
    const [newAnswer, setNewAnswer] = useState({
        answer: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        answer:"",
    })

    const history = useHistory();

//get the question with id and populate answer array
useEffect(()=>{
    axios.get(`http://localhost:8000/api/question/answers/${idParam}`)
        .then(res=>{
            console.log("question with populated answer array", res)
            setQuestionInfo(res.data.results)
        })
        .catch(err=>console.log("error while requesting answers to this question", err))
},[idParam])


const changeHandler = e =>{
    const { name, value } = e.target;
    setNewAnswer({
        ...newAnswer,
        [name]:value,
    })
}

//push new answer to the question's answer array, question updates with answer 
const submitAnswer = (e) => {
    e.preventDefault();
    console.log("submit function for put answer in question -->")
    axios.put(`http://localhost:8000/api/question/${idParam}`, { newAnswer })
    .then(res=>{
        if (res.data.err) {
            setValidationErrors(res.data.err.errors)
        } else {
            console.log("this is the submitHandler response-->", res)
            history.push(`/question/${idParam}`);  
        }
    })
};

return (
    <>
    <div>
        <a href="/dashboard"><img src={ logo } className="mx-3 my-3" style={{ width:"35px"}} alt ="logo" /></a>
    </div>
    <div className="d-flex justify-content-center mx-auto">
        <div className="card text-center question-card">
            <div className="card-body d-flex flex-column">
                <h2>Q</h2>
                <p className="question-details">• { questionInfo.question }</p>
            </div>
        </div>
    </div>
    
    <div className="container fluid">
            <div className="card-body">
                <form 
                onSubmit={ submitAnswer }
                >

                <label 
                htmlFor="answer-input" 
                className="col-form-label"
                >Post Answer to This Question:</label>

                <textarea 
                    id="answer" 
                    name="answer"
                    rows="5"
                    cols="20"
                    className="form-control form-input-field" 
                    onChange = { changeHandler }
                />
                {
                <p>
                    <span id="questionHelpInline" className="form-text"> 
                        {
                        validationErrors.answer? validationErrors.answer.message: ""
                        }
                    </span>
                </p>
                }
            
                <div className="card-footer">
                    <button 
                        type="submit"
                        className="btn shadow reg-login-btn" 
                        >Add
                    </button>
                </div>
            </form>
            </div>
        </div>
    </>
    );

};

export default OneQuestion;
