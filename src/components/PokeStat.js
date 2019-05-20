import React from 'react';
import { Fetch } from 'react-request';
import {statDictionary} from '../assets/dictionaries/statDictionary';

//Import styling
import './styles/PokeStat.css';

const PokeStat = props => {
    let pokemon = props.pokemon;
    let statValue = pokemon.stats[statDictionary[props.stat]].base_stat;
    // let imgPath = '../assets/icons/'+pokemon.types[0].type.name+'.png';
    let statIconPath = process.env.PUBLIC_URL+"/icons/"+props.stat +'.png';
    console.log(statIconPath);
  return (
    // TODO change placeholder
    <div>
        <p className="stat-bar">
            <img className="icon" title={props.stat} src={statIconPath} />
            {statValue} 
            <progress max="100" value={statValue}> {statValue} </progress>
        </p>
    </div>
  )
}


export default PokeStat;