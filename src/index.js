// Import React and React DOM
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//Create main component
const App = () => {
    return <div> Welcome to PokeCube </div>;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

ReactDOM.render(<App/>, document.querySelector('#root'));
serviceWorker.unregister();
