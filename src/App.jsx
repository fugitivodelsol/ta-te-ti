import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TURNS = {
  X : 'x',
  O : 'o'
}

const Square = ({children, isSelected, updateBoard, index}) =>
{
  const className = `square ${isSelected ? 'is-selected' : '' }`

  const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const Winner_Combos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [2,4,7],
  [3,5,8],

  [0,4,8],
  [2,4,6]

]


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //Null que no hay ganador y false empate

  const checkWinner = (boardToCheck) => {
    for(const combo of Winner_Combos){
      const[a,b,c] = combo 
      if(
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[b] == boardToCheck[c]
      )
      {return boardToCheck[a]}
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  const checkEndGame = (newBoard) => {
    return newBoard.every((Square)=> Square != null)
  }


  const updateBoard = (index) =>{
    //no actualizar esta posición si ya tienen algo
    if(board[index]|| winner) return
    const newBoard = [...board]
    //Actualiza el tablero
    newBoard[index] = turn
    setBoard(newBoard)
    //Cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
   if(newWinner){
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
 return (
  <main className='board'>
    <h1>Ta-Te-Ti</h1>
    <button onClick={resetGame}>Volver a empezar</button>
    <section className='game'>
      {
        board.map((_, index)=>{
          return ( 
           <Square 
           key={index} 
           index={index}
           updateBoard={updateBoard}>
            {board[index]}
           </Square>
          )
        })
      }
    </section>
    <section className='turn'>
      <Square isSelected={turn == TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn == TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
    <section>
      {
        winner !== null && (
          <section className='text'>
            <h2>
              {
                winner== false
                ? 'Empate'
                : 'Ganó'
              }
            </h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Volver a empezar</button>
            </footer>
          </section>
        ) 
      }
    </section>
  </main>

 )
}

export default App
