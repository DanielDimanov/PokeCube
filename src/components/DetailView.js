import React,{Component} from 'react';
import './styles/DetailView.css';
import PokeList from './PokeList';
import PokeBall from './PokeBall';

class DetailView extends Component{

  constructor(props){
    super(props);
    this.state={selectedPokemon:undefined};
    this.selectPokemon.bind(this);
  }


  selectPokemon = (pokemon) => {
    if(this.state.selectedPokemon !== pokemon){
      this.setState({selectedPokemon:pokemon});
    }
    else{
      this.setState({selectedPokemon:undefined});
    }
  }

  render(){
    return (
      <section className="detail-view">
        <div className="center poke-flex" ref="chosenPokemon">
          {
              this.state.selectedPokemon
              ? <PokeBall pokemon={this.state.selectedPokemon} pokemonEndpoint={""+this.state.selectedPokemon.id} selectPokemon={this.selectPokemon}/>
              : <p>Please select a Pokemon for comparison</p>
          }
        </div>
        <PokeList compare="true" selectPokemon={this.selectPokemon}/>
      </section>
    );
  }
}

export default DetailView;