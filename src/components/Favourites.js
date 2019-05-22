import React, { Component } from 'react';

//Import Firebase
import {providers,firebaseAppAuth} from './Firebase';

import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';

//Import the nested components
import PokeList from './PokeList';

//Import styling
import './styles/App.css';

class Favourite extends Component {

  render() {
    //Firebase session
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;


    

    return (
      <div className="App">
        <PokeList>
            Fav
        </PokeList>
      </div>
    );
  }
}

export default withFirebaseAuth({providers,firebaseAppAuth})(Favourite);