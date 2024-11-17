const GameBoard = ({handlePlayer,turn}) => {
    
  return (
    <ol id='game-board'>
      {turn.map((row,rowIndex)=>(<li key={rowIndex}>
        <ol>
            {row.map((playerSymbol,colIndex)=>(
                <button disabled={playerSymbol !== null} key={colIndex} onClick={() => handlePlayer(rowIndex,colIndex)}>{playerSymbol}
                </button>))}
        </ol>
      </li>))}
    </ol>
  )
}

export default GameBoard
