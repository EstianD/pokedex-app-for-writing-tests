import { useState, useEffect } from "react";
import axios from "axios";
import "./pokemonList.css";
import NextPokemonsBtn from "../pagination/NextPokemonsBtn";
import PreviousPokemonsBtn from "../pagination/PreviousPokemonsBtn";
import { Link } from "react-router-dom";

const pokemonSprite =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [offset, setOffset] = useState();
  const [perPage, setPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  //   const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("load effect");

    async function fetchAllPokemon() {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000`;
      setLoading(true);
      setAllPokemons([]);
      const pokemon = await axios.get(pokemonUrl);
      setAllPokemons(pokemon.data.results);
      setOffset(0);
      setLoading(false);
    }
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    console.log("filtering effect");
    setLoading(true);

    if (allPokemons.length > 0) {
      let pokemonsCopy = [...allPokemons];
      console.log("copy: ", pokemonsCopy);

      setFilteredPokemons(pokemonsCopy.slice(offset, offset + perPage));
      setLoading(false);
    }
  }, [offset]);

  function nextPage() {
    setOffset((prevState) => prevState + 12);
    setFilteredPokemons([]);
  }

  return (
    <div className="page-container">
      <div className="pagination-container-left"></div>
      <div className="pokemon-list-container">
        {filteredPokemons.map((pokemon, i) => {
          const id = pokemon.url.split("/")[6];

          return (
            <div className="pokemon-container" key={i}>
              <p>
                <Link to={`/pokemon/${id}`}>
                  {pokemon.name} {`# ${offset + i + 1}`}{" "}
                </Link>
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
    </div>
  );
}

export default PokemonList;
