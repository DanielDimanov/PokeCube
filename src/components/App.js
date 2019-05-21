import React, { Component } from 'react';

//Import Firebase
import {providers,firebaseAppAuth} from './Firebase';

import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';

//Import the nested components
import PokeList from './PokeList';

//Import styling
import './styles/App.css';

// const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {

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
        </PokeList>
      </div>
    );
  }
}

// const firebaseAppAuth = firebaseApp.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);

export default withFirebaseAuth({providers,firebaseAppAuth})(App);