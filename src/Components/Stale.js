import React, { Component } from 'react';
import LastUpDate from '../Components/LastUpDate'
import Patterns from '../Components/Patterns'
import * as constClass from '../Const/utils'
import '../CSS/Stale.css'
class Sensor {
  constructor(sensorID, temperature, humidity, airPressure, voltage) {
    this.sensorID = sensorID;
    this.temperature = temperature;
    this.humidity = humidity;
    this.airPressure = airPressure;
    this.voltage = voltage;
  }
}
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
  var arrayCells = []   
export default class Test extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      dictStale: {},
      patterns: [],
      repairs: [],
      isRepaired: false,
      status: false,
      url:''
    }
    this.parseObject = this.parseObject.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    // this.checkUserInput = this.checkUserInput.bind(this)
  }


  parseObject(data) {
    // window.console.log(data)
    var dict = {}
    for (var i = 0; i < valid_id.length; i++) {
      dict[valid_id[i]] = {}

    }
    window.console.log(data)
    for (var j = 0; j < data.length; j++) {
      var sensor_attr = data[j]["sensor_attr"].split("_")
      var sensorID = sensor_attr[0]
      var prop = sensor_attr[1]
      var value = data[j]["value"]
      var smallDict = dict[sensorID]
      smallDict[prop] = value
      dict[sensorID] = smallDict
    }
    window.console.log(dict)
    var arraySensors = []
    for (var key in dict) {
      // check if the property/key is defined in the object itself, not in parent
      if (dict.hasOwnProperty(key)) {
        var tempSensor = dict[key]
        var voltage = tempSensor['Voltage']
        var air = tempSensor['AirPressure']
        var Humidity = tempSensor['Humidity']
        var Temperature = tempSensor['Temperature']
        var temp = new Sensor(key, Temperature, Humidity, air, voltage)
        arraySensors.push(temp)

      }
    }

    this.setState({
      data: arraySensors
    })
  }
  handleClick(e) {
    if (e.target.value === "Repair") {
      this.setState({
        isRepaired: true
      })
    }
    else {
      var x = this.state.dictStale
      for (var i=0; i<arrayCells.length; i++) {
           var sensorID = arrayCells[i].split("_")[0]
           var prop = arrayCells[i].split("_")[1]
           x[sensorID][prop]["isStale"] = true
      }
      this.setState({
          dictStale: x,
          isRepaired: false
      })
    }
    

    




  }
  lastUpdate() {
    var url = constClass.DEEPDIVE_BACKEND + "lastupdate"
    window.console.log(url)
    // this.props.history.push('/freq')
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // window.console.log(result["lastupdate"])
          // this.setState({
          //     data: result["lastupdate"]
          // })
          this.parseObject(result["lastupdate"])
        },

        (error) => {
          window.console.log(error)
        }
      )
  }
  
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  createDictionary(data) {
    window.console.log("createDictionary")
    window.console.log(data)
    var dict = {};
    for (var i=0; i<valid_id.length; i++) {
      dict[valid_id[i]] = {}

    }
    
    for (var j=0; j<data.length; j++){

      var sensorID = data[j][0].split("_")[0]
      var prop = data[j][0].split("_")[1]
      var hex = data[j][1]

      var temp = dict[sensorID]
      var temp2 = {}
      temp2["hex"] = hex
      temp2["isStale"] = true
      temp[prop] = temp2
      
      dict[sensorID] = temp
    }
    window.console.log("dictStale2")
    window.console.log(dict)
    
    this.setState({
      dictStale: dict
    })
  }

  staleCells() {
    window.console.log("location.data")
    window.console.log(this.props.location.data)
    var question = this.props.match.params
    var beta = question["beta"]
    var data = question["data"]
    var start = question["start"]
    var end = question["end"]
    var delta = question["delta"]
    var url = constClass.DEEPDIVE_BACKEND + "deepdive_test?beta=" + beta + "&data=" + data + "&start=" + start + "&end=" + end + "&delta=" + delta
    window.console.log("---------------------------")
    window.console.log(url)
    // this.props.history.push('/freq')
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          window.console.log(result["task_id"])
          this.staleCellsTaskStatus(result["task_id"])
          //        this.createDictionary(result["stalecells"]) 
          //        this.lastUpdate()
          // this.patterns()
          // this.repairs()

        },

        (error) => {
          window.console.log()
          window.console.log(error)
        }
      )
  }
  stale() {
    var url = constClass.DEEPDIVE_BACKEND + "stalecells"
      window.console.log(url)
      // this.props.history.push('/freq')
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
            window.console.log()
             this.createDictionary(result["stalecells"]) 
             
        },
     
        (error) => {
          window.console.log(error)
        }
      )
  }
  staleCellsTaskStatus(id) {
    var url = constClass.DEEPDIVE_BACKEND + "taskstatus?id=" + id
    window.console.log(url)

    this.sleep(5000).then(() => {
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          window.console.log(result)
          if (result["ready"] === true) {
            this.lastUpdate()
            this.patterns()
            this.repairs()
            this.stale()

          } else {
            this.staleCellsTaskStatus(id)
          }

        },

        (error) => {
          window.console.log()
          window.console.log(error)
        }
      )
    }) 


  }
  checkUserInput = (value,sensorID,prop) => {
    var repairs = this.state.repairs
    var array = []
    for (var i=0; i<repairs.length; i++) {
        var sensor_attr = repairs[i]["sensor_attr"]
        var id = sensor_attr.split("_")[0]
        var attr = sensor_attr.split("_")[1]
        if (id === sensorID && prop === attr) {
            var repair = repairs[i]["repair"]
            var max = repair[0]["prob"]
            for (var j=0; j<repair.length; j++) {
                if (j>0 && repair[j]["prob"] !== max) {
                    break
                }
                else {
                    var value2 = repair[j]["value"]
                    array.push(value2)
                }
            }
        }
    }
   
   return array.includes(parseFloat(value))
   
}
  handleOnBlur(e,sensorID,prop) {
    window.console.log("dictStale69")
    window.console.log(e.target.textContent)
    window.console.log(sensorID)
    var temp = sensorID+ "_"+prop
    arrayCells.push(temp)
    if (this.checkUserInput(e.target.textContent,sensorID,prop)) {
        var x = this.state.dictStale
        x[sensorID][prop]["isStale"] = false
       
        
        this.setState({
            dictStale: x
        })
        
    }
    else {

        
        window.console.log("87")
        window.console.log(this.state.dictStale)
        var y = this.state.dictStale
        y[sensorID][prop]["isStale"] = true
        this.setState({
            dictStale: y
        })
    }
}

  patterns() {
    var url = constClass.DEEPDIVE_BACKEND + "patterns"
    window.console.log(url)
    // this.props.history.push('/freq')
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            patterns: result["updpatterns"]
          })

        },

        (error) => {
          window.console.log(error)
        }
      )
  }
  repairs() {
    var url = constClass.DEEPDIVE_BACKEND + "repairs"

    window.console.log("repairs:")
    window.console.log(url)
    
    // this.props.history.push('/freq')
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            repairs: result["repairs"]
          })

        },

        (error) => {
          window.console.log(error)
        }
      )
  }
  componentDidMount() {

    window.console.log("this.props.params")
    window.console.log(this.props.match.params)

    this.staleCells()

  }


  render() {
    return (
      <div>
      {Object.keys(this.state.dictStale).length !== 0 ? <div className="rowStale">
        
      <LastUpDate status={this.state.status} isRepaired={this.state.isRepaired} data={this.state.data} dictStale={this.state.dictStale} repairs={this.state.repairs} onBlur={this.handleOnBlur}  onClick={this.handleClick} />
      <Patterns patterns={this.state.patterns} isRepaired={this.state.isRepaired} />


    </div>: null}
    </div>
      
    )

  }

}