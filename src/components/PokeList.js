import React from 'react';
import { Fetch } from 'react-request';
//Import components
import PokeBall from './PokeBall';

//Import styling
import './styles/PokeList.css';


// Map through pokemons
/* pokemons.map(pokemon => 
    <section className="poke-list">
        <PokeBall pokemonEndpoint="https://pokeapi.co/api/v2/pokemon/25/"/>
    </section>
);*/


//TODO Convert to class component
const PokeList = props => {
  return (
    <section>
        {
            props.compare
            ? 
            <div className="compare-list" compare={props.compare}>
                <PokeBall pokemonEndpoint="https://pokeapi.co/api/v2/pokemon/25/" compare={props.compare}/>
            </div>
            :
            <div className="poke-list">
                <PokeBall pokemonEndpoint="https://pokeapi.co/api/v2/pokemon/25/"/>
            </div>
        }
        {/* <PokeBall pokemonEndpoint="https://pokeapi.co/api/v2/pokemon/25/"/> */}

        {/* Test call to avoid exhausing the endpoint calls 
        and get flagged for DDOS. */}
    </section>
  )
}


export default PokeList;