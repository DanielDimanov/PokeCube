import React, { Component } from 'react';

//Import Firebase
import {providers,firebaseAppAuth} from './Firebase';

import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';

//Import styling
import './styles/Navigation.css';


class Navigation extends Component {
  constructor() {
    super();
  }

  render() {
    //Firebase session
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    

    return (
      <div className="Navigation">
        <p>Dali </p>
        {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p>Please sign in.</p>
          }

          {
            user
              ? <button onClick={signOut}>Sign out</button>
              : <button onClick={signInWithGoogle}>Sign in with Google</button>
          }
      </div>
    );
  }
}


export default withFirebaseAuth({providers,firebaseAppAuth})(Navigation);