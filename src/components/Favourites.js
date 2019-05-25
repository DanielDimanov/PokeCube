import React, { Component } from 'react';

//Import Firebase
import {providers,firebaseAppAuth,firebaseFirestore} from './Firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';

//Import the nested components
import PokeList from './PokeList';

//Import styling
import './styles/App.css';

class Favourite extends Component {

  constructor(props){
    super(props);
    this.state={favouriteIds: undefined};
  }

  componentDidUpdate(){
    if(this.props.user){
      firebaseFirestore.collection("users").doc(this.props.user.uid).get().then(doc => {
        if (doc.exists) {
          let ids = [];
          ids=ids.concat(doc.data().ids);
          this.setState({favouriteIds:ids});
        }
      })
      .catch(err => {
        console.log("Error getting document; error:", err);
      });
    }
  }

  render() {
    //Firebase session
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    

    return (
      <div className="App">
        {
          this.props.user
          ?
            this.state.favouriteIds
            ?  <PokeList favourites={this.state.favouriteIds} favouriteIds={this.state.favouriteIds}/>
            : <h1> Go and choose your favourite Pokemons!</h1>
          :
          <h1> You need to authenticate to use this feature! </h1>
        }
      </div>
    );
  }
}

export default withFirebaseAuth({providers,firebaseAppAuth})(Favourite);