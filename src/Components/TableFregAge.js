import React, { Component } from 'react';
import '../CSS/TableFregAge.css'
import * as constClass from '../Const/utils.js'
import Popup from "reactjs-popup";
import $ from 'jquery';
import { Chart } from "react-charts";
import CanvasJSReact from '../Chart/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
          window.console.log('*********')
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
  addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
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

      const lineChart = (
        // A react-chart hyper-responsively and continuusly fills the available
        // space of its parent element automatically
        <div
          style={{
            width: "400px",
            height: "300px"
          }}
        >
          <Chart
            data={[
              {
                label: "Series 1",
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
              },
              {
                label: "Series 2",
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
              }
            ]}
            axes={[
              { primary: true, type: "linear", position: "bottom" },
              { type: "linear", position: "left" }
            ]}
          />
        </div>
      );
      const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Most Popular Social Networking Sites"
        },
        axisX: {
          title: "Social Network",
          reversed: true,
        },
        axisY: {
          title: "Monthly Active Users",
          labelFormatter: this.addSymbols
        },
        data: [{
          type: "bar",
          dataPoints: [
            { y:  2200000000, label: "Facebook" },
            { y:  1800000000, label: "YouTube" },
            { y:  800000000, label: "Instagram" },
            { y:  563000000, label: "Qzone" },
            { y:  376000000, label: "Weibo" },
            { y:  336000000, label: "Twitter" },
            { y:  330000000, label: "Reddit" }
          ]
        }]
      }
      const optionsLineChart = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", // "light1", "dark1", "dark2"
        title:{
          text: "Bounce Rate by Week of Year"
        },
        axisY: {
          title: "Bounce Rate",
          includeZero: false,
          suffix: "%"
        },
        axisX: {
          title: "Week of Year",
          prefix: "W",
          interval: 2
        },
        data: [{
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 }
          ]
        }]
      }

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

        {/* <Popup onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
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
        </Popup> */}





        <Popup onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
        <div className="table-wrapper-scroll-chart">
			<CanvasJSChart options = {options}
			/>
      <CanvasJSChart options = {optionsLineChart}
			/>
      
		</div>
        </Popup>
        

      





      </div>
    )
  }
}