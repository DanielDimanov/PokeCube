import React,{Component} from 'react';
import './DetailView.css';
import PokeList from '../PokeList';
import PokeBall from '../PokeBall';

class DetailView extends Component{

  constructor(props){
    super(props);
    this.state={selectedPokemon:null};
  }

  selectPokemon = (id) => {
    this.setState({selectedPokemon:id});
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
          {
              this.state.selectedPokemon
              ? <PokeBall pokemonEndpoint={this.state.selectedPokemon}/> 
              :<p>Select a Pokemon for comparison</p>
          }
        <div className='data-wrapper'>
          <h1 className='data-name'></h1>
          <p className="data-char"></p>
        </div>
        <PokeList compare="true" selectPokemon={this.selectPokemon}/>
      </section>
    );
  }
}

export default DetailView;