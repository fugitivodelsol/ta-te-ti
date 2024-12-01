import './SelectPoke.css';
import { PokeCard } from "../PokeCard"

export const SelectPoke = ({pokemones}) =>{
    // Asegurarte de que `pokemones` tenga datos antes de mapearlos
  if (!pokemones || pokemones.length === 0) {
    return <p>Cargando Pokémon...</p>;
  }
  // Renderizar solo los primeros 3 Pokémon
  return (
    <div className='SelectPoke'>
      {pokemones.slice(0, 3).map((pokemon) => (
        <PokeCard 
          key={pokemon.id} 
          pokeName={pokemon.name} 
          pokeImg={pokemon.img} 
        />
      ))}
    </div>)
}