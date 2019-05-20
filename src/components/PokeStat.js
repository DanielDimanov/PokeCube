import React from 'react';
import { Fetch } from 'react-request';
import {statDictionary} from '../assets/dictionaries/statDictionary';

//Import styling
import './styles/PokeStat.css';

const PokeStat = props => {
    let stat = props.pokemon.stats[statDictionary[props.stat]].base_stat;
  return (
    // TODO change placeholder
    <div>
        <p> {stat}</p>
    </div>
  )
}



export default PokeStat;