import React from 'react';
import {statDictionary} from '../assets/dictionaries/statDictionary';

//Import styling
import './styles/PokeStat.css';

const PokeStat = props => {
    let pokemon = props.pokemon;
    let statValue = pokemon.stats[statDictionary[props.stat]].base_stat;
    let statIconPath = process.env.PUBLIC_URL+"/icons/"+props.stat +'.png';
  return (
    <div>
        <p className={props.compare + "stat-bar"}>
            <img alt={props.stat} className="icon" title={props.stat} src={statIconPath} />
            {statValue} 
            {/* <progress max="100" value={statValue}> {statValue} </progress> */}
            <meter id={props.stat} name={props.stat} min="0" max="100" low="33" high="66" optimum="80" value={statValue}>{statValue}</meter>
        </p>
    </div>
  )
}


export default PokeStat;