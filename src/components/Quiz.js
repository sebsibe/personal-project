
import { useContext, useEffect} from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";




const Quiz =() =>{
    const [quizState,dispatch] = useContext(QuizContext);
    //const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    //const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    //const apiUrl = "https://the-trivia-api.com/v2/questions/"
        const apiUrl ="https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple&encode=url3986";
    // useEffect(() =>{
    //     console.log("Use effect")
    //     fetch(apiUrl)
    //     .then((res)=>{res.json()})
    //     .then((data) => {
    //         console.log("data : ",data)
    //     }) .catch((error) => {
    //         console.error("Error fetching data:", error);
    //       });
    // },[])

    useEffect(() => {
        if(quizState.questions.length > 0) return;
        const fetchData = async () => {
          try {
            const response = await fetch(apiUrl);
    
            if (response.status === 429) {
              // Implement a delay before retrying (you can adjust the duration)
              await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds
              fetchData(); // Retry the request
            } else if (response.ok) {
              const data = await response.json();
              console.log("data:", data);
              dispatch({type:"LOADED_QUESTIONS", payload: data.results})
            } else {
              throw new Error('Network response was not ok');
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      });
    
return (
<div className="quiz">
    {quizState.showResults && (
    <div className="results">
        <div className="congratulations">Congratulations</div>
        <div className="results-info">
        <div>You have completed the quiz.</div>
        <div>You have got {quizState.correctAnswerCount} of {quizState.questions.length}</div>
        </div>
        <div className="next-button" onClick={() => dispatch({type:"RESTART"})}>Restart</div>
    </div>
    )}
   {!quizState.showResults && quizState.questions.length > 0 && (<div>
<div className="score">Question {quizState.currentQuestionIndex+1}/{quizState.questions.length}</div>
<Question/>
<div className="next-button" onClick={()=>dispatch({type:"NEXT_QUESTION"})}>Next question</div>
</div>
)}
</div>
)
};
export default Quiz;