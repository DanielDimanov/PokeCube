import React, { Component } from 'react';
import DetailView from './DetailView';

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