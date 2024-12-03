 import './pokeCard.css';

export const PokeCard = ({pokeName, pokeImg, pokeIndex, PlayerPoke })=>
{
  const handleClick = () => {
    PlayerPoke(pokeIndex); // Llamar a la función pasada con el índice del Pokémon
  };
    return(
        <div className="pokeCard" onClick={handleClick} >
          <div><p>{pokeName}</p></div>
          <div><img src={pokeImg} alt={pokeName} /></div>
        </div>
    )
}