import React , {Component} from 'react';
import { Fetch } from 'react-request';

//Import styling
import './styles/PokeBall.css';
import PokeStat from './PokeStat';
import Pokemon from './Pokemon';

//Import Spinner
import Spinner from 'react-spinner-material';

// Firebase and Firestore
import withFirebaseAuth from 'react-with-firebase-auth';
import {firebaseAppAuth,providers} from './Firebase';
import { firebaseFirestore} from './Firebase';

class PokeBall extends Component{

    clName="";
    endpointBase="https://pokeapi.co/api/v2/pokemon/";
  
    constructor(props){
        super(props);
        // this.bindMethods(this);
            props.compare
            ? this.clName="compare-"
            : this.clName="";
        this.state={pokemonEndpoint:"",ready:false,cached:false, cachedData:"",isFavourite:false};
    }

    // bindMethods(that){
    //   that.pokeBallStructure = that.pokeBallStructure.bind(that);
    //   that.storePokemon = that.storePokemon.bind(that);
    //   that.isCached = that.isCached.bind(that);
    // }

    storePokemon= (id,pokemon)=>{
        if(!this.state.cachedData){
          const db = firebaseFirestore;
          return db.collection("pokemons").doc(id).set(pokemon);
        }
    }

    // componentDidUpdate(){
    //   this.isCached(this.props.pokemonEndpoint);
    // }

    componentWillMount(){
      this.isCached(this.props.pokemonEndpoint);
    }

    componentWillReceiveProps({pokemon}) {
      //TODO SETSTATE cachedData
      if(pokemon){
        this.setState({cached:true, cachedData:pokemon , ready:true, pokemonEndpoint:""+pokemon.id});
      }
    }
    

    isCached= (id)=>{
      firebaseFirestore.collection('pokemons').doc(id).get().then(doc => {
        if (!doc.exists) {
          this.setState({cached:false,ready:true});
        } else {
          this.setState({cached:true, cachedData:{name:doc.data().name, id:doc.data().id, stats:doc.data().stats, sprites:doc.data().sprites},ready:true});
        }
      })
      .catch(err => {
        console.log('Error getting document '+ id+ " error:", err);
      });
    }

    recruitPokemon(id){
      if (!this.props.user){
        console.log("Click me all you want. You have to login as a trainer if you want to train me!");
      }
      else{
        firebaseFirestore.collection("users").doc(this.props.user.uid).get().then(doc => {
          if (!doc.exists) {
              let ids=[id];
              this.setState({isFavourite:!this.state.isFavourite});
              return firebaseFirestore.collection("users").doc(this.props.user.uid).set({ids});
          } else {
              let ids = [];
              ids=ids.concat(doc.data().ids);
              let sameIdIndex = ids.indexOf(id);
              if(sameIdIndex>-1){
                this.setState({isFavourite:!this.state.isFavourite});
                ids.splice(sameIdIndex,1);
              }
              else{
                this.setState({isFavourite:true});
                ids.push(id);
              }
              console.log(ids);
              return firebaseFirestore.collection("users").doc(this.props.user.uid).update({
                ids
              });
          }
        })
        .catch(err => {
          console.log('Error getting document '+ id+ " error:", err);
        });
      }
    }

    getFavImage(){
      let favIconPath="";
      if(this.props.compare){
        return "";
      }else{
        if(this.state.isFavourite || this.props.isFavourite){
          favIconPath = process.env.PUBLIC_URL+"/icons/fav.png";
        }else{
          favIconPath = process.env.PUBLIC_URL+"/icons/notFav.png";
        }
      }
      return <img className={this.clName+"favIcon"} title="favIcon" src={favIconPath}/>
    }


    pokeBallStructure = data => {
      return(
        <div onClick={() => this.props.selectPokemon? this.props.selectPokemon(data) : this.recruitPokemon(data.id)}>
        <div className={this.clName+"poke-name"}>
            {data.name.charAt(0).toUpperCase() + data.name.slice(1)} 
            {
              this.props.user
              ? this.getFavImage()
              : ""
            }
        </div>
        <div className={this.clName+"poke-pic"}>
             <img src={data.sprites.front_default} alt={"pokemon-"+ data.id} />
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
                <div className={this.clName+"poke-ball"}>
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
          if(this.state.ready){
            return (
              <div className={this.clName+"poke-ball"} onClick={() => this.props.selectPokemon? this.props.selectPokemon(this.state.cachedData) : this.recruitPokemon(this.props.pokemonEndpoint)}>
                { this.pokeBallStructure(this.state.cachedData)}
              </div>
            )
          }else{
            return <Spinner size={50} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
          }
        }
        
    }
}


export default withFirebaseAuth({providers,firebaseAppAuth})(PokeBall);