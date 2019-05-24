import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './DetailView.css';
import PokeList from '../PokeList';
import PokeBall from '../PokeBall';

class DetailView extends Component{

  constructor(props){
    super(props);
    this.state={selectedPokemon:null};
    this.selectPokemon.bind(this);
  }

  selectPokemon = (id) => {
    if(this.state.selectedPokemon !=id){
      this.setState({selectedPokemon:id});
      ReactDOM.findDOMNode(this.refs.chosenPokemon).style.display = 'block';
    }
    else{
      this.setState({selectPokemon:null});
      ReactDOM.findDOMNode(this.refs.chosenPokemon).style.display = 'none';
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
              ? <PokeBall pokemonEndpoint={this.state.selectedPokemon} selectPokemon={this.selectPokemon}/>
              :<p>Please select a Pokemon for comparison</p>
          }
        </div>
        <PokeList compare="true" selectPokemon={this.selectPokemon}/>
      </section>
    );
  }
}

export default DetailView;