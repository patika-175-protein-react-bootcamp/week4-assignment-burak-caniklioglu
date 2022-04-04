import React from 'react';
import { GameProvider } from './contexts/context';
import Router from './router/Router';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Router />
      </GameProvider>
      
    </div>
  );
}

export default App;
