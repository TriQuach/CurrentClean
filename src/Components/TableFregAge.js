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
    if (this.props.typeRadio === constClass.SENSOR) {
      if (e.keyCode === 13 && e.metaKey) {
        window.console.log(constClass.LOCAL_BACKEND + "comparecells")
  
        fetch(constClass.LOCAL_BACKEND + 'comparecells?dataset=' + constClass.SENSOR , {
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
    else if (this.props.typeRadio === constClass.CLINICAL) {
      if (e.keyCode === 13 && e.metaKey) {
        window.console.log(constClass.LOCAL_BACKEND + "comparecells")
  
        fetch(constClass.LOCAL_BACKEND + 'comparecells?dataset=' + constClass.CLINICAL , {
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
    if (this.props.typeRadio === constClass.SENSOR) {
      if (this.props.typeRequest === constClass.FREQUENCY) {
      
     
        this.resetSelectedCells()
        var url = constClass.LOCAL_BACKEND + "duration?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop + "&dataset=" + constClass.SENSOR
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
      if (event.metaKey) { //if (event.metaKey && checkInTheSameCol === true)
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
        var url2 = constClass.LOCAL_BACKEND + "existedtime?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop + "&dataset=" + constClass.SENSOR
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
    else if (this.props.typeRadio === constClass.CLINICAL) {
      if (this.props.typeRequest === constClass.FREQUENCY) {
      
     
        this.resetSelectedCells()
        var url = constClass.LOCAL_BACKEND + "duration?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop + "&dataset=" + constClass.CLINICAL
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
      if (event.metaKey ) {
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
        var url2 = constClass.LOCAL_BACKEND + "existedtime?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop + "&dataset=" + constClass.CLINICAL
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
    
    var valid_id_Mimic = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
      '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30',
      '31','32','33','34','35','36','37','38','39','40','41','42','43','44','45',
      '46','47','48','49','50']

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
        text: "Comparative Evaluation"
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
        text: "Accumulative time duration"
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
        {this.props.typeRadio === constClass.SENSOR ? (this.props.data.length === 58 ?  <table className="table table-striped" id="freq">
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

                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'temperature', key, 0,this.checkInTheSameCol(0)) } style={{ cursor: 'pointer', background: item[0]["isSelected"] === false ? item[0]["hex"] : "#38ff5f" }}  >{item[0]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'humidity', key, 1,this.checkInTheSameCol(1)) } style={{ cursor: 'pointer', background: item[1]["isSelected"] === false ? item[1]["hex"] : "#38ff5f" }} >{item[1]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'airPressure', key, 2,this.checkInTheSameCol(2)) } style={{ cursor: 'pointer', background: item[2]["isSelected"] === false ? item[2]["hex"] : "#38ff5f" }} >{item[2]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id[key], 'voltage', key, 3,this.checkInTheSameCol(3)) } style={{ cursor: 'pointer', background: item[3]["isSelected"] === false ? item[3]["hex"] : "#38ff5f" }} >{item[3]["value"]}</td>
                </tr>

              )

            }.bind(this))}</tbody>
          

        </table> : null)
        : (this.props.data.length === 50 ? <table className="table table-striped" id="freq">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">WT</th>
              <th scope="col">LDL</th>
              <th scope="col">HDL</th>
              <th scope="col">HR</th>
              <th scope="col">DBP</th>
              <th scope="col">SBP</th>
              <th scope="col">CVP</th>
              <th scope="col">RR</th>
              <th scope="col">SpO2</th>
              <th scope="col">TMP</th>
              <th scope="col">ABE</th>
              <th scope="col">ACO2</th>
              <th scope="col">APH</th>
              <th scope="col">Hb</th>
              <th scope="col">RBC</th>
              <th scope="col">RBCF</th>
              <th scope="col">WBC</th>
              <th scope="col">MONO</th>
              <th scope="col">EOS</th>
              <th scope="col">LY</th>
              <th scope="col">RDW</th>
              <th scope="col">TC</th>
            </tr>
          </thead>
          
            <tbody>{this.state.data.map(function (item, key) {

              return (


                <tr key={key} >
            
                  <td>{valid_id_Mimic[key]}</td>

                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'WT', key, 0,this.checkInTheSameCol(0)) } style={{ cursor: 'pointer', background: item[0]["isSelected"] === false ? item[0]["hex"] : "#38ff5f" }}  >{item[0]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'LDL', key, 1,this.checkInTheSameCol(1)) } style={{ cursor: 'pointer', background: item[1]["isSelected"] === false ? item[1]["hex"] : "#38ff5f" }} >{item[1]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'HDL', key, 2,this.checkInTheSameCol(2)) } style={{ cursor: 'pointer', background: item[2]["isSelected"] === false ? item[2]["hex"] : "#38ff5f" }} >{item[2]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'HR', key, 3,this.checkInTheSameCol(3)) } style={{ cursor: 'pointer', background: item[3]["isSelected"] === false ? item[3]["hex"] : "#38ff5f" }} >{item[3]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'DBP', key, 4,this.checkInTheSameCol(4)) } style={{ cursor: 'pointer', background: item[4]["isSelected"] === false ? item[4]["hex"] : "#38ff5f" }}  >{item[4]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'SBP', key, 5,this.checkInTheSameCol(5)) } style={{ cursor: 'pointer', background: item[5]["isSelected"] === false ? item[5]["hex"] : "#38ff5f" }} >{item[5]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'CVP', key, 6,this.checkInTheSameCol(6)) } style={{ cursor: 'pointer', background: item[6]["isSelected"] === false ? item[6]["hex"] : "#38ff5f" }} >{item[6]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'RR', key, 7,this.checkInTheSameCol(7)) } style={{ cursor: 'pointer', background: item[7]["isSelected"] === false ? item[7]["hex"] : "#38ff5f" }} >{item[7]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'SpO2', key, 8,this.checkInTheSameCol(8)) } style={{ cursor: 'pointer', background: item[8]["isSelected"] === false ? item[8]["hex"] : "#38ff5f" }}  >{item[8]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'TMP', key, 9,this.checkInTheSameCol(9)) } style={{ cursor: 'pointer', background: item[9]["isSelected"] === false ? item[9]["hex"] : "#38ff5f" }} >{item[9]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'ABE', key, 10,this.checkInTheSameCol(10)) } style={{ cursor: 'pointer', background: item[10]["isSelected"] === false ? item[10]["hex"] : "#38ff5f" }} >{item[10]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'ACO2', key, 11,this.checkInTheSameCol(11)) } style={{ cursor: 'pointer', background: item[11]["isSelected"] === false ? item[11]["hex"] : "#38ff5f" }} >{item[11]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'APH', key, 12,this.checkInTheSameCol(12)) } style={{ cursor: 'pointer', background: item[12]["isSelected"] === false ? item[12]["hex"] : "#38ff5f" }}  >{item[12]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'Hb', key, 13,this.checkInTheSameCol(13)) } style={{ cursor: 'pointer', background: item[13]["isSelected"] === false ? item[13]["hex"] : "#38ff5f" }} >{item[13]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'RBC', key, 14,this.checkInTheSameCol(14)) } style={{ cursor: 'pointer', background: item[14]["isSelected"] === false ? item[14]["hex"] : "#38ff5f" }} >{item[14]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'RBCF', key, 15,this.checkInTheSameCol(15)) } style={{ cursor: 'pointer', background: item[15]["isSelected"] === false ? item[15]["hex"] : "#38ff5f" }} >{item[15]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'WBC', key, 16,this.checkInTheSameCol(16)) } style={{ cursor: 'pointer', background: item[16]["isSelected"] === false ? item[16]["hex"] : "#38ff5f" }}  >{item[16]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'MONO', key, 17,this.checkInTheSameCol(17)) } style={{ cursor: 'pointer', background: item[17]["isSelected"] === false ? item[17]["hex"] : "#38ff5f" }} >{item[17]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'EOS', key, 18,this.checkInTheSameCol(18)) } style={{ cursor: 'pointer', background: item[18]["isSelected"] === false ? item[18]["hex"] : "#38ff5f" }} >{item[18]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'LY', key, 19,this.checkInTheSameCol(19)) } style={{ cursor: 'pointer', background: item[19]["isSelected"] === false ? item[19]["hex"] : "#38ff5f" }} >{item[19]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'RDW', key, 20,this.checkInTheSameCol(20)) } style={{ cursor: 'pointer', background: item[20]["isSelected"] === false ? item[20]["hex"] : "#38ff5f" }}  >{item[20]["value"]}</td>
                  <td onClick={(e) =>  this.handleClick(e, valid_id_Mimic[key], 'TC', key, 21,this.checkInTheSameCol(21)) } style={{ cursor: 'pointer', background: item[21]["isSelected"] === false ? item[21]["hex"] : "#38ff5f" }} >{item[21]["value"]}</td>
                
                </tr>

              )

            }.bind(this))}</tbody>
          

        </table>: null) }
        






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