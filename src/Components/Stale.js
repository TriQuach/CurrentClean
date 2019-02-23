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
class Patient  {
  constructor(id_patient, WT, LDL, HDL, HR, DBP, SBP, CVP, RR, SpO2, TMP, ABE, ACO2, APH, Hb, RBC, RBCF, WBC, MONO, EOS, LY, RDW, TC) {
    this.id_patient = id_patient
    this.WT = WT
    this.LDL = LDL
    this.HDL = HDL
    this.HR = HR
    this.DBP = DBP
    this.SBP = SBP
    this.CVP = CVP
    this.RR = RR
    this.SpO2 = SpO2
    this.TMP = TMP
    this.ABE = ABE
    this.ACO2 = ACO2
    this.APH = APH
    this.Hb = Hb
    this.RBC = RBC
    this.RBCF = RBCF
    this.WBC = WBC
    this.MONO = MONO
    this.EOS = EOS
    this.LY = LY
    this.RDW = RDW
    this.TC = TC
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
var valid_id_Mimic = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                  '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30',
                  '31','32','33','34','35','36','37','38','39','40','41','42','43','44','45',
                  '46','47','48','49','50']
var arrayCells = []
var kindDataset = ''
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
      url: ''
    }
    this.parseObject = this.parseObject.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    // this.checkUserInput = this.checkUserInput.bind(this)
  }


  parseObject(data) {
    if (kindDataset === constClass.SENSOR) {
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
    else if (kindDataset === constClass.CLINICAL) {
      var dict = {}
      for (var i = 0; i < valid_id_Mimic.length; i++) {
        dict[valid_id_Mimic[i]] = {}

      }
      window.console.log(data)
      for (var j = 0; j < data.length; j++) {
        var sensor_attr = data[j]["sensor_attr"].split("_")
        var patientID = sensor_attr[0]
        var prop = sensor_attr[1]
        var value = data[j]["value"]
        var smallDict = dict[patientID]
        smallDict[prop] = value
        dict[patientID] = smallDict
      }
      window.console.log(dict)
      var arrayPatients = []
      for (var key in dict) {
        // check if the property/key is defined in the object itself, not in parent
        if (dict.hasOwnProperty(key)) {
          var tempPatient = dict[key]
          var WT = tempPatient['WT']
          var LDL = tempPatient['LDL']
          var HDL = tempPatient['HDL']
          var HR = tempPatient['HR']
          var DBP = tempPatient['DBP']
          var SBP = tempPatient['SBP']
          var CVP = tempPatient['CVP']
          var RR = tempPatient['RR']
          var SpO2 = tempPatient['SpO2']
          var TMP = tempPatient['TMP']
          var ABE = tempPatient['ABE']
          var ACO2 = tempPatient['ACO2']
          var APH = tempPatient['APH']
          var Hb = tempPatient['Hb']
          var RBC = tempPatient['RBC']
          var RBCF = tempPatient['RBCF']
          var WBC = tempPatient['WBC']
          var MONO = tempPatient['MONO']
          var EOS = tempPatient['EOS']
          var LY = tempPatient['LY']
          var RDW = tempPatient['RDW']
          var TC = tempPatient['TC']
          var temp = new Patient(key, WT, LDL, HDL, HR,DBP,SBP,CVP,RR,SpO2,TMP,ABE,ACO2,APH,Hb,RBC,RBCF,WBC,MONO,EOS,LY,RDW,TC)
          arrayPatients.push(temp)

        }
      }

      window.console.log("arrayPatients:")
      window.console.log(arrayPatients)
      
      window.console.log("arrayPatients:")
      this.setState({
        data: arrayPatients
      })
    }

  }
  handleClick(e) {
    if (e.target.value === "Repair") {
      this.setState({
        isRepaired: true
      })
    }
    else {
      var x = this.state.dictStale
      for (var i = 0; i < arrayCells.length; i++) {
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
    if (kindDataset === constClass.SENSOR) {
      window.console.log("createDictionary")
      window.console.log(data)
      var dict = {};
      for (var i = 0; i < valid_id.length; i++) {
        dict[valid_id[i]] = {}
  
      }
  
      for (var j = 0; j < data.length; j++) {
  
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
    else if (kindDataset === constClass.CLINICAL) {
      var dict = {};
      for (var i = 0; i < valid_id_Mimic.length; i++) {
        dict[valid_id_Mimic[i]] = {}
  
      }
  
      for (var j = 0; j < data.length; j++) {
  
        var patientID = data[j][0].split("_")[0]
        var prop = data[j][0].split("_")[1]
        var hex = data[j][1]
  
        var temp = dict[patientID]
        var temp2 = {}
        temp2["hex"] = hex
        temp2["isStale"] = true
        temp[prop] = temp2
  
        dict[patientID] = temp
      }
      window.console.log("dictStaleClinical")
      window.console.log(dict)
      window.console.log("dictStaleClinical")
      this.setState({
        dictStale: dict
      })
    }
    
  }

  staleCells() {
    window.console.log("location.data")
    window.console.log(this.props.location.data)
    var question = this.props.match.params
    var beta = question["beta"]
    var data = question["data"]
    kindDataset = data
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
  checkUserInput = (value, sensorID, prop) => {
    var repairs = this.state.repairs
    var array = []
    for (var i = 0; i < repairs.length; i++) {
      var sensor_attr = repairs[i]["sensor_attr"]
      var id = sensor_attr.split("_")[0]
      var attr = sensor_attr.split("_")[1]
      if (id === sensorID && prop === attr) {
        var repair = repairs[i]["repair"]
        var max = repair[0]["prob"]
        for (var j = 0; j < repair.length; j++) {
          if (j > 0 && repair[j]["prob"] !== max) {
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
  handleOnBlur(e, sensorID, prop) {
    window.console.log("dictStale69")
    window.console.log(e.target.textContent)
    window.console.log(sensorID)
    var temp = sensorID + "_" + prop
    arrayCells.push(temp)
    if (this.checkUserInput(e.target.textContent, sensorID, prop)) {
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
      <div className={kindDataset === constClass.SENSOR ? "rowStale": "rowStaleMimic"}>
        {Object.keys(this.state.dictStale).length !== 0 ?

          <LastUpDate
            kindDataset = {kindDataset}
            status={this.state.status}
            isRepaired={this.state.isRepaired}
            data={this.state.data}
            dictStale={this.state.dictStale}
            repairs={this.state.repairs}
            onBlur={this.handleOnBlur}
            onClick={this.handleClick} /> : null}
        {Object.keys(this.state.patterns).length !== 0 ? <Patterns patterns={this.state.patterns} isRepaired={this.state.isRepaired} kindDataset={kindDataset}/> : null}



      </div>


    )

  }

}