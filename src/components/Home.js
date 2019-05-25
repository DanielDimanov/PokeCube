import React, { Component } from 'react';

//Import Firebase
import {providers,firebaseAppAuth} from './Firebase';
import { firebaseFirestore} from './Firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
import 'firebase/auth';

//Import the nested components
import PokeList from './PokeList';

//Import styling
import './styles/App.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.state={favourites:undefined};
    this.getAllFavourites = this.getAllFavourites.bind(this);
  }

  getAllFavourites(){
    if (!this.props.user){
      console.log("User needs to be logged in to retrieve favourites!");
    }
    else{
      firebaseFirestore.collection("users").doc(this.props.user.uid).get().then(doc => {
        if (doc.exists) {
          let ids = [];
          ids=ids.concat(doc.data().ids);
          this.setState({favourites:ids});
        } 
      })
      .catch(err => {
        console.log("Error getting document  error:", err);
      });
    }
  }

  componentWillReceiveProps() {
    this.getAllFavourites();
  }

  componentDidMount(){
    this.getAllFavourites();
  }

  render() {
    //Firebase session
    return (
      <div className="App">
        {
          this.state.favourites
          ? <PokeList favourites={this.state.favourites}/>
          : <PokeList/>
        }
      </div>
    );
  }
}

export default withFirebaseAuth({providers,firebaseAppAuth})(Home);