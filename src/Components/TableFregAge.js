import React, {Component} from 'react';
import '../CSS/TableFregAge.css'
import * as constClass from '../Const/utils.js'
export default class TableFregAge extends Component {
    render(){
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
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>  
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
       
            </div>
        )
    }
}