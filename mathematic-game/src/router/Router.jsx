import React from 'react';
import { Route, Routes} from 'react-router-dom';
import FirstPage from '../pages/FirstPage';
import GamePage from '../pages/GamePage';
import ResultPage from '../pages/ResultPage';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<FirstPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  );
}

export default Router;