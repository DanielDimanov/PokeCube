import React , {Component} from 'react';
import { Fetch } from 'react-request';

//Import styling
import './styles/PokeBall.css';
import PokeStat from './PokeStat';
import Pokemon from './Pokemon';

//Import Spinner
import Spinner from 'react-spinner-material';

// Firestore
import { firebaseFirestore} from './Firebase';

class PokeBall extends Component{

    clName="";
    endpointBase="https://pokeapi.co/api/v2/pokemon/";
  
    constructor(props){
        super(props);
        this.bindMethods(this);
            props.compare
            ? this.clName="compare-"
            : this.clName="";
        this.state={cached:false, cachedData:""};
    }

    bindMethods(that){
      that.pokeBallStructure = that.pokeBallStructure.bind(that);
      that.storePokemon = that.storePokemon.bind(that);
      that.isCached = that.isCached.bind(that);
    }

    storePokemon(id,pokemon){
        // if(!this.cachedData){
        //   const db = firebaseFirestore;
        //   return db.collection("pokemons").doc(id).set(pokemon);
        // }
    }

    componentDidUpdate(){
      this.isCached(this.props.pokemonEndpoint);
    }

    componentDidMount(){
      this.isCached(this.props.pokemonEndpoint);
    }

    componentWillReceiveProps({pokemonEndpoint}) {
      this.setState({...this.state,pokemonEndpoint});
    }

    isCached(id){
      firebaseFirestore.collection('pokemons').doc(id).get().then(doc => {
        if (!doc.exists) {
          this.setState({cached:false});
        } else {
          this.setState({cached:true, cachedData:doc.data()});
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    }

    pokeBallStructure = data => {
      return(
        <div>
        <div className={this.clName+"poke-name"}>
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)} 
        </div>
        <div className={this.clName+"poke-pic"}>
             <img src={data.sprites.front_default} alt={"pokemon-"+ this.props.pokemonEndpoint} />
        </div>
        <div className={this.clName+"stats"}>
            <div className={this.clName+"hp-stat"}>
                <PokeStat pokemon={data} stat="hp" compare={this.clName}/>
            </div>
            <div className={this.clName+"atk-stat"}>
                <PokeStat pokemon={data} stat="attack" compare={this.clName}/>
            </div>
            <div className={this.clName+"def-stat"}>
                <PokeStat pokemon={data} stat="defence" compare={this.clName}/>
            </div>
            <div className={this.clName+"energy-stat"}>
                <PokeStat pokemon={data} stat="speed" compare={this.clName}/>
            </div>
        </div>
        </div>
      );
    }

    render(){
        if(!this.state.cached){
          if(this.state.ready){
            return (
                <div className={this.clName+"poke-ball"} onClick={() => this.props.selectPokemon? this.props.selectPokemon(this.props.pokemonEndpoint) : alert("Please don't disturb the pokemons!")}>
                    <Fetch url={this.endpointBase+this.props.pokemonEndpoint} >
                    {({ fetching, failed, data }) => {
                      if (fetching) {
                        return <div>Loading data...</div>;
                      }
            
                      if (failed) {
                        return <div>The request did not succeed.</div>;
                      }
            
                      if (data) {
                        this.storePokemon(this.props.pokemonEndpoint,data);
                        return(
                          this.pokeBallStructure(data)
                        );
                      }
            
                      return null;
                    }}
                  </Fetch>
              </div>
            )
          }
          else{
            return <Spinner size={50} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
          }
        }
        else{
          return (
            <div className={this.clName+"poke-ball"} onClick={() => this.props.selectPokemon? this.props.selectPokemon(this.props.pokemonEndpoint) : alert("Please don't disturb the pokemons!")}>
              { this.pokeBallStructure(this.state.cachedData)}
            </div>
          )
        }
        
    }
}


export default PokeBall;