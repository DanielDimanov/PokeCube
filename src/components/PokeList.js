import React,{Component} from 'react';
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
class PokeList extends Component{

    constructor(props){
        super(props);
    }

    selectPokemonInList = (id) =>{
        this.props.selectPokemon(id);

        // this.setState(prevState => ({
        //     piska: !this.prevState.pishka
        // }));
    }

    render(){
        return (
            <section>
                {
                    this.props.compare
                    ? 
                    <div className="compare-list">
                        <PokeBall pokemonEndpoint="25" compare={this.props.compare} selectPokemon={this.selectPokemonInList}/>
                        <PokeBall pokemonEndpoint="26" compare={this.props.compare} selectPokemon={this.selectPokemonInList}/>
                    </div>
                    :
                    <div className="poke-list">
                        <PokeBall pokemonEndpoint="25"/>
                    </div>
                }
            </section>
          );
    }
}


export default PokeList;