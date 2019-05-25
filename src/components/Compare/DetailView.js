import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './DetailView.css';
import PokeList from '../PokeList';
import PokeBall from '../PokeBall';

class DetailView extends Component{

  constructor(props){
    super(props);
    this.state={selectedPokemon:undefined};
    this.selectPokemon.bind(this);
  }


  selectPokemon = (pokemon) => {
    if(this.state.selectedPokemon !=pokemon){
      console.log("But why?" + pokemon);
      this.setState({selectedPokemon:pokemon});
      // this.setState({selectedPokemon:undefined}, () => {
      //   this.setState({selectedPokemon:id});
      // });
    }
    else{
      this.setState({selectedPokemon:undefined});
    }
  }

  // checkSelectedPokemon = () => {
  //   if (this.state.selectedPokemon){
  //     return <PokeBall pokemonEndpoint={this.state.selectedPokemon}/>;
  //   }
  //   else{
  //     return <p>Select a Pokemon for comparison</p>;
  //   }
  // }

  render(){
    return (
      <section className="detail-view">
        <div className="center" ref="chosenPokemon">
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