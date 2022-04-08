import React  from 'react';
import SmallCircle from '../constants/icons/GamePage/SmallCircle';
import Student from '../constants/icons/GamePage/Student';

import { useGame } from '../contexts/context';
import '../App.css';

function GamePage() {
  const {tour,
    step,
    setStep,
    score,
    setScore,
    question,
    questions,
    correct,
    setCorrect,
    allQuestions,
    setPoint,
    clicked,
    setClicked,
    setAllQuestions,
    tempCorrect,
    setTempCorrect,
    disabled,
    setDisabled} = useGame()
  
    
  


  const handleClick = (e,item) => {
    setDisabled(true)

    
    item.active = true
    
    setClicked(true);
    if(Number(e.currentTarget.innerText) === questions.resultTrue){
      questions.isCorrect = true;
      setTempCorrect([...tempCorrect,questions])
      
      setTimeout(() => {
        if(Number.isInteger(Math.sqrt(questions.resultTrue))){
          setScore(Number(score) + Math.floor(Math.sqrt(questions.resultTrue)));
          setPoint(Number(score) + Math.floor(Math.sqrt(questions.resultTrue)));
        }else{
          setScore(Number(score) + Math.floor(Math.sqrt(questions.resultTrue))+1);
          setPoint(Number(score) + Math.floor(Math.sqrt(questions.resultTrue))+1);
        }
        
      },3000)
    }

    const checkedAnswer = Number(e.currentTarget.innerText) === questions.resultTrue ? "correct" : "uncorrect";
    

    setAllQuestions([...allQuestions,questions])

    setCorrect(checkedAnswer);
    
    setTimeout(()=>{
      setStep((prevStep) => prevStep + 1);
    },3000)
  }
  
  
  return (
    <div className={correct}>
      <div className='game-container'>
        <div className='left-game'>
          <Student/> 
          <div className="conc">
            <span>{questions.firstNumber}</span>
            <span>X</span>
            <span>{questions.secondNumber}</span>
          </div>
        </div>
        <div className='right-game'>
          <div className='score-container'>
            <p className="game-score">Score: <span>{score}</span></p>
            <p className="game-score">Tour: <span>{tour}</span></p>
            <p className="game-score">Questions: <span>{step}</span><span>/</span><span>{question}</span></p>
          </div>
          <div className="circles">
            {questions?.answers?.map((item, index) => (
              <button className={`circle circle-${index}`} key = {index}onClick={(e) => handleClick(e,item) } disabled = {disabled}>
                <SmallCircle item={item} clicked={clicked} questions={questions} />
                
              </button>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
}

export default GamePage;