import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Pokemon() {
  const { id } = useParams();
  const [pokemonId, setPokemonId] = useState(id);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function fetchPokemonDescription() {
      console.log("running fetch");
      setLoading(true);

      const pokemonDescUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`;
      const { data } = await axios.get(pokemonDescUrl);

      const pokemon = {
        name: data.name,
        description: data.flavor_text_entries[0].flavor_text,
        habitat: data.habitat.name,
      };

      if (Object.keys(pokemon).length > 0) {
        setLoading(false);
        setPokemonDetails(pokemon);
      }
      console.log(data);
    }

    fetchPokemonDescription();
  }, [pokemonId]);

  function loadNextPokemon() {
    setPokemonId((prevId) => parseInt(prevId) + 1);
    setPokemonDetails({});
    history.push(`/pokemon/${parseInt(pokemonId) + 1}`);
  }

  function loadPreviousPokemon() {
    setPokemonId((prevId) => parseInt(prevId) - 1);
    setPokemonDetails({});
    history.push(`/pokemon/${parseInt(pokemonId) - 1}`);
  }

  return (
    <div>
      {Object.keys(pokemonDetails).length !== 0 && (
        <>
          <div
            className="pokemon-description-container"
            style={{
              display: "flex",
              margin: "auto",
              justifyContent: "center",
            }}
          >
            <div>
              <h3>
                {pokemonDetails.name} #{id}
              </h3>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`}
                alt={pokemonId}
                className="pokemon-image"
                height="300"
              />
            </div>
            <div style={{ width: "40%", textAlign: "left" }}>
              <p>
                <b>Description:</b> {pokemonDetails.description}
              </p>
              <p>
                <b>Habitat:</b> {pokemonDetails.habitat}
              </p>

              {pokemonId > 1 && (
                <button onClick={loadPreviousPokemon}>Previous</button>
              )}
              {pokemonId < 150 && (
                <button onClick={loadNextPokemon}>Next</button>
              )}
            </div>
          </div>
        </>
      )}
      {loading && <p>Loading..</p>}
    </div>
  );
}

export default Pokemon;
