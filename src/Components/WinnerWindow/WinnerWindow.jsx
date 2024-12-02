import { Square } from "../Square/Square"
import { Button } from "../Button"

export const WinnerWindow = ({winner, player1, player2, resetGame})=>
    {

        if (winner === null) return null; //Oculta si no hay ganador
        

        if (winner === false){
            return (
                <section className="winner">
                    <div className="text">
                     <h2>{winner === false ? "Empate" : "Ganó"}</h2>                
                    <footer>
                        <Button onClick={resetGame}>Volver a empezar</Button>
                    </footer>
                    </div>
                </section>
                ); 
        } 


        if (winner === 'P1') {
            return (
                <section className="winner">
                    <div className="text">
                     <h2>{winner === false ? "Empate" : "Ganó"}</h2>
                    {winner && (
                        <header className="win">
                        <Square>{player1 && (
                            <img 
                                src={player1} 
                                alt={player1} 
                                className='turn-img' 
                            />
                                )}</Square>
                        </header>
                    )}
                    <footer>
                        <Button onClick={resetGame}>Volver a empezar</Button>
                    </footer>
                    </div>
                </section>
                ); 
        }

        if (winner === 'P2') {
             return (
                    <section className="winner">
                        <div className="text">
                        <h2>{winner === false ? "Empate" : "Ganó"}</h2>
                        {winner && (
                            <header className="win">
                            <Square>{player1 && (
                            <img 
                                src={player2} 
                                alt={player2} 
                                className='turn-img' 
                            />
                                )}</Square>
                            </header>
                        )}
                        <footer>
                            <Button onClick={resetGame}>Volver a empezar</Button>
                        </footer>
                        </div>
                    </section>
                );
         }   
    };