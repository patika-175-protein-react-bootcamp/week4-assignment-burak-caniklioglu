import React from 'react';
import FirstUndeline from '../constants/icons/FirstPage/FirstUndeline';
import {Link} from 'react-router-dom';
import Start from '../constants/icons/FirstPage/start';

function FirstPage() {
  return (
    <div className="first">
      <div className="first-container">
        <div className="wrapper">
          <p className="header">Mathematics Game</p>
          <FirstUndeline className="underline"/>
          <p className='first-parag'>Total Point : <span>129</span></p>
          <p className='first-parag'>Total Questions : <span>40</span></p>
          <p className='first-parag'>Correct Answers : <span>32</span></p>
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
