import { useState, useEffect } from "react";
import axios from "axios";
import "./pokemonList.css";
import NextPokemonsBtn from "../pagination/NextPokemonsBtn";
import PreviousPokemonsBtn from "../pagination/PreviousPokemonsBtn";
import { Link } from "react-router-dom";

const pokemonSprite =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchAllPokemon() {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
      setLoading(true);
      setPokemons([]);
      const pokemon = await axios.get(pokemonUrl);
      setPokemons(pokemon.data.results);
      setLoading(false);
    }
    fetchAllPokemon();
  }, [offset]);

  function nextPage() {
    setOffset((prevState) => prevState + 12);
  }

  return (
    <>
      <div className="pagination-container-left"></div>
      <div className="pokemon-list-container">
        {pokemons.map((pokemon, i) => {
          const id = pokemon.url.split("/")[6];
          return (
            <div className="pokemon-container" key={i}>
              <p>
                <Link to={`/pokemon/${id}`}>{pokemon.name} </Link>
              </p>

              <img
                className="pokemon-list-img"
                src={pokemonSprite + id + ".png"}
                alt={pokemon.name}
              />
            </div>
          );
        })}
        {loading && <p>Loading...</p>}
      </div>
      <div className="pagination-container-right">
        <NextPokemonsBtn nextPage={nextPage} />
      </div>
    </>
  );
}

export default PokemonList;
