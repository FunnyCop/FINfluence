// import React from 'react';


// const Answers = () => {

//     const history = useHistory(); 
    
//     const [answers, setAnswers] = useState([]);

//     const [newAnswer, setNewAnswer] = useState({
//         answer:"",  
//     })

//     const [validationErrors, setValidationErrors] = useState({
//         question:"",
//     })


//     useEffect(()=>{
//         axios.get('http://localhost:8000/api/as')
//             .then(res=>{
//                 console.log("***********Get all res-->", res)
//                 setQuestions(res.data.results);
//             })
//             .catch(err => console.error(err));
//     },[]);

//     const changeHandler = (e)=>{
//         console.log("entering question")
//         console.log(e.target.name, e.target.value)
//             setNewQuestion({ 
//                 ...newQuestion,
//                 [e.target.name]:e.target.value
//             })
//     }

//     const submitHandler = e => {
//         e.preventDefault();
//         console.log("the question was submitted -->", newQuestion)

//         axios.post("http://localhost:8000/api/question", newQuestion)
//         .then(res=>{
//             console.log("this is the response-->", res)
//             if (res.data.err) { 
//                 setValidationErrors(res.data.err.errors)
//             } else {
//                 setNewQuestion({
//                     question:"",
//                 })
//                 history.push("/questionboard"); 
//             }
//         })
//     }


//     return (
//     <>      
//             <div>
//                 <a href="/"><img src={ logo } className="mx-3 my-3" style={{ width:"35px"}} alt ="logo" /></a>
//             </div>
//             <div className="map-sidebar" id="question-bar">
//                 <form className="row g-3 align-items-center justify-content-center" 
//                 onSubmit={ submitHandler }
//                 >
//                     <div className="col-auto">
//                         <label 
//                         htmlFor="question-input" 
//                         className="col-form-label"
//                         >Post Question to the Question Board:
//                         </label>
//                     </div>
//                     <div className="col-auto">
//                         <input 
//                         type="text" 
//                         id="question-input" 
//                         name="question"
//                         className="form-control form-input-field" 
//                         onChange = { changeHandler }
//                         />
//                     </div>
//                     <div className="col-auto">
//                         <button 
//                         type="submit"
//                         className="btn shadow reg-login-btn" 
//                         >Submit
//                         </button>
//                     </div>
//                     <div className="col-auto">
//                         <p>
//                         <span id="questionHelpInline" className="form-text"> 
//                         {
//                         validationErrors.question? validationErrors.question.message: ""
//                         }
//                         </span>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//     return (
//         <div>
            
//         </div>
//     );
// };


// export default Answers;