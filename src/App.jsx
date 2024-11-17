import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./components/winningCombo.js"
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const playerTurn = (gameState) => {
  let activePlayer = "X";
  if (gameState.length > 0 && gameState[0].player === 'X') {
    activePlayer = "O"
  }
  return activePlayer;
}

function App() {

  const [gameState, setGameState] = useState([]);
  let activePlayer = playerTurn(gameState);
  const handleActivePlayer = (rowIndex, colIndex) => {
    setGameState((current) => {
      let currentPlayer = playerTurn(current);
      let updatedState = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...current];
      return updatedState;
    });
  }

  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for (const element of gameState) {
    let { square, player } = element;
    let { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combo of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combo[0].row][combo[0].column];
    const secondSymbol = gameBoard[combo[1].row][combo[1].column];
    const thirdSymbol = gameBoard[combo[2].row][combo[2].column];

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol ){
      winner = firstSymbol;
    }
  }

  let Draw = gameState.length === 9 && !winner;

  const restartGame = () => {
    setGameState([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name='player1' symbol='X' isActive={activePlayer === "X"} />
          <Player name='player2' symbol='O' isActive={activePlayer === "O"} />
        </ol>
        {(winner || Draw) && <GameOver winner={winner} rematch = {restartGame}/>}
        <GameBoard handlePlayer={handleActivePlayer} turn={gameBoard} />
      </div>
      <Logs turns={gameState} />
    </main>
  );
}

export default App
