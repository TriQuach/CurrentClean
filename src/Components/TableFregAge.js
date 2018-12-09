import React, {Component} from 'react';
import '../CSS/TableFregAge.css'
export default class TableFregAge extends Component {
    render(){
        return (
            <div className="TableFregAge" id="table">
            <ul className="nav nav-tabs" style={{width: "100%"}}>
    <li className="active" ><a href="#">Frequency</a></li>
    <li><a href="#">Age</a></li>
   
  </ul>
  <table className="table table-striped" id="age">
  <tbody>
    <tr class="d-flex">
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
  </tbody>
</table>
        <h1>asdas</h1>
            </div>
        )
    }
}