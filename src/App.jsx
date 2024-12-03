import { useState, useEffect } from 'react'
import './App.css'
import { WinnerWindow } from './Components/WinnerWindow/WinnerWindow'
import { Button } from './Components/Button'
import { SelectPoke } from './Components/SelectPoke/SelectPoke'
import { GameBoard } from './Components/GameBoard'

const TURNS = {
  X : 'P1', //Player 1
  O : 'P2' // Player 2
}

const Winner_Combos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //Null que no hay ganador y false empate
  const [pokemones, setPoke] = useState([])
  const [player1Pokemon, setPlayer1Pokemon] = useState(null);
  const [player2Pokemon, setPlayer2Pokemon] = useState(null);
  const [gameStage, setGameStage] = useState("select");


  useEffect(()=>{
      const getPoquemones= async () => 
        {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
          const listaPoke = await response.json()
          const {results} = listaPoke

          const newPokemones = results.map(async (pokemon) =>{
            const response = await fetch(pokemon.url)
            const poke = await response.json()
           
            return{
              id: poke.id,
              name: poke.name,
              img: poke.sprites.other.dream_world.front_default
            }
           
          })
          
          const loadedPokemones = await Promise.all(newPokemones);
          setPoke(loadedPokemones);
      
          // Asignar Pokémon a los jugadores (ejemplo con los primeros dos Pokémon):
          // setPlayer1Pokemon(loadedPokemones[0]);
          // setPlayer2Pokemon(loadedPokemones[1]);
        
      }
      getPoquemones()
  },[])

  function PlayerPoke(index) {
    if (!player1Pokemon) {
      setPlayer1Pokemon(pokemones[index]);  // Asigna Pokémon a Player 1
    } else if (!player2Pokemon) {
      setPlayer2Pokemon(pokemones[index]);  // Asigna Pokémon a Player 2
    }
    // Cambia el stage a "Play" una vez ambos jugadores han seleccionado Pokémon
    if (player1Pokemon && player2Pokemon) {
      setGameStage("Play");
      console.log(player1Pokemon)
      console.log(player2Pokemon)

    }
  }
  

  function checkWinner(boardToCheck) {
    for (const combo of Winner_Combos) {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[b] == boardToCheck[c]) { return boardToCheck[a]} 
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    setPlayer1Pokemon(null)
    setPlayer2Pokemon(null)
    setGameStage("select")
  }
 
  const checkEndGame = (newBoard) => {
    return newBoard.every((Square)=> Square != null)
  }

  const updateBoard = (index) =>{
    const winnerWindow = "winner"
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
      setGameStage(winnerWindow)
    }else if (checkEndGame(newBoard)) {
      setWinner(false)
      setGameStage(winnerWindow)
    }
  }
 return (
  <main className='board'>
      <h1>Ta-Te-Ti</h1>
      {gameStage === "Play" && (
        <GameBoard 
         board={board} 
        updateBoard={updateBoard} 
        player1Pokemon={player1Pokemon} 
        player2Pokemon={player2Pokemon} 
        turn={turn}
        TURNS={TURNS} />)}
      
      {gameStage === "select" && (
        <SelectPoke pokemones={pokemones} PlayerPoke={PlayerPoke} />)}

      <Button onClick={resetGame}>
        Volver a empezar
      </Button>
    
     {gameStage === "winner" && (
      <WinnerWindow winner = {winner} player1={player1Pokemon?.img} player2={player2Pokemon?.img} resetGame={resetGame}/>
      )}
   
  </main>

 )
}

export default App
