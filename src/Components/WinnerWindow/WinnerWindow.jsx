import { Square } from "../Square/Square"
import { Button } from "../Button"

export const WinnerWindow = ({winner, resetGame})=>
    {

        if (winner === null) return null; //Oculta si no hay ganador

        return (
            <section className="winner">
                <div className="text">
                 <h2>{winner === false ? "Empate" : "Ganó"}</h2>
                {winner && (
                    <header className="win">
                    <Square>{winner}</Square>
                    </header>
                )}
                <footer>
                    <Button onClick={resetGame}>Volver a empezar</Button>
                </footer>
                </div>
            </section>
        );
    };