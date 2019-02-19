import React, {Component} from 'react';
import '../CSS/header.css'
export default class Header extends Component {
  
    render(){
      
        return (
        <div className="hold-transition skin-blue layout-top-nav">
       
            <header className="main-header">
        <nav className="navbar navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a href="../../" className="navbar-brand" id="title"><b>Current</b>Clean Demo</a>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                <i className="fa fa-bars" />
              </button>
            </div>
            
          </div>
          {/* /.container-fluid */}
        </nav>
      </header>
      </div>
        )
    }
}