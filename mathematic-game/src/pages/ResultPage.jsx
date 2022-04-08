import React from 'react';
import FirstUndeline from '../constants/icons/FirstPage/FirstUndeline';
import '../App.css';
import { Link } from 'react-router-dom';
import Start from '../constants/icons/FirstPage/start';
import Tik from '../constants/icons/ResulPage/Tik';
import Wrong from '../constants/icons/ResulPage/Wrong';
import { useGame } from '../contexts/context';



function ResultPage() {

  const {
    point,question,perCorrect

    }= useGame()

    const getAllQuestions = sessionStorage.getItem('allQuestions') ? JSON.parse(sessionStorage.getItem('allQuestions')) : [];



  return (
    <div className='result'>
      <div className="result-container">
        <div className="final">
          <h1 className="header">Final</h1>
          <FirstUndeline className="underline" size={228}/>
          <p className="first-parag">Point: <span>{point}</span></p>
          <p className="first-parag">Questions: <span>{question}</span></p>
          <p className="first-parag">Correct Answers: <span>{perCorrect.length}</span></p>
          <Link title="Start" to={'/game'} className="first-link"><Start/><span className="start">Restart</span> </Link>
        </div>

        <div className="all-questions">
          <h1 className="header">All Questions</h1>
          <FirstUndeline className="underline" size={350}/>
          <div className="questions">

            {getAllQuestions.map((item,index) => {
              return(
            <div className="question">
                <span>{item.firstNumber}</span>
                <span>X</span>
                <span>{item.secondNumber}</span>
                <span>=</span>
                <span>{item.resultTrue}</span>
                
                <span className='symbol'>
                  {item.isCorrect ? <Tik/> : <Wrong/>}
                </span>
            </div>
              )
            })}

            
            
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;