import React , {Component} from 'react';

//Import styling
import './styles/PokeBall.css';
import PokeStat from './PokeStat';


//TODO Convert to class component

class Pokemon extends Component{

    clName="";
    data;

    constructor(props){
        super(props);
            props.compare
            ? this.clName="compare-"
            : this.clName="";
        this.data= props.data;
        this.data.id= props.pokemonId;

    }


    render(){
        return (
                <div>
                    <div className={this.clName+"poke-name"}>
                        {this.data.name.charAt(0).toUpperCase() + this.data.name.slice(1)} 
                    </div>
                    <div className={this.clName+"poke-pic"}>
                         <img src={this.data.sprites.front_default} alt={"pokemon-"+ this.props.pokemonId} />
                    </div>
                    <div className={this.clName+"stats"}>
                        <div className={this.clName+"hp-stat"}>
                            <PokeStat pokemon={this.data} stat="hp" compare={this.clName}/>
                        </div>
                        <div className={this.clName+"atk-stat"}>
                            <PokeStat pokemon={this.data} stat="attack" compare={this.clName}/>
                        </div>
                        <div className={this.clName+"def-stat"}>
                            <PokeStat pokemon={this.data} stat="defence" compare={this.clName}/>
                        </div>
                        <div className={this.clName+"energy-stat"}>
                            <PokeStat pokemon={this.data} stat="speed" compare={this.clName}/>
                        </div>
                    </div>
                </div>
        )
    }
}


export default Pokemon;