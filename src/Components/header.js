import React, {Component} from 'react';
import '../CSS/header.css'
import logo from '../Const/images.png';
export default class Header extends Component {
  
    render(){
      
        return (
        <div className="hold-transition skin-blue layout-top-nav"  >
       
            <header className="main-header">
        <nav className="navbar navbar-static-top" id="parent">
          <div className="container" id="header">
         
            <div className="navbar-header">
 
              <a href="../../" className="navbar-brand" id="title">
              
              <img src={logo} alt="Logo" id = "logo"/>
              
              </a>

              <a href="../../" className="navbar-brand" id="title">
              
              <b className="current">CurrentClean  Demo</b>
              </a>
             
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