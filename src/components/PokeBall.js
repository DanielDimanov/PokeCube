import React from 'react';
import { Fetch } from 'react-request';

//Import styling
import './styles/PokeBall.css';
import PokeStat from './PokeStat';


//TODO Convert to class component
const PokeBall = props => {

    let clName="";
    props.compare
    ? clName="compare-"
    : clName="";

  return (
      <div className={clName+"poke-list"}>
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
                {
                    
                }
                <div className={clName+"poke-name"}>
                    {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                </div>
                <div className={clName+"poke-pic"}>
                    <img src={data.sprites.front_default} alt="pokemon"/>
                </div>
                <div className={clName+"stats"}>
                    <div className={clName+"hp-stat"}>
                        <PokeStat pokemon={data} stat="hp"/>
                    </div>
                    <div className={clName+"atk-stat"}>
                        <PokeStat pokemon={data} stat="attack"/>
                    </div>
                    <div className={clName+"def-stat"}>
                        <PokeStat pokemon={data} stat="defence"/>
                    </div>
                    <div className={clName+"energy-stat"}>
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