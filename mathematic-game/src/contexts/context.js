import React, { useContext,useState } from 'react';

const GameContext = React.createContext();

// eslint-disable-next-line react/prop-types
const GameProvider = ({children}) => {
  const [correct, setCorrect] = useState('game')
  const [tour, setTour] = useState(1);
  const [step, setStep] = useState(1)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(10)
  const [questions, setQuestions] = useState([]);
  const [firstNumber, setFirstNumber] = useState(Math.ceil(Math.random() * 9))
  const [secondNumber, setSecondNumber] = useState(Math.ceil(Math.random() * 9))


  return(
    <GameContext.Provider
    value={{
      tour,
      setTour,
      step,
      setStep,
      score,
      setScore,
      question,
      setQuestion,
      questions,
      setQuestions,
      correct,
      setCorrect,firstNumber,setFirstNumber,secondNumber,setSecondNumber
    }}>
      {children}
    </GameContext.Provider>
  );
};

function useGame() {
  return useContext(GameContext);
}

export {GameContext, GameProvider, useGame};