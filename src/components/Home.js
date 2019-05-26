import React, { Component } from 'react';

//Import Firebase
import {providers,firebaseAppAuth} from './Firebase';
import { firebaseFirestore} from './Firebase';
import withFirebaseAuth from 'react-with-firebase-auth';
// import 'firebase/auth';

//Import the nested components
import PokeList from './PokeList';

//Import styling
import './styles/App.css';

class Home extends Component {

  constructor(props){
    super(props);
    this.state={favourites:undefined,readyForUpdate:false};
  }

  getAllFavourites= () => {
    if (this.props.user){
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
    else{
      this.setState({favourites:undefined});
    }
  }

  //Included because of a current Firebase issue, that can be solved by this 
  //shady code pattern
  componentDidUpdate(){
    if(this.state.readyForUpdate){
      this.setState({readyForUpdate:false},this.getAllFavourites());
    }
  }

  componentWillReceiveProps() {
    this.getAllFavourites();
    this.setState({readyForUpdate:true});
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