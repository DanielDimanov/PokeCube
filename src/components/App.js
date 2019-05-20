import React, { Component } from 'react';

//Import the nested components
import PokeList from './PokeList';

//Import styling
import './styles/App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <PokeList />
      </div>
    );
  }
}

export default App;