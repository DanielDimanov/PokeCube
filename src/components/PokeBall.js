import React from 'react';
import { Fetch } from 'react-request';

//Import styling
import './styles/PokeBall.css';
import PokeStat from './PokeStat';


//TODO Convert to class component
const PokeBall = props => {

  return (
      <div className="poke-ball">
        <Fetch url={props.pokemonEndpoint} >
        {({ fetching, failed, data }) => {
          if (fetching) {
            return <div>Loading data...</div>;
          }
 
          if (failed) {
            return <div>The request did not succeed.</div>;
          }
 
          if (data) {
            return (
              <div>
                <div className="poke-name">{data.name}</div>
                <div className="poke-pic">
                    <img src={data.sprites.front_default} alt="pokemon"/>
                </div>
                <div className="stats">
                    <div className="hp-stat">
                        <PokeStat pokemon={data} stat="hp"/>
                    </div>
                    <div className="atk-stat">
                        <PokeStat pokemon={data} stat="attack"/>
                    </div>
                    <div className="def-stat">
                        <PokeStat pokemon={data} stat="defence"/>
                    </div>
                    <div className="energy-stat">
                        <PokeStat pokemon={data} stat="speed"/>
                    </div>
                </div>
              </div>
            );
          }
 
          return null;
        }}
      </Fetch>
    </div>
  )
}


export default PokeBall;