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
        this.state={displayedItems:50, bottom:false};
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            
          this.setState( prevState =>({
            bottom:true , displayedItems: prevState.displayedItems + 50
          }));
        } else {
          this.setState({bottom:false});
        }
      }
    
      componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }
    
      componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }

    // catchThemAll(){
    //     let offset=this.state.offset;
    //     offset+=99;
    //     this.setState({offset:offset});
    // }

    // componentDidMount() {
    //     setInterval(()=>this.catchThemAll(),61000);
    //   }

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
                        {/* <Fetch url={"https://pokeapi.co/api/v2/pokemon/?offset="+this.state.offset+"&limit=99"} > */}
                        <Fetch url={"https://pokeapi.co/api/v2/pokemon/?offset=0&limit="+this.state.displayedItems} >
                            {({ fetching, failed, data }) => {
                                if (fetching) {
                                return <div>Loading data...</div>;
                                }
                    
                                if (failed) {
                                return <div>The request did not succeed.</div>;
                                }
                    
                                if (data) {
                                // console.log(data.results[0].url.slice(34,35));
                                var pokemonsCaught=[]
                                data.results.forEach(pokemon => {
                                    let pokemonURL = pokemon.url;
                                    let pokemonId = pokemonURL.slice(34,pokemonURL.length-1);
                                    pokemonsCaught.push(<PokeBall key={pokemonId} pokemonEndpoint={pokemonId}/>);
                                });
                                return pokemonsCaught;
                                }
                            }}
                        </Fetch>
                    </div>
                }
            </section>
          );
    }
}


export default PokeList;