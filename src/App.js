import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Splash from './container/Splash';
import Draw from './container/Draw';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
        <Draw />
    );
  }
}

export default App;
