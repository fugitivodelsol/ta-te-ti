 import './pokeCard.css';

export const PokeCard = ({pokeName,pokeImg })=>
{
    return(
        <div className="pokeCard">
          <div><p>{pokeName}</p></div>
          <div><img src={pokeImg} alt={pokeName} /></div>
        </div>
    )
}