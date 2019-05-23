import React , {Component} from 'react';
import { Fetch } from 'react-request';

//Import styling
import './styles/PokeBall.css';
import PokeStat from './PokeStat';
import Pokemon from './Pokemon';

// Firestore
import { firebaseFirestore} from './Firebase';

class PokeBall extends Component{

    clName="";
    endpointBase="https://pokeapi.co/api/v2/pokemon/";

    constructor(props){
        super(props);
            props.compare
            ? this.clName="compare-"
            : this.clName="";
    }

    storePokemon(id,pokemon){
        const db = firebaseFirestore;
        db.settings({
            timestampsInSnapshots: true
        });
        return db.collection("pokemons").doc(id).set(pokemon);
    }



    render(){
        //FIX
        if(true){
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
       
                return null;
              }}
            </Fetch>
          </div>
        )
      }
        else{
          console.log('Cached');
        }
        
    }
}
// const PokeBall = props => {

//   return (
//       <div className={clName+"poke-list"}>
//         <Fetch url={props.pokemonEndpoint} >
//         {({ fetching, failed, data }) => {
//           if (fetching) {
//             return <div>Loading data...</div>;
//           }
 
//           if (failed) {
//             return <div>The request did not succeed.</div>;
//           }
 
//           if (data) {
//             return (
//               <div>
//                 {
                    
//                 }
//                 <div className={clName+"poke-name"}>
//                     {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
//                 </div>
//                 <div className={clName+"poke-pic"}>
//                     <img src={data.sprites.front_default} alt="pokemon"/>
//                 </div>
//                 <div className={clName+"stats"}>
//                     <div className={clName+"hp-stat"}>
//                         <PokeStat pokemon={data} stat="hp"/>
//                     </div>
//                     <div className={clName+"atk-stat"}>
//                         <PokeStat pokemon={data} stat="attack"/>
//                     </div>
//                     <div className={clName+"def-stat"}>
//                         <PokeStat pokemon={data} stat="defence"/>
//                     </div>
//                     <div className={clName+"energy-stat"}>
//                         <PokeStat pokemon={data} stat="speed"/>
//                     </div>
//                 </div>
//               </div>
//             );
//           }
 
//           return null;
//         }}
//       </Fetch>
//     </div>
//   )
// }


export default PokeBall;