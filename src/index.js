// Import React and React DOM
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Navigation from './components/Navigation';

ReactDOM.render(<Navigation />, document.getElementById('nav'));
// ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();


