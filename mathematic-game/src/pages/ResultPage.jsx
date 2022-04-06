import React from 'react';
import FirstUndeline from '../constants/icons/FirstPage/FirstUndeline';
import '../App.css';
import { Link } from 'react-router-dom';
import Start from '../constants/icons/FirstPage/start';
import Tik from '../constants/icons/ResulPage/Tik';
import Wrong from '../constants/icons/ResulPage/Wrong';



function ResultPage() {

  



  return (
    <div className='result'>
      <div className="result-container">
        <div className="final">
          <h1 className="header">Final</h1>
          <FirstUndeline className="underline" size={228}/>
          <p className="first-parag">Point: <span>129</span></p>
          <p className="first-parag">Questions: <span>129</span></p>
          <p className="first-parag">Correct Answers: <span>129</span></p>
          <Link title="Start" to={'/game'} className="first-link"><Start/><span className="start">Restart</span> </Link>
        </div>

        <div className="all-questions">
          <h1 className="header">All Questions</h1>
          <FirstUndeline className="underline" size={350}/>
          <div className="questions">
            <div className="question">
              <span>3</span>
              <span>X</span>
              <span>4</span>
              <span>=</span>
              <span>12</span>
              <span className='symbol'>
                <Tik/>
              </span>
            </div>
            <div className="question">
              <span>3</span>
              <span>X</span>
              <span>4</span>
              <span>=</span>
              <span>12</span>
              <span className='symbol'>
                <Wrong/>
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;