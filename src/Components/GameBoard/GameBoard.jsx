import './GameBoard.css';
import { Square } from "../Square";


export const GameBoard = ({ board, updateBoard, player1Pokemon, player2Pokemon, turn, TURNS  }) =>
{
    return (
    <div>
            <section className='game'>
                    {
                    board.map((cell, index) => {
                        let pokemonImage = null;
                    
                        if (cell === TURNS.X && player1Pokemon) {
                        pokemonImage = player1Pokemon.img;
                        } else if (cell === TURNS.O && player2Pokemon) {
                        pokemonImage = player2Pokemon.img;
                        }
                    
                        return (
                        <Square key={index} index={index} updateBoard={updateBoard}>
                            {pokemonImage && <img src={pokemonImage} alt="Pokemon" className='squareImg' />}
                        </Square>
                        );
                    })
                    }
                    </section>
                    <section className = 'turn'>
                    <Square isSelected={turn == TURNS.X}>
                    {player1Pokemon && (
                    <img 
                        src={player1Pokemon.img} 
                        alt={player1Pokemon.name} 
                        className='turn-img' 
                    />
                        )}
                
                    </Square>
                    <Square isSelected={turn == TURNS.O}>
                    {player1Pokemon && (
                    <img 
                        src={player2Pokemon.img} 
                        alt={player2Pokemon.name} 
                        className='turn-img' 
                    />
                        )}
                    </Square>
            </section>
        </div> )
}