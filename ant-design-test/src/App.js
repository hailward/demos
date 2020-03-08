import React, { Component } from 'react';
import AppRouter from './router/router';
import './App.css';

class App extends Component {
  render() {
    return (
      <AppRouter id="app" />
    );
  }
}

export default App;
