import React, {useEffect}  from 'react';
import SmallCircle from '../constants/icons/GamePage/SmallCircle';
import Student from '../constants/icons/GamePage/Student';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/context';
import '../App.css';

function GamePage() {
  const {tour,
    setTour,
    correct, 
    setCorrect,
    step,
    setStep,
    score,
    setScore,
    question,
    setQuestion,
    questions,
    setQuestions,firstNumber,setFirstNumber,secondNumber,setSecondNumber} = useGame()
  
  const navigate = useNavigate();
  
  
  
  
  const resultTrue = firstNumber * secondNumber;
  const resultTwo = firstNumber * (secondNumber === 1 ? secondNumber+1 : secondNumber - 1);
  const resultThree = (firstNumber+1) * secondNumber;

  const handleClick = (e) => {
    const checkedAnswer = e.currentTarget.innerText;
    
    
    if(resultTrue === Number(checkedAnswer)) {
      setCorrect('correct');

      setQuestions([...questions, { firstnumber: firstNumber, secondnumber: secondNumber, result: resultTrue, isCorrect: true}]);

      if(Number.isInteger(Math.sqrt(resultTrue))){
        setScore(Number(score) + Math.floor(Math.sqrt(resultTrue)));
      }else{
        setScore(Number(score) + Math.floor(Math.sqrt(resultTrue))+1);
      }

      
      
      setTimeout(() => setCorrect('game') , 3000);
      setTimeout(() => setFirstNumber(Math.ceil(Math.random() * 9)) , 3000);
      setTimeout(() => setSecondNumber(Math.ceil(Math.random() * 9)) , 3000);
      
      
      
      
      
    }else{
      setQuestions([...questions, { firstnumber: firstNumber, secondnumber: secondNumber, result: resultTrue, isCorrect: false}]);
      
      setCorrect('uncorrect');
      setTimeout(() => setCorrect('game') , 3000);
      setTimeout(() => setFirstNumber(Math.ceil(Math.random() * 9)) , 3000);
      setTimeout(() => setSecondNumber(Math.ceil(Math.random() * 9)) , 3000);
      
      
    }

    setStep(x=>x+1);
  };

  
 

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  
  
  const list = [resultTrue, resultTwo, resultThree];
  
  shuffle(list);
  
  
  useEffect(() => {
    
  
    if(step > question){
      localStorage.setItem("score", score);
      
      setStep(1);
      setTour(x=>x+1);
      navigate("/result", { replace: true });
    }else{
      sessionStorage.setItem('score', score);
    }
  }, [step])
  
  useEffect(() => {
    let getLocalScore = localStorage.getItem('score');
    setScore(getLocalScore || 0);
  },[tour])

  





  return (
    <div className={correct}>
      <div className='game-container'>
        <div className='left-game'>
          <Student/> 
          <div className="conc">
            <span>{firstNumber}</span>
            <span>X</span>
            <span>{secondNumber}</span>
          </div>
        </div>
        <div className='right-game'>
          <div className='score-container'>
            <p className="game-score">Score: <span>{score}</span></p>
            <p className="game-score">Tour: <span>{tour}</span></p>
            <p className="game-score">Questions: <span>{step}</span><span>/</span><span>{question}</span></p>
          </div>
          <div className="circles">
            <div id="circle-1" onClick={(e) => handleClick(e) }><SmallCircle /> <span>{list[0]}</span> </div>
            <div id="circle-2" onClick={(e) => handleClick(e) }><SmallCircle /><span>{list[1]}</span>  </div>
            <div id="circle-3" onClick={(e) => handleClick(e) }><SmallCircle />
              <span>{list[2]}</span></div>
            
            
          </div>
          
        </div>
      </div> 
    </div>
  );
}

export default GamePage;