import React, { Component } from 'react';

//Import Components
import Home from './Home';
import Compare from './Compare';

//Import Firebase
import {providers,firebaseAppAuth} from './Firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';

//Import Router
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

//Import styling
import './styles/Navigation.css';
import Favourites from './Favourites';


class Navigation extends Component {

  render() {
    //Firebase session
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;

    

    return (
      <div className="Navigation">
        <Router basename="/pokecube">
        <div>
            <nav>
            <ul>
                <li>
                <NavLink to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="/compare">Compare</NavLink>
                </li>
               
                {/* Floatted right, so inverse order */}

                <li className ="right-nav">
                {
                    user
                    ? <button className="nav-listing" onClick={signOut}>Sign out</button>
                    : <button className="nav-listing" onClick={signInWithGoogle}>Sign in with Google</button>
                }
                </li>
                <li className="right-nav">
                <NavLink to="/favourite">
                    <img height="20px" alt="fav" src={process.env.PUBLIC_URL+"/icons/hp.png"}></img>
                </NavLink>
                </li>
                
            </ul>
            </nav>

            <Route path="/" exact component={Home} />
            <Route path="/compare" exact component={Compare} />
            <Route path="/favourite" exact component={Favourites} />
        </div>
        </Router>
          
      </div>
    );
  }
}


export default withFirebaseAuth({providers,firebaseAppAuth})(Navigation);