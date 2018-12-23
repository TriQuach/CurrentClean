import React, {Component} from 'react';
import '../CSS/TableFregAge.css'
import * as constClass from '../Const/utils.js'
import Popup from "reactjs-popup";

export default class TableFregAge extends Component {
  constructor(props) {
    super(props)
   
    this.state = {
      showPopUp:false
    }
    this.handleClick = this.handleClick.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    
}

    
    handleClick(e) {
      window.console.log(this.state.showPopUp)
      this.setState({
        showPopUp: true

      })
    }
    closePopUp() {
      this.setState({
        showPopUp: false


      })
    }
    render(){
      var valid_id = ['A434F11F1B05', 'A434F11EEE06', 'A434F11F1684', 'A434F11F1E86', 'A434F11EF48B', 'A434F11F2003',
      'A434F11EEF0E', 'A434F11EA281', 'A434F11F1D06', 'A434F11F1000', 'A434F11F1606', 'A434F11FF78E',
      'A434F11F3681', 'A434F11F0C80', 'A434F11F1B88', 'A434F11EF609', 'A434F11FFE0D', 'A434F11F1B8A',
      'A434F1201380', 'A434F11F1B07', 'A434F11F0E06', 'A434F11F2F84', 'A434F11F1001', 'A434F11A3408',
      'A434F1204007', 'A434F11EA080', 'A434F1201282', 'A434F11EF80D', 'A434F11F1404', 'A434F11F1486',
      'A434F11F1683', 'A434F11F1A0A', 'A434F11F1783', 'A434F11F118D', 'A434F11EEB80', 'A434F11F0E83',
      'A434F11F1083', 'A434F11F1B84', 'A434F11F1D04', 'A434F11F1482', 'A434F11F1187', 'A434F11F1C85',
      'A434F1204005', 'A434F11F1F03', 'A434F11F3902', 'A434F11EF68F', 'A434F11F1106', 'A434F11F1782',
      'A434F11F1607', 'A434F11F4287', 'A434F11F1F02', 'A434F11F1406', 'A434F11F0E85', 'A434F11EEF8C',
      'A434F11F1E09', 'A434F11F0E03', 'A434F11F1483', 'A434F11F1F85']
      
      
      
      
      var typeRequest= this.props.typeRequest 
      var data = this.props.data
        return (
            <div className="TableFregAge" id="table">
            <ul className="nav nav-tabs" style={{width: "100%"}}>
    <li className={this.props.typeRequest === constClass.FREQUENCY ? "active":""} ><a href="#" onClick={this.props.onClick} id={constClass.FREQUENCY}>Frequency</a></li>
    <li className={this.props.typeRequest === constClass.AGE ? "active":""}><a href="#" id={constClass.AGE} onClick={this.props.onClick}>Age</a></li>
   
  </ul>
  <table className="table table-striped" id="age">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">SensorID</th>
      <th scope="col">Temperature</th>
      <th scope="col">Humidity</th>
      <th scope="col">AirPressure</th>
      <th scope="col">Voltage</th>
    </tr>
  </thead>
  <tbody>{this.props.data.map(function(item, key) {
   
             return (
              
                <tr key = {key} >
                    <td>{key + 1}</td>
                    <td>{valid_id[key]}</td>
                    
                    <td onClick={() => this.handleClick(item[0])} style={{cursor: 'pointer'}} className={item[0] === Math.max.apply(null,item)? "success" :  item[0] === Math.min.apply(null,item) ? "danger": "" }>{item[0]}</td>
                    <td onClick={() => this.handleClick(item[1])} style={{cursor: 'pointer'}} className={item[1] === Math.max.apply(null,item)? "success" :  item[1] === Math.min.apply(null,item) ? "danger": ""}>{item[1]}</td>
                    <td onClick={() => this.handleClick(item[2])} style={{cursor: 'pointer'}} className={item[2] === Math.max.apply(null,item)? "success" :  item[2] === Math.min.apply(null,item) ? "danger": ""}>{item[2]}</td>
                    <td onClick={() => this.handleClick(item[3])} style={{cursor: 'pointer'}} className={item[3] === Math.max.apply(null,item)? "success" :  item[3] === Math.min.apply(null,item) ? "danger": ""}>{item[3]}</td>
                </tr>
             )
           
           }.bind(this))}</tbody>
</table>
          
            <Popup onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
            <table className="table table-striped fixed_header" >
  <thead >
    <tr >
      <th scope="col">#</th>
      <th scope="col">SensorID</th>
      <th scope="col">Temperature</th>
      <th scope="col">Humidity</th>
      <th scope="col">AirPressure</th>
      <th scope="col">Voltage</th>
    </tr>
  </thead>
  <tbody>{this.props.data.map(function(item, key) {
   
             return (
              
                <tr key = {key} >
                    <td>{key + 1}</td>
                    <td>{valid_id[key]}</td>
                    
                    <td onClick={() => this.handleClick(item[0])} style={{cursor: 'pointer'}} className={item[0] === Math.max.apply(null,item)? "success" :  item[0] === Math.min.apply(null,item) ? "danger": "" }>{item[0]}</td>
                    <td onClick={() => this.handleClick(item[1])} style={{cursor: 'pointer'}} className={item[1] === Math.max.apply(null,item)? "success" :  item[1] === Math.min.apply(null,item) ? "danger": ""}>{item[1]}</td>
                    <td onClick={() => this.handleClick(item[2])} style={{cursor: 'pointer'}} className={item[2] === Math.max.apply(null,item)? "success" :  item[2] === Math.min.apply(null,item) ? "danger": ""}>{item[2]}</td>
                    <td onClick={() => this.handleClick(item[3])} style={{cursor: 'pointer'}} className={item[3] === Math.max.apply(null,item)? "success" :  item[3] === Math.min.apply(null,item) ? "danger": ""}>{item[3]}</td>
                </tr>
             )
           
           }.bind(this))}</tbody>
</table>
  </Popup>
          
         
                   


            </div>
        )
    }
}