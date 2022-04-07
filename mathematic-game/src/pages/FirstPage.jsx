import React from 'react';
import FirstUndeline from '../constants/icons/FirstPage/FirstUndeline';
import {Link} from 'react-router-dom';
import Start from '../constants/icons/FirstPage/start';
import { useGame } from '../contexts/context';

function FirstPage() {

  const getCorrectAnswer = JSON.parse(
    localStorage.getItem('Correct')
  ) ? JSON.parse(localStorage.getItem('Correct')).length : 0;

  const getAllQuestions = JSON.parse(localStorage.getItem('allQuestions')) ? JSON.parse(localStorage.getItem('allQuestions')).length : 0;


  return (
    <div className="first">
      <div className="first-container">
        <div className="wrapper">
          <p className="header">Mathematics Game</p>
          <FirstUndeline className="underline"/>
          <p className='first-parag'>Total Point : <span>{localStorage.getItem('score')|| 0}</span></p>
          <p className='first-parag'>Total Questions : <span>{getAllQuestions}</span></p>
          <p className='first-parag'>Correct Answers : <span>{getCorrectAnswer}</span></p>
          <div>

            <Link to="/game" className='first-link'>
              <Start  /> <span className='start'>Start</span>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default FirstPage;
