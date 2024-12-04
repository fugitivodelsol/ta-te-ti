import './SelectPoke.css';
import { PokeCard } from "../PokeCard";

export const SelectPoke = ({ pokemones, PlayerPoke }) => {
  // Asegurarte de que `pokemones` tenga datos antes de mapearlos
  if (!pokemones || pokemones.length === 0) {
    return <p>Cargando Pokémon...</p>;
  }

  // Seleccionar tres Pokémon aleatorios
  const getRandomPokemons = (pokemonList, count) => {
    const shuffled = [...pokemonList].sort(() => 0.5 - Math.random()); // Mezclar la lista
    return shuffled.slice(0, count); // Tomar los primeros `count` elementos
  };

  const randomPokemons = getRandomPokemons(pokemones, 3);

  return (
    <div className="SelectPoke">
      {randomPokemons.map((pokemon, index) => (
        <PokeCard 
          key={pokemon.id} 
          pokeName={pokemon.name} 
          pokeImg={pokemon.img} 
          pokeIndex={pokemon.id} // Pasar el índice
          PlayerPoke={PlayerPoke} // Pasar la función
        />
      ))}
    </div>
  );
};
