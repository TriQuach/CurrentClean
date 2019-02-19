import React, { Component } from 'react';
import './App.css';
import Header from './Components/header'
import SliderTableWrapper from './Components/SliderTableWrapper'
import {  Switch } from 'react-router-dom'
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
           
            <Route exact path='/' component={SliderTableWrapper} />
            <Route path='/stale/deepdive_test?beta=:beta&data=:data&start=:start&end=:end&delta=:delta' component={Stale} />
          
          </main>

        </div>

      </Router>



    );
  }
}

export default App;
