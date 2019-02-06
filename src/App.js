import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import SliderTableWrapper from './Components/SliderTableWrapper'
import Test from './Components/test'
import Stale from './Components/Stale'
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom';

class App extends Component {
  render() {
    return (

      <Router>
        <div>
          <Header />
          <main>
            <Redirect from="/" to="home" />
            <Route path='/home' component={SliderTableWrapper} />
            <Route path='/stale' component={Stale} />
          </main>

        </div>

      </Router>



    );
  }
}

export default App;
