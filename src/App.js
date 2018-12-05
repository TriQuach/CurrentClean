import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import SliderTableWrapper from './Components/SliderTableWrapper'
class App extends Component {
  render() {
    return (
      
      <div>
        <Header />
        <SliderTableWrapper />
      </div>
    );
  }
}

export default App;
