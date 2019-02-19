import React, { Component } from 'react';
import '../CSS/TableFregAge.css'
import * as constClass from '../Const/utils.js'
import Popup from "reactjs-popup";
import $ from 'jquery';
import { Chart } from "react-charts";
import CanvasJSReact from '../Chart/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var arrayCells = []
export default class TableFregAge extends Component {


  constructor(props) {
    super(props)

    this.state = {
      showPopUp: false,
      data: [],
      dataCanvas: [],
      dataLineChart: [],
      typechart: ''

    }
    this.handleClick = this.handleClick.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.keydownHandler = this.keydownHandler.bind(this)
  }
  createLineChartData(response) {
    window.console.log(response[0])
    var array = []
    for (var i = 0; i < arrayCells.length; i++) {
      var temp = {}
      var key = Object.keys(arrayCells[i])[0]
      temp.type = "line"
      temp.name = key + "_" + arrayCells[i][key]
      temp.showInLegend = true
      temp.toolTipContent = "Time {x}: {y}"
      temp.dataPoints = response[i]
      array.push(temp)
    }
    this.setState({
      dataLineChart: array
    })




  }
  resetSelectedCells() {
    var temp = this.state.data
    for (var i = 0; i < arrayCells.length; i++) {
      var row = arrayCells[i]["row"]
      var col = arrayCells[i]["col"]
      temp[row][col]["isSelected"] = false

    }
    arrayCells = []
    this.setState({
      data: temp
    })
  }
  keydownHandler(e) {
    if (e.keyCode === 13 && e.metaKey) {
      window.console.log(constClass.LOCAL_BACKEND + "comparecells")

      fetch(constClass.LOCAL_BACKEND + 'comparecells', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(
          {
            "start": this.props.start,
            "end": this.props.end,
            "arrayCells": arrayCells
          }),

        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => {

          this.createLineChartData(response)
          this.setState({

            showPopUp: true,
            typechart: constClass.AGELINECHART

           
          })
          
        })
        .catch(error => console.error('Error:', error));

    }
    else if (e.keyCode === 27 && e.metaKey) {
      this.resetSelectedCells()
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keydownHandler);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      //Perform some operation
      arrayCells = []
      window.console.log("90")
      window.console.log(nextProps.data)
      this.setState({ data: nextProps.data });

    }
  }

  convertToArrayObject(data) {
    var array = []
    for (var i = 0; i < data.length; i++) {
      var y = data[i][1]
      var label = data[i][0]
      var object = { label: label, y }
      array.push(object)
    }
    window.console.log('array')
    window.console.log(array)
    this.setState({
      dataCanvas: array
    })
  }

  handleClick(event, sensorID, prop, row, col,checkInTheSameCol) {
    // event.stopPropagation();
    if (this.props.typeRequest === constClass.FREQUENCY) {
      
     
        this.resetSelectedCells()
        var url = constClass.LOCAL_BACKEND + "duration?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop
        window.console.log(url)
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              window.console.log('*********')
              window.console.log(result)
              this.convertToArrayObject(result)
              this.setState({
                showPopUp: true,
                typechart: constClass.FREQBARCHART
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
    else if (this.props.typeRequest === constClass.AGE) {
      if (event.metaKey && checkInTheSameCol === true) {
        var temp = this.state.data
        temp[row][col]["isSelected"] = !temp[row][col]["isSelected"]
        if (temp[row][col]["isSelected"] === true) {
          var cell = {}
          cell[sensorID] = prop
          cell["row"] = row
          cell["col"] = col
          arrayCells.push(cell)
        } else {
          for (var i = 0; i < arrayCells.length; i++) {
            var key = Object.keys(arrayCells[i])[0]
            if (key === sensorID && arrayCells[i][key] === prop) {
              arrayCells.splice(i, 1);
            }
          }
        }
  
        this.setState({
          data: temp
        })
      } else if (event.metaKey === false) {
        var url2 = constClass.LOCAL_BACKEND + "existedtime?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop
        window.console.log(url2)
        fetch(url2)
          .then(res => res.json())
          .then(
            (result) => {
              window.console.log('*********')
              window.console.log(result)
              this.convertToArrayObject(result)
              this.setState({
                showPopUp: true,
                typechart: constClass.AGEBARCHART
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
      
    }
    
  }
  closePopUp() {
    this.setState({
      showPopUp: false


    })
  }
  addSymbols(e) {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if (order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
  checkInTheSameCol(colCheck) {
    if (arrayCells.length > 0) {
      window.console.log(arrayCells[0])
      var col = arrayCells[0]["col"]
      window.console.log(col)
      window.console.log(colCheck)

      if (colCheck === col) {
        return true
      }
      else {
        return false
      }

    }
    return true
  }
  render() {
    var x = this.checkInTheSameCol(1)
    window.console.log("checkInTheSameCol")
    window.console.log(x)

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

    window.console.log(this.state.dataLineChart)
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

    const optionsLineChartAge = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Values overtime"
      },
      axisY: {
        title: "Values",
        includeZero: false,

      },

      data: this.state.dataLineChart
      ,

    }
    const optionsColumnFreq = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Top 10 frequent values"
      },
      axisX: {
        title: "Values",
        reversed: true,
      },
      axisY: {
        title: "Frequency",
        labelFormatter: this.addSymbols
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          dataPoints: this.state.dataCanvas
        }
      ]
    }
    const optionsColumnAge = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Accumulating time of values"
      },
      axisX: {
        title: "Values",
        reversed: true,
      },
      axisY: {
        title: "Time (seconds)",
        labelFormatter: this.addSymbols
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          dataPoints: this.state.dataCanvas
        }
      ]
    }

    var typeRequest = this.props.typeRequest
    var data = this.props.data
    return (

      <div className="TableFregAge" id="table">
        <ul className="nav nav-tabs" style={{ width: "100%" }}>
          <li className={this.props.typeRequest === constClass.AGE ? "active" : ""}><a href="#" id={constClass.AGE} onClick={this.props.onClick}>Age</a></li>

          <li className={this.props.typeRequest === constClass.FREQUENCY ? "active" : ""} ><a href="#" onClick={this.props.onClick} id={constClass.FREQUENCY}>Frequency</a></li>

        </ul>
        <table className="table table-striped" id="freq">
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
          
            <tbody>{this.state.data.map(function (item, key) {

              return (


                <tr key={key} >
                  <td>{key + 1}</td>
                  <td>{valid_id[key]}</td>

                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'temperature', key, 0,this.checkInTheSameCol(0)) } style={{ cursor: 'pointer', background: item[0]["isSelected"] === false ? item[0]["hex"] : "#f44141" }}  >{item[0]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'humidity', key, 1,this.checkInTheSameCol(1)) } style={{ cursor: 'pointer', background: item[1]["isSelected"] === false ? item[1]["hex"] : "#f44141" }} >{item[1]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'airPressure', key, 2,this.checkInTheSameCol(2)) } style={{ cursor: 'pointer', background: item[2]["isSelected"] === false ? item[2]["hex"] : "#f44141" }} >{item[2]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'voltage', key, 3,this.checkInTheSameCol(3)) } style={{ cursor: 'pointer', background: item[3]["isSelected"] === false ? item[3]["hex"] : "#f44141" }} >{item[3]["value"]}</td>
                </tr>

              )

            }.bind(this))}</tbody>
          

        </table>






        <Popup style={{ height: 1000, width: 1000 }} onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
          <div className="table-wrapper-scroll-chart">
            {this.state.typechart === constClass.AGELINECHART ?
              <CanvasJSChart options={optionsLineChartAge} /> : (this.state.typechart === constClass.AGEBARCHART ? 
                <CanvasJSChart options={optionsColumnAge} />: <CanvasJSChart options={optionsColumnFreq} />)}




          </div>
        </Popup>









      </div>
    )
  }
}