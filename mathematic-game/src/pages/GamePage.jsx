import React  from 'react';

import '../App.css';
import GameP from '../components/GameP';
import { useGame } from '../contexts/context';

function GamePage() {
  
  const {correct} = useGame();
  
  return (
    <div className={correct}>
      <div className='game-container'>
       <GameP />
      </div> 
    </div>
  );
}

export default GamePage;