import React,{Component} from 'react';
import { Fetch } from 'react-request';
//Import components
import PokeBall from './PokeBall';

//Import styling
import './styles/PokeList.css';

//Import Spinner
import Spinner from 'react-spinner-material';

class PokeList extends Component{

    //State not used because of "Maximum update depth exceeded." bug
    readyForUpdate=false;

    constructor(props){
        super(props);
        this.state={ready:false,displayedItems:25};
    }

    handleScroll= ()=> {
        if(this.readyForUpdate){
            let windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            let body = document.body;
            let html = document.documentElement;
            let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            let windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                if(this.state.displayedItems<797){
                    if(this.state.displayedItems>400){
                        alert("Caution! You are trying to display a lot of Pokemons. If you use certain browsers (such as Google Chrome) you may encounter memory issues and your browser may crash because currently the Pokemons are too powerful for their Poke balls. Please wait, some of them are hard to catch! Please enjoy the " + this.state.displayedItems + " Pokemons displayed currently!");
                    }
                    this.readyForUpdate=false;
                    this.setState( prevState =>({
                        displayedItems: prevState.displayedItems + 30
                    }));
                }
                else{
                    alert("Pokemoms are being caught. Please wait, some of them are hard to catch! Please enjoy the " + this.state.displayedItems + " Pokemons displayed currently!");
                    window.removeEventListener("scroll", this.handleScroll);
                }
            } 
        }
      }

    componentWillMount() {
        this.readyForUpdate = true;
        window.addEventListener("scroll", this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    } 

    selectPokemonInList = (id) =>{
        this.props.selectPokemon(id);
    }

    checkIfFavPokemon= (id)=> {
        if(this.props.favourites.includes(id)){
            return true;
        }else{
            return false;
        }
    }

    extractID(url){
        return url.slice(34,url.length-1);
    }


    fetchRequest(compareMode){
        return(
            <Fetch url={"https://pokeapi.co/api/v2/pokemon/?offset=0&limit="+this.state.displayedItems}>
                            {({ fetching, failed, data }) => {
                                if (fetching) {
                                return <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />;
                                }
                    
                                if (failed) {
                                return <div>The request did not succeed.</div>;
                                }
                    
                                if (data) {
                                    if(compareMode){
                                        return(
                                            <div className="poke-ball-wrapper">
                                                {
                                                 data.results.map(pokemon=> <PokeBall key={this.extractID(pokemon.url)} pokemonEndpoint={this.extractID(pokemon.url)} compare={compareMode} selectPokemon={this.selectPokemonInList}/>)
                                                }
                                            </div>
                                        );
                                    }
                                    else{
                                        return(
                                            <div className="poke-ball-wrapper">
                                                {
                                                    this.props.favourites
                                                    ? data.results.map(pokemon=> <PokeBall isFavourite={this.checkIfFavPokemon(this.extractID(pokemon.url))} key={this.extractID(pokemon.url)} pokemonEndpoint={this.extractID(pokemon.url)}/>)
                                                    : data.results.map(pokemon=> <PokeBall key={this.extractID(pokemon.url)} pokemonEndpoint={this.extractID(pokemon.url)}/>)
                                                }
                                            </div>
                                        );
                                    }
                                }
                            }}
                </Fetch>
        );
    }
 
    render(){
        return (
            <section>
                {
                    this.props.favouriteIds
                    ? 
                        this.props.favourites
                        ?
                        <div className="poke-ball-wrapper">
                            {this.props.favouriteIds.map(id => <PokeBall isFavourite={this.checkIfFavPokemon(id)} key={""+id} pokemonEndpoint={""+id}/>)}
                        </div>
                        :
                        <div className="poke-ball-wrapper">
                            {this.props.favouriteIds.map(id => <PokeBall key={""+id} pokemonEndpoint={""+id}/>)}
                        </div>
                    
                    :
                        this.props.compare
                        ? 
                        <div className="compare-list">
                            {this.fetchRequest(true)}
                        </div>
                        :
                        <div className="poke-list">
                            {this.fetchRequest(false)}
                        </div>
                    
                }
            </section>
          );
    }
}


export default PokeList;