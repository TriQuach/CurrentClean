import React, { Component } from 'react';
import '../CSS/TableFregAge.css'
import * as constClass from '../Const/utils.js'
import Popup from "reactjs-popup";
import $ from 'jquery';
export default class TableFregAge extends Component {
  componentDidMount() {
    var $table = $('table.scroll'),
      $bodyCells = $table.find('tbody tr:first').children(),
      colWidth;

    // Adjust the width of thead cells when window resizes
    $(window).resize(function () {
      // Get the tbody columns width array
      colWidth = $bodyCells.map(function () {
        return $(this).width();
      }).get();

      // Set the width of thead columns
      $table.find('thead tr').children().each(function (i, v) {
        $(v).width(colWidth[i]);
      });
    }).resize(); // Trigger resize handler
  }
  constructor(props) {
    super(props)

    this.state = {
      showPopUp: false,
      data: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.closePopUp = this.closePopUp.bind(this)

  }


  handleClick(sensorID, prop) {
    var url = "http://127.0.0.1:5000/duration?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop
    window.console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          window.console.log(result)
          this.setState({
            data: result,
            showPopUp: true
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          window.console.log(error)
        }
      )
  }
  closePopUp() {
    this.setState({
      showPopUp: false


    })
  }
  render() {
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


    var typeRequest = this.props.typeRequest
    var data = this.props.data
    return (

      <div className="TableFregAge" id="table">
        <ul className="nav nav-tabs" style={{ width: "100%" }}>
          <li className={this.props.typeRequest === constClass.FREQUENCY ? "active" : ""} ><a href="#" onClick={this.props.onClick} id={constClass.FREQUENCY}>Frequency</a></li>
          <li className={this.props.typeRequest === constClass.AGE ? "active" : ""}><a href="#" id={constClass.AGE} onClick={this.props.onClick}>Age</a></li>

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
          <tbody>{this.props.data.map(function (item, key) {

            return (

              <tr key={key} >
                <td>{key + 1}</td>
                <td>{valid_id[key]}</td>

                <td onClick={() => this.handleClick(valid_id[key], 'temperature')} style={{ cursor: 'pointer', background:item[0]["hex"] }}>{item[0]["value"]}</td>
                <td onClick={() => this.handleClick(valid_id[key], 'humidity')} style={{ cursor: 'pointer', background:item[1]["hex"]}} >{item[1]["value"]}</td>
                <td onClick={() => this.handleClick(valid_id[key], 'airPressure')} style={{ cursor: 'pointer', background:item[2]["hex"] }} >{item[2]["value"]}</td>
                <td onClick={() => this.handleClick(valid_id[key], 'voltage')} style={{ cursor: 'pointer', background:item[3]["hex"] }} >{item[3]["value"]}</td>
              </tr>
            )

          }.bind(this))}</tbody>
        </table>

        <Popup onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
          <div className="table-wrapper-scroll-y">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Value</th>
                <th scope="col">Duration</th>

              </tr>
            </thead>
            <tbody>{this.state.data.map(function (item, key) {

              return (

                <tr key={key} >
                  <td>{key + 1}</td>


                  <td >{item[0]}</td>
                  <td >{item[1]}</td>
                </tr>
              )

            })}</tbody>
          </table>
          </div>
        </Popup>





      </div>
    )
  }
}