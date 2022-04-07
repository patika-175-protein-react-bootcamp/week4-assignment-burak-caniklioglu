import React, { useContext,useState, useEffect } from 'react';
import shuffle from "../utils/shuffleArray";
import { useNavigate } from 'react-router-dom';

const GameContext = React.createContext();

// eslint-disable-next-line react/prop-types
const GameProvider = ({children}) => {
  const [correct, setCorrect] = useState('game')
  const [clicked, setClicked] = useState(false)
  const [tour, setTour] = useState(1);
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [point,setPoint] = useState(0);
  const [question, setQuestion] = useState(10);
  const [questions, setQuestions] = useState({});
  const [tempCorrect, setTempCorrect] = useState([]);
  const [perCorrect, setPerCorrect] = useState([])
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
    const answers = shuffle([
        {result:resultTrue, answer:true, active: false},
        {result: resultTwo , answer: false, active:false},
        {result: resultThree, answer:false, active:false}]);
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
      isCorrect: false,
      clicked:clicked
    }

    return questionObject;
  }


  useEffect(()=>{
    if(step > question){
      let getPoint = sessionStorage.getItem('point');
      let getLocal = localStorage.getItem('score') || 0;
      getLocal = Number(getLocal) + Number(getPoint);
      localStorage.setItem("score", getLocal);

      let getLocalCorrect = localStorage.getItem('Correct') 
      let getSesCorrect = sessionStorage.getItem('tempCor') ;

      getLocalCorrect = getLocalCorrect ? JSON.parse(getLocalCorrect) : [];
      getLocalCorrect = getLocalCorrect.concat( JSON.parse(getSesCorrect))
      localStorage.setItem("Correct", JSON.stringify(getLocalCorrect) );
      
      setStep(1);
      setTour(x=>x+1);
      
      navigate("/result", { replace: true });
    }else{
      
      sessionStorage.setItem('point', score);
      sessionStorage.setItem('tempCor', JSON.stringify(tempCorrect));
    }
    const stepQuestion = createQuestion();
    setCorrect("game")
    setQuestions(stepQuestion);
    setClicked(false);
    
  },[step])

  useEffect(() => {
    let getAllQuestions = localStorage.getItem('allQuestions') ;
    getAllQuestions = getAllQuestions ? JSON.parse(getAllQuestions) : [];
    getAllQuestions = getAllQuestions.concat(allQuestions);
    sessionStorage.setItem('allQuestions', JSON.stringify(allQuestions));
    setAllQuestions([])
    localStorage.setItem("allQuestions", JSON.stringify(getAllQuestions) );
    let getPoint = sessionStorage.getItem('point');
    setPoint(getPoint);
    let getCorrect = sessionStorage.getItem('tempCor');
    setPerCorrect(JSON.parse(getCorrect));
    setScore(0);
    setTempCorrect([]);
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
      setAllQuestions,
      clicked,
      setClicked,
      setPoint,
      point,
      tempCorrect,
      setTempCorrect,
      perCorrect
          }}>
      {children}
    </GameContext.Provider>
  );
};

function useGame() {
  return useContext(GameContext);
}

export {GameContext, GameProvider, useGame};