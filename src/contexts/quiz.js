import { createContext,useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "../components/helpers";

const intialState = {
    currentQuestionIndex:0,
    questions:[],
    showResults:false,
    answers:[],
    currentAnswer : '',
    correctAnswerCount : 0
}

const reducer = (state,action) =>{
    
    switch (action.type){
        case "SELECT_ANSWER" : {
            const correctAnswerCount = 
            action.payload === state.questions[state.currentQuestionIndex].correctAnswer
            ? state.correctAnswerCount + 1 : state.correctAnswerCount;
         return{
            ...state,
            currentAnswer: action.payload,
            correctAnswerCount
         }
        }
        case "NEXT_QUESTION" : {
            const showResults = state.currentQuestionIndex === state.questions.length-1;
    const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
    const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionIndex]);
    return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer:""
       };
    }
    
    case "RESTART" :
    {
      return intialState;
    }
    case "LOADED_QUESTIONS" : {
        const normalizedQuestions = normalizeQuestions(action.payload);
        return {
            ...state,
            questions: normalizedQuestions,
            answers: shuffleAnswers(normalizedQuestions[0])
        }
    }

   default : 
   {
    return state;
  }
}
}

export const QuizContext = createContext();

export const QuizProvider = ({children}) =>{
    const value = useReducer(reducer,intialState);
    

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}