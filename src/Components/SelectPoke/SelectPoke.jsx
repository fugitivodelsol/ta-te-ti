import './SelectPoke.css';
import { PokeCard } from "../PokeCard"

export const SelectPoke = ({pokemones, PlayerPoke }) =>{
    // Asegurarte de que `pokemones` tenga datos antes de mapearlos
  if (!pokemones || pokemones.length === 0) {
    return <p>Cargando Pokémon...</p>;
  }
  // Renderizar solo los primeros 3 Pokémon
  return (
    <div className='SelectPoke'>
      {pokemones.slice(0, 3).map((pokemon, index) => (
        <PokeCard 
          key={pokemon.id} 
          pokeName={pokemon.name} 
          pokeImg={pokemon.img} 
          pokeIndex={index} // Pasar el índice
          PlayerPoke={PlayerPoke} // Pasar la función
        />
      ))}
    </div>)
}