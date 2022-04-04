import React, { useContext } from 'react';

const GameContext = React.createContext();

// eslint-disable-next-line react/prop-types
const GameProvider = ({children}) => {


  return(
    <GameContext.Provider>
      {children}
    </GameContext.Provider>
  );
};

function useGame() {
  return useContext(GameContext);
}

export {GameContext, GameProvider, useGame};