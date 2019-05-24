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
        this.state={ready:false,displayedItems:50};
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        // await this.delay(this.state.displayedItems*3);
        if(this.readyForUpdate){
            let windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            let body = document.body;
            let html = document.documentElement;
            let docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            let windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                if(this.state.displayedItems<797){
                    if(this.state.displayedItems>400){
                        alert("Caution! You are trying to display a lot of Pokemons. If you use certain browsers" +
                        "(such as Google Chrome) you may encounter memory issues and your browser may crash because currently the Pokemons are too powerful for their Poke balls. Please wait, some of them are hard to catch!" + "Please enjoy the " + this.state.displayedItems + " Pokemons displayed currently!");
                    }
                    this.readyForUpdate=false;
                    this.setState( prevState =>({
                        displayedItems: prevState.displayedItems + 100
                    }));
                }
                else{
                    alert("Pokemoms are being caught. Please wait, some of them are hard to catch!" + "Please enjoy the " + this.state.displayedItems + " Pokemons displayed currently!");
                    window.removeEventListener("scroll", this.handleScroll);
                }
            } 
        }
      }

      componentDidUpdate(){
        this.readyForUpdate = true;
        window.addEventListener("scroll", this.handleScroll);
      }

      componentWillUpdate(){
        this.readyForUpdate = false;
        window.removeEventListener("scroll", this.handleScroll);
      }

      componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
    
      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);

      }

    selectPokemonInList = (id) =>{
        this.props.selectPokemon(id);
        // this.setState(prevState => ({
        //     piska: !this.prevState.pishka
        // }));
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
                                var pokemonsCaught=[];
                                    if(compareMode){
                                        return(
                                            <div className="poke-ball-wrapper">
                                                {data.results.map(pokemon=> <PokeBall key={pokemon.url.slice(34,pokemon.url.length-1)} pokemonEndpoint={pokemon.url.slice(34,pokemon.url.length-1)} compare={compareMode} selectPokemon={this.selectPokemonInList}/>)}
                                            </div>
                                        );
                                    }
                                    else{
                                        return(
                                            <div className="poke-ball-wrapper">
                                                {data.results.map(pokemon=> <PokeBall key={pokemon.url.slice(34,pokemon.url.length-1)} pokemonEndpoint={pokemon.url.slice(34,pokemon.url.length-1)}/>)}
                                            </div>
                                        );
                                    }
                                // data.results.forEach(pokemon => {
                                //     let pokemonURL = pokemon.url;
                                //     let pokemonId = pokemonURL.slice(34,pokemonURL.length-1);
                                //     pokemonsCaught.push(<PokeBall key={pokemonId} pokemonEndpoint={pokemonId}/>);
                                // });
                                // return pokemonsCaught;
                                }
                            }}
                </Fetch>
        );
    }
 
    render(){
        return (
            <section>
                {

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