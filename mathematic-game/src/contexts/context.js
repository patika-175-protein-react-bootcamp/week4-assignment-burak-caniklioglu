import React, { useContext,useState, useEffect } from 'react';
import shuffle from "../utils/shuffleArray";
import { useNavigate } from 'react-router-dom';

const GameContext = React.createContext();

// eslint-disable-next-line react/prop-types
const GameProvider = ({children}) => {
  const [correct, setCorrect] = useState('game')
  const [tour, setTour] = useState(1);
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(10);
  const [questions, setQuestions] = useState({});
  const [allQuestions, setAllQuestions] = useState([]);
  const [color,setColor] = useState('#fff');
  const navigate = useNavigate();
  

  const createQuestion = () => {
    /* işlemler burada yapılacak */
    const firstNumber = Math.ceil(Math.random() * 10);
    const secondNumber = Math.ceil(Math.random() * 10);
    const resultTrue = firstNumber * secondNumber;
    const resultTwo = firstNumber * (secondNumber === 1 ? secondNumber+1 : secondNumber - 1);
    const resultThree = (firstNumber+1) * secondNumber;
    const answers = shuffle([resultTrue, resultTwo, resultThree]);
    let scoreEach = 0;
    let questionObject;

    if(Number.isInteger(Math.sqrt(resultTrue))){
     scoreEach =  Number(scoreEach) + Math.floor(Math.sqrt(resultTrue));
    }else{
     scoreEach = Number(scoreEach) + Math.floor(Math.sqrt(resultTrue))+1;
    }

    questionObject = {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      resultTrue: resultTrue,
      answers: answers,
      scoreEach: scoreEach,
      isCorrect: false
    }

    return questionObject;
  }


  useEffect(()=>{
    if(step > question){
      localStorage.setItem("score", score);
     
      
      setStep(1);
      setTour(x=>x+1);
      navigate("/result", { replace: true });
    }else{
      sessionStorage.setItem('score', score);
    }
    const stepQuestion = createQuestion();
    setCorrect("game")
    setQuestions(stepQuestion);
    
  },[step])

  useEffect(() => {
    let getLocalScore = localStorage.getItem('score');
    setScore(getLocalScore || 0);
  },[tour])

  return(
    <GameContext.Provider
    value={{
      tour,
      setTour,
      step,
      setStep,
      question,
      setQuestion,
      questions,
      setQuestions,
      correct,
      setCorrect,
      score,
      setScore,
      color,
      setColor,
      allQuestions,
      setAllQuestions
          }}>
      {children}
    </GameContext.Provider>
  );
};

function useGame() {
  return useContext(GameContext);
}

export {GameContext, GameProvider, useGame};