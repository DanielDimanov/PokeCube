import React, { Component } from 'react';
import DetailView from './Compare/DetailView';
import PokeList from './PokeList';

class Compare extends Component {

  render() {
    return (
        <div className="App">  
            <DetailView/>
            <DetailView/>
        </div>
    );
  }
}


export default Compare;