import React, { Component } from 'react';
import * as constClass from '../Const/utils'
import '../CSS/LastUpdate.css'
import Popup from "reactjs-popup";
import { Graph } from 'react-d3-graph';

const myConfig = {
  nodeHighlightBehavior: true,
  node: {
      color: 'lightgreen',
      size: 450,
      fontSize: 15,
      highlightStrokeColor: 'blue'
  },
  link: {
      highlightColor: 'lightblue',
      semanticStrokeWidth: true
  },
  directed: true,
  staticGraph: false,
  height: 400,
  width: 300
};
const contentStyle = {
  width: "100%",
  
};
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
var valid_id_Mimic = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100']
var arrayStaleCells = []
class Sensor {
    constructor(sensorID, Temperature, Humidity, AirPressure, Voltage) {
      this.sensorID = sensorID;
      this.Temperature = Temperature;
      this.Humidity = Humidity;
      this.AirPressure = AirPressure;
      this.Voltage = Voltage;
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
var arrayCells = []     
var currentValue = 0       
export default class Test extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isRepaired: false,
            showPopUp: false,
            repairs: [],
            isCorrectValue: false,
            currentID: '',
            correctedValue:[],
            stales: {},
            dictStale:{},
            savedDictStale:{},
            checkedRow: 10000,
            index: 9999,
            currentSensorId:'',
            currentProp: '',
            valueToChange:0,
            data: [],
            repairCell: [],
            checkBlur: false,
            isRightClickedInRepair: false,
            arrayGraph: []
            
            
        }
        this.myRef = React.createRef();
        this.handleClickCell = this.handleClickCell.bind(this)
        this.handleClickRepair = this.handleClickRepair.bind(this)
        this.handleClickCellFalse = this.handleClickCellFalse.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.handleClickBackButton = this.handleClickBackButton.bind(this)
     
    }
    
 
    
     
    handleClick(sensorID, prop) {
        var url = constClass.DEEPDIVE_BACKEND+ "duration?start=" + this.props.start + "&end=" + this.props.end + "&sensorID=" + sensorID + "&prop=" + prop
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
   
    
      

    handleClickRepair() {
        window.console.log("test")
        this.setState({
            isRepaired: true
        })
    }
    showRepairs(sensorID,prop) {
        window.console.log("sensorID")
        window.console.log(sensorID)
        
        window.console.log("prop")
        window.console.log(prop)
        var repairs = this.state.repairs
        var array = []
        var repairsLength
       
        window.console.log("repairsLength")
        window.console.log(repairsLength)
        for (var i=0; i<repairs.length; i++ ) {
            var sensor_attr = repairs[i]["sensor_attr"]
            var index = repairs[i]["index"]
            var id = sensor_attr.split("_")[0]
            var attr = sensor_attr.split("_")[1]
            if (id === sensorID && prop === attr) {
                array = repairs[i]["repair"]
                break
            }
        }
       
        window.console.log("index:")
        window.console.log(index)
        if (array.length >= 10){
            array = array.slice(0, 10);
        }
        window.console.log("arrayRepairs:")
        window.console.log(array)
        
        var count = 0

        for (var j=0; j<array.length; j++) {
          var temp = Math.abs((array[j]["value"] - currentValue)/ currentValue)
          array[j]["id"] = sensorID
          array[j]["prop"] = prop
          if ( j === 0) {
            if (temp <= 0.1) {
              array[j]["kindRepair"] = "MLR, BCR"
              count += 1
            }
            else {
              array[j]["kindRepair"] = "MLR"
            }
          }
          else {
            if (temp <= 0.1 && count == 0) {
              array[j]["kindRepair"] = "BCR"
              count += 1
            }
            else {
              array[j]["kindRepair"] = ""
            }
          }
        }

        this.setState({
            repairCell:array,
           
        })
    }
    handleClickCell(e,sensorID,prop,currentVal) {
      window.console.log("e.target.value")
      window.console.log(currentVal)
      currentValue = currentVal
        
        if (e.nativeEvent.which === 1) {
            console.log('Left click'); // left click
          } else if (e.nativeEvent.which === 3) {
              e.preventDefault()
             
            this.showRepairs(sensorID,prop)
            this.setState({
                showPopUp: true, //right click
                currentSensorId: sensorID,
                currentProp: prop
            })
          }
    }
    closePopUp() {
        this.setState({
          showPopUp: false,
          checkedRow: 999,
          isRightClickedInRepair: false,
          arrayGraph: []
        })
      }
    handleClickCellFalse() {
        window.console.log("false")
    }
    checkUserInput(value,sensorID,prop) {
        var repairs = this.state.repairs
        window.console.log("checkUserInput")
        window.console.log(repairs)
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
    checkValueInArrayCorrected(val) {
       
        return (this.state.correctedValue.includes(val))
    }
    handleClickBackButton() {
       window.console.log("array69")
       window.console.log(arrayCells)
       var x = this.state.dictStale
       for (var i=0; i<arrayCells.length; i++) {
            var sensorID = arrayCells[i].split("_")[0]
            var prop = arrayCells[i].split("_")[1]
            x[sensorID][prop]["isStale"] = true
       }
       this.setState({
           dictStale: x
       })
       
    }
    isNodeExistInData = (data,value) => {
     
      
      for (var i=0; i<data.length;i++) {
        var temp = data[i]["id"]
        
        if ( temp === value) {
          return true
        }
      }
      return false
    }
    parseAnElement = (data) => {
      // var data = {
      //   nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
      //   links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' },{ source: 'Alice', target: 'Harry' },{ source: 'Harry', target: 'Sally' }]
      // };
      var dataReturn = {
        nodes: [],
        links: []
      };
      var weight0 = data[0]["weight"]
      var weight1 = data[1]["weight"]
      if (weight0 > weight1) {
        weight0 = 12
        weight1 = 2
      }
      else {
        weight0 = 2
        weight1 = 12
      }
      for (var i=0; i<data.length; i++) {
        
          var temp = data[i]
          var from = temp["from"]
          var to = temp["to"]
          
          
          var relation = temp["relation"]
          var from_val = temp["from_val"]
          var to_val = temp["to_val"]
         
          from = from + ":"  + from_val
          to = to + ":" + to_val
          var nodes = dataReturn.nodes
          var links = dataReturn.links
          if (this.isNodeExistInData(nodes, from) === false) {
           
            var id = {}
            id.id = from
           
            nodes.push(id)
            dataReturn.nodes = this.decorateGraphNodesWithInitialPositioning(nodes)
          }
          if (this.isNodeExistInData(nodes, to) === false) {
            var id = {}
            id.id = to
            
            nodes.push(id)
            dataReturn.nodes = this.decorateGraphNodesWithInitialPositioning(nodes)
          }
          if (relation === "0") {
            var sourceTarget = {}
            sourceTarget.source = from
            sourceTarget.target = to
            
            var sourceTarget2 = {}
            sourceTarget2.source = to
            sourceTarget2.target = from
          
            if (i == 0) {
              sourceTarget.value = weight0
              sourceTarget2.value = weight0
            }
            else {
              sourceTarget.value = weight1
              sourceTarget2.value = weight1
            }
            links.push(sourceTarget)
            links.push(sourceTarget2)
          }
          else if (relation === "1") {
            var sourceTarget = {}
            sourceTarget.source = from
            sourceTarget.target = to
            
            if (i == 0) {
              sourceTarget.value = weight0
            }
            else {
              sourceTarget.value = weight1
            }
            links.push(sourceTarget)
          }
          else if (relation === "2") {
            var sourceTarget = {}
            sourceTarget.source = from
            sourceTarget.target = to
            sourceTarget.color = "#f44259"
            if (i == 0) {
              sourceTarget.value = weight0
            }
            else {
              sourceTarget.value = weight1
            }
            // sourceTarget.className = 'dottedLink'
            links.push(sourceTarget)
          }
          dataReturn.links = links
      }
      return dataReturn
    }
    decorateGraphNodesWithInitialPositioning = nodes => (nodes.map(n =>
      Object.assign({}, n, {
        x: n.x || Math.floor(Math.random() * 150),
        y: n.y || Math.floor(Math.random() * 500)
      })
    ));
    parseDataGraph = (data) => {
      var dataGraph = []
        for (var i=0; i<data.length; i++) {
            var temp = this.parseAnElement(data[i])
            console.log(temp)
            var tempGraph = <Graph
            id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
            data={temp}
            
            config={myConfig} />
            dataGraph.push(tempGraph)
        }
        this.setState({
          arrayGraph: dataGraph
        })
    }
    getDataGraph = (value,idSensor,prop) => {
      var url = constClass.DEEPDIVE_BACKEND + "relations?id=" + idSensor + "&attr=" + prop + "&val=" + value
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
              this.parseDataGraph(result["relations"])
            },
    
            (error) => {
              window.console.log(error)
            }
          )
    }
    handleClickRow = (e,key,value,idSensor,prop) => {
       

        if (e.nativeEvent.which === 1) {
          this.setState({
            checkedRow: key,
            valueToChange: value,
            isRightClickedInRepair: true,
            arrayGraph: []
        },() => this.getDataGraph(value,idSensor,prop))
      
        } else if (e.nativeEvent.which === 3) {
            e.preventDefault()
            console.log("right - click")
            console.log(idSensor)
            console.log(prop)
            
          
        }






        
    }
    
    
     
    
  
     


    handleOnBlur(e,sensorID,prop) {
      if (this.state.checkBlur === true) {
        e.preventDefault()
        window.console.log("dictStale543")
        window.console.log(this.state.dictStale)
        window.console.log("dictStale543")
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

            
            window.console.log("dictStale87")
            window.console.log(this.props.dictStale)
            var y = this.state.dictStale
            y[sensorID][prop]["isStale"] = true
            this.setState({
                dictStale: y
            })
        }
        this.setState({
          checkBlur: false
        })
      }
        
    }

    apply = () => {
        window.console.log(this.state.currentSensorId)
        window.console.log(this.state.currentProp)
        window.console.log(this.state.valueToChange)
        window.console.log(this.state.data)
        if (this.state.valueToChange !== 0) {
          var x = this.state.dictStale
          x[this.state.currentSensorId][this.state.currentProp]["isStale"] = false
          var y = this.state.data
          window.console.log("this.state.data---")
          window.console.log(y)
          window.console.log("this.state.stale---")
          window.console.log(x)
  
          if (this.props.kindDataset === constClass.CLINICAL) {
              var currentSensorIdNumber = parseInt(this.state.currentSensorId) - 1
              var currentSensorIdString = currentSensorIdNumber.toString()
              y[currentSensorIdString][this.state.currentProp] = this.state.valueToChange
          }
          else {
             for (var i=0; i<y.length; i++) {
                 if (y[i]["sensorID"] === this.state.currentSensorId) {
                     y[i][this.state.currentProp] = this.state.valueToChange
                     break
                 }
             }
          }
          
          window.console.log("this.state.data--**-")
          window.console.log(y)
          window.console.log()
          this.setState({
              dictStale: x,
              data: y,
              showPopUp: false,
              
              valueToChange: 0

          })
          
        }
       
        
    }

parseObject(data) {
    if (this.props.kindDataset === constClass.SENSOR) {
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
    else if (this.props.kindDataset === constClass.CLINICAL) {
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
      lastUpdateForMimic() {
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
              this.stale2()
            },
    
            (error) => {
              window.console.log(error)
            }
          )
      }
      createDictionary(data) {
        if (this.props.kindDataset === constClass.SENSOR) {
          window.console.log("createDictionary")
          window.console.log(data)
          var dict = {};
          for (var i = 0; i < valid_id.length; i++) {
            dict[valid_id[i]] = {}
      
          }
      
          for (var j = 0; j < data.length; j++) {
      
            var sensorID = data[j][0].split("_")[0]
            var prop = data[j][0].split("_")[1]
            var hex = ""

            if (probability >= 0 && probability <= 0.14285714285714285 ) {
              hex = "#800026"
            }
            else if (probability >= 0.14285714285714285 && probability <= 0.2857142857142857 ) {
              hex = "#bd0026"
            }
            else if (probability >= 0.2857142857142857 && probability <= 0.42857142857142855 ) {
              hex = "#e31a1c"
            }
            else if (probability >= 0.42857142857142855 && probability <= 0.5714285714285714 ) {
              hex = "#fc4e2a"
            }
            else if (probability >= 0.5714285714285714 && probability <= 0.7142857142857142 ) {
              hex = "#fd8d3c"
            }
            else if (probability >= 0.7142857142857142 && probability <= 0.857142857142857 ) {
              hex = "#feb24c"
            }
            else if (probability >= 0.857142857142857 && probability <= 1.0 ) {
              hex = "#fed976"
            }
           
      
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
        else if (this.props.kindDataset === constClass.CLINICAL) {
          var dict = {};
          for (var i = 0; i < valid_id_Mimic.length; i++) {
            dict[valid_id_Mimic[i]] = {}
      
          }
      
          for (var j = 0; j < data.length; j++) {
      
            var patientID = data[j][0].split("_")[0]
            var prop = data[j][0].split("_")[1]
            var probability = data[j][2]
            console.log(probability)
            var hex = ""
            if (probability >= 0 && probability <= 0.14285714285714285 ) {
              hex = "#800026"
            }
            else if (probability >= 0.14285714285714285 && probability <= 0.2857142857142857 ) {
              hex = "#bd0026"
            }
            else if (probability >= 0.2857142857142857 && probability <= 0.42857142857142855 ) {
              hex = "#e31a1c"
            }
            else if (probability >= 0.42857142857142855 && probability <= 0.5714285714285714 ) {
              hex = "#fc4e2a"
            }
            else if (probability >= 0.5714285714285714 && probability <= 0.7142857142857142 ) {
              hex = "#fd8d3c"
            }
            else if (probability >= 0.7142857142857142 && probability <= 0.857142857142857 ) {
              hex = "#feb24c"
            }
            else if (probability >= 0.857142857142857 && probability <= 1.0 ) {
              hex = "#fed976"
            }
      
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
      createDictionaryCleanMost(data) {
        if (this.props.kindDataset === constClass.SENSOR) {
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
          },() => this.cleanStaleCells())
        }
        else if (this.props.kindDataset === constClass.CLINICAL) {
          var dict = {};
          for (var i = 0; i < valid_id_Mimic.length; i++) {
            dict[valid_id_Mimic[i]] = {}
      
          }
      
          for (var j = 0; j < data.length; j++) {
      
            var patientID = data[j][0].split("_")[0]
            var prop = data[j][0].split("_")[1]
            var probability = data[j][2]
            console.log(probability)
            var hex = ""
         
            if (probability >= 0 && probability <= 0.14285714285714285 ) {
              hex = "#800026"
            }
            else if (probability >= 0.14285714285714285 && probability <= 0.2857142857142857 ) {
              hex = "#bd0026"
            }
            else if (probability >= 0.2857142857142857 && probability <= 0.42857142857142855 ) {
              hex = "#e31a1c"
            }
            else if (probability >= 0.42857142857142855 && probability <= 0.5714285714285714 ) {
              hex = "#fc4e2a"
            }
            else if (probability >= 0.5714285714285714 && probability <= 0.7142857142857142 ) {
              hex = "#fd8d3c"
            }
            else if (probability >= 0.7142857142857142 && probability <= 0.857142857142857 ) {
              hex = "#feb24c"
            }
            else if (probability >= 0.857142857142857 && probability <= 1.0 ) {
              hex = "#fed976"
            }
           
      
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
          },() => this.cleanStaleCells())
        }
        
      }
      createDictionary2(data) {
        if (this.props.kindDataset === constClass.SENSOR) {
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
          },() => this.cleanStaleCellsRangeProb())
        }
        else if (this.props.kindDataset === constClass.CLINICAL) {
          var dict = {};
          for (var i = 0; i < valid_id_Mimic.length; i++) {
            dict[valid_id_Mimic[i]] = {}
      
          }
      
          for (var j = 0; j < data.length; j++) {
      
            var patientID = data[j][0].split("_")[0]
            var prop = data[j][0].split("_")[1]
            var probability = data[j][2]
            console.log(probability)
            var hex = ""
         
            if (probability >= 0 && probability <= 0.14285714285714285 ) {
              hex = "#800026"
            }
            else if (probability >= 0.14285714285714285 && probability <= 0.2857142857142857 ) {
              hex = "#bd0026"
            }
            else if (probability >= 0.2857142857142857 && probability <= 0.42857142857142855 ) {
              hex = "#e31a1c"
            }
            else if (probability >= 0.42857142857142855 && probability <= 0.5714285714285714 ) {
              hex = "#fc4e2a"
            }
            else if (probability >= 0.5714285714285714 && probability <= 0.7142857142857142 ) {
              hex = "#fd8d3c"
            }
            else if (probability >= 0.7142857142857142 && probability <= 0.857142857142857 ) {
              hex = "#feb24c"
            }
            else if (probability >= 0.857142857142857 && probability <= 1.0 ) {
              hex = "#fed976"
            }
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
          },() => this.cleanStaleCellsRangeProb())
        }
        
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
              arrayStaleCells = result["stalecells"]
              this.createDictionary(result["stalecells"])
    
            },
    
            (error) => {
              window.console.log(error)
            }
          )
      }
      staleCleanMost() {
        var url = constClass.DEEPDIVE_BACKEND + "stalecells"
        window.console.log(url)
        // this.props.history.push('/freq')
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              window.console.log()
              arrayStaleCells = result["stalecells"]
              this.createDictionaryCleanMost(result["stalecells"])
    
            },
    
            (error) => {
              window.console.log(error)
            }
          )
      }
      cleanStaleCellsRangeProb = () => {
        var minProb = this.props.finalMinProb / 100
        var maxProb = this.props.finalMaxProb / 100
        window.console.log("min")
        window.console.log(minProb)
        var x = this.state.dictStale
        var y = this.state.data
        for (var i=0; i<arrayStaleCells.length; i++) {
          if (arrayStaleCells[i][2] >= minProb && arrayStaleCells[i][2] <= maxProb) {
            var idSensor = arrayStaleCells[i][0].split("_")[0]
            var propSensor = arrayStaleCells[i][0].split("_")[1]
  
           
             
  
              var valueToClean = this.getValueToRepair(idSensor,propSensor)
              
           
           
            x[idSensor][propSensor]["isStale"] = false
            
            if (this.props.kindDataset === constClass.CLINICAL) {
              var currentSensorIdNumber = parseInt(idSensor) - 1
              var currentSensorIdString = currentSensorIdNumber.toString()
              y[currentSensorIdString][propSensor] = valueToClean
          }
          else {
             for (var k=0; k<y.length; k++) {
                 if (y[k]["sensorID"] === idSensor) {
                     y[k][propSensor] = valueToClean
                     break
                 }
             }
          }
          }
        }
        this.setState({
          data: y,
          dictStale: x
        })

      }
      stale2() {
        var url = constClass.DEEPDIVE_BACKEND + "stalecells"
        window.console.log(url)
        // this.props.history.push('/freq')
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              window.console.log()
              arrayStaleCells = result["stalecells"]
              this.createDictionary2(result["stalecells"])
             
    
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
         this.lastUpdate()
         this.stale()
         this.repairs()
        //  this.patterns()
     } 
   
     getValueToRepair = (id,prop) => {
     
       var repairs = this.state.repairs
     
      //  window.console.log(repairs)
     
       for (var i=0; i< repairs.length; i++) {
        var sensor_attr = repairs[i]["sensor_attr"]
        var idSensor = sensor_attr.split("_")[0]
        var propSensor = sensor_attr.split("_")[1]
       
        if (idSensor === id && prop === propSensor) {
      
          return repairs[i]["repair"][0]["value"]
        }
       }
     } 
     cleanStaleCells = () => {
       window.console.log(numberStaleCells)
       var numberStaleCells = this.props.numberStaleCells
      var numCellToClean = arrayStaleCells.length - numberStaleCells
      var tempArray = arrayStaleCells
        for (var i=0; i<tempArray.length; i++) {
          for (var j=i+1; j<tempArray.length; j++) {
            if (tempArray[i][2] < tempArray[j][2]) {
                var temp = tempArray[i]
                tempArray[i] = tempArray[j]
                tempArray[j] = temp 
            }
          }
        }
        window.console.log("tempArray:")
        window.console.log(tempArray)
        var x = this.state.dictStale
        var y = this.state.data
        for (var j=0; j<numCellToClean; j++) {
          var idSensor = tempArray[j][0].split("_")[0]
          var propSensor = tempArray[j][0].split("_")[1]

         
           

            var valueToClean = this.getValueToRepair(idSensor,propSensor)
            
         
         
          x[idSensor][propSensor]["isStale"] = false
          
          if (this.props.kindDataset === constClass.CLINICAL) {
            var currentSensorIdNumber = parseInt(idSensor) - 1
            var currentSensorIdString = currentSensorIdNumber.toString()
            y[currentSensorIdString][propSensor] = valueToClean
        }
        else {
           for (var k=0; k<y.length; k++) {
               if (y[k]["sensorID"] === idSensor) {
                   y[k][propSensor] = valueToClean
                   break
               }
           }
        }
          
         
        }
        this.setState({
          data:y,
          dictStale:x
        })
        // tempArray.slice(0,numberStaleCells)



      window.console.log(tempArray)
  


     }
     componentWillReceiveProps(nextProps) {
      if (nextProps.numberStaleCells !== this.props.numberStaleCells && nextProps.finalMinProb === this.props.finalMinProb && nextProps.finalMaxProb === this.props.finalMaxProb) {
        window.console.log("arrayStae:")
        window.console.log(arrayStaleCells.length)
       this.staleCleanMost()
        // window.console.log("testfuck")
        // var x = this.getValueToRepair("2","HDL")
        // window.console.log(x)
    
      }
      // else if (nextProps.isRefreshed !== this.props.isRefreshed || nextProps.isRefreshed === true) {
      //   this.stale2()

        
    
      // }
      else if (nextProps.finalMinProb !== this.props.finalMinProb || nextProps.finalMaxProb !== this.props.finalMaxProb) {
        this.lastUpdateForMimic()
       
       
      }
    }
     handleOnInput = (e) => {
       window.console.log("handleOnInput")
       window.console.log(this.myRef.current)
       this.setState({
         checkBlur: true
       })
       
     }

    //  createTable = () => {
    //   let table = []
  
    //   for (let i = 0; i < 3; i++) {
    //    table.push(<Graph
    //     id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    //     data={data}
    //     config={myConfig} />)
    //   }
    //   return table
    // }

    render() {
        
        let kindRepair
        if (this)
        window.console.log("this.state.dictStale")
        window.console.log(this.state.dictStale)
        window.console.log("this.state.dictStale")
        window.console.log("repaircell")
        window.console.log(this.state.repairCell)
        window.console.log("repaircell")
        window.console.log("staleCells")
        window.console.log(this.state.data)
        console.log("this.state.data")
        console.log(this.state.data)
        var dict = this.state.dictStale
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
        return (
            
            <div>
                {Object.keys(this.state.dictStale).length !== 0 ? 
            <div>
              
            {this.props.kindDataset === constClass.SENSOR ? <table className="table table-striped" id="age">
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
                            <td>{item["sensorID"]}</td>

                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Temperature")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Temperature')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Temperature',item["Temperature"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Temperature') : null} 
                                style={{color:"#ffffff" ,cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["sensorID"]].hasOwnProperty("Temperature")?(dict[item["sensorID"]]["Temperature"]["isStale"] ? dict[item["sensorID"]]["Temperature"]["hex"] : "#42f445") : null}}>
                                {item["Temperature"]}
                                </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Humidity")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Humidity')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity',item["Humidity"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Humidity")?(dict[item["sensorID"]]["Humidity"]["isStale"] ? dict[item["sensorID"]]["Humidity"]["hex"] : "#42f445") : null}} >
                                {item["Humidity"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("AirPressure")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'AirPressure')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressure',item["AirPressure"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressur') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("AirPressure")?(dict[item["sensorID"]]["AirPressure"]["isStale"] ? dict[item["sensorID"]]["AirPressure"]["hex"] : "#42f445") : null}} >
                                {item["AirPressure"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Voltage")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Voltage')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage',item["Voltage"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Voltage")?(dict[item["sensorID"]]["Voltage"]["isStale"] ? dict[item["sensorID"]]["Voltage"]["hex"] : "#42f445") : null }} >
                                {item["Voltage"]}
                            </td>
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table> :
            
            <div id="tableMimic">  
            <table className="table table-striped" id="age">
                <thead>
                <tr>
              <th scope="col">ID</th>
              <th scope="col">WT</th>
              <th scope="col">LDL</th>
              <th scope="col">HDL</th>
              <th scope="col">HR</th>
              <th scope="col">DBP</th>
              <th scope="col">SBP</th>
              <th scope="col">WBC</th>
              <th scope="col">RR</th>
              <th scope="col">SpO2</th>
              <th scope="col">TMP</th>
              <th scope="col">ABE</th>
              <th scope="col">ACO2</th>
              <th scope="col">APH</th>
              <th scope="col">Hb</th>
              <th scope="col">RBC</th>
              <th scope="col">RBCF</th>             
              <th scope="col">CVP</th>
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
                          
                            <td>{item["id_patient"]}</td>

                            <td 
                                className="td"
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("WT")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'WT')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WT',item["WT"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WT') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("WT")?(dict[item["id_patient"]]["WT"]["isStale"] ? "#ffffff" : "#000000") : null,cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("WT")?(dict[item["id_patient"]]["WT"]["isStale"] ? dict[item["id_patient"]]["WT"]["hex"] : "#42f445") : null}}>
                                {item["WT"]}
                            </td>
                            <td 
                                className="td"
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("LDL")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'LDL')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LDL',item["LDL"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LDL') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("LDL")?(dict[item["id_patient"]]["LDL"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("LDL")?(dict[item["id_patient"]]["LDL"]["isStale"] ? dict[item["id_patient"]]["LDL"]["hex"] : "#42f445") : null}}>
                                {item["LDL"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("HDL")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'HDL')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HDL',item["HDL"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HDL') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("HDL")?(dict[item["id_patient"]]["HDL"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("HDL")?(dict[item["id_patient"]]["HDL"]["isStale"] ? dict[item["id_patient"]]["HDL"]["hex"] : "#42f445") : null}}>
                                {item["HDL"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("HR")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'HR')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HR',item["HR"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HR') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("HR")?(dict[item["id_patient"]]["HR"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("HR")?(dict[item["id_patient"]]["HR"]["isStale"] ? dict[item["id_patient"]]["HR"]["hex"] : "#42f445") : null}}>
                                {item["HR"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("DBP")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'DBP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'DBP',item["DBP"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'DBP') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("DBP")?(dict[item["id_patient"]]["DBP"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("DBP")?(dict[item["id_patient"]]["DBP"]["isStale"] ? dict[item["id_patient"]]["DBP"]["hex"] : "#42f445") : null}}>
                                {item["DBP"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("SBP")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'SBP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SBP',item["SBP"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SBP') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("SBP")?(dict[item["id_patient"]]["SBP"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("SBP")?(dict[item["id_patient"]]["SBP"]["isStale"] ? dict[item["id_patient"]]["SBP"]["hex"] : "#42f445") : null}}>
                                {item["SBP"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("WBC")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'WBC')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WBC',item["WBC"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WBC') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("WBC")?(dict[item["id_patient"]]["WBC"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("WBC")?(dict[item["id_patient"]]["WBC"]["isStale"] ? dict[item["id_patient"]]["WBC"]["hex"] : "#42f445") : null}}>
                                {item["WBC"]}
                            </td>

                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RR")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'RR')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RR',item["RR"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RR') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("RR")?(dict[item["id_patient"]]["RR"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RR")?(dict[item["id_patient"]]["RR"]["isStale"] ? dict[item["id_patient"]]["RR"]["hex"] : "#42f445") : null}}>
                                {item["RR"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("SpO2")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'SpO2')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SpO2',item["SpO2"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SpO2') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("SpO2")?(dict[item["id_patient"]]["SpO2"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("SpO2")?(dict[item["id_patient"]]["SpO2"]["isStale"] ? dict[item["id_patient"]]["SpO2"]["hex"] : "#42f445") : null}}>
                                {item["SpO2"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("TMP")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'TMP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TMP',item["TMP"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TMP') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("TMP")?(dict[item["id_patient"]]["TMP"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("TMP")?(dict[item["id_patient"]]["TMP"]["isStale"] ? dict[item["id_patient"]]["TMP"]["hex"] : "#42f445") : null}}>
                                {item["TMP"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("ABE")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'ABE')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ABE',item["ABE"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ABE') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("ABE")?(dict[item["id_patient"]]["ABE"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("ABE")?(dict[item["id_patient"]]["ABE"]["isStale"] ? dict[item["id_patient"]]["ABE"]["hex"] : "#42f445") : null}}>
                                {item["ABE"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("ACO2")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'ACO2')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ACO2',item["ACO2"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ACO2') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("ACO2")?(dict[item["id_patient"]]["ACO2"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("ACO2")?(dict[item["id_patient"]]["ACO2"]["isStale"] ? dict[item["id_patient"]]["ACO2"]["hex"] : "#42f445") : null}}>
                                {item["ACO2"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("APH")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'APH')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'APH',item["APH"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'APH') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("APH")?(dict[item["id_patient"]]["APH"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("APH")?(dict[item["id_patient"]]["APH"]["isStale"] ? dict[item["id_patient"]]["APH"]["hex"] : "#42f445") : null}}>
                                {item["APH"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("Hb")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'Hb')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'Hb',item["Hb"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'Hb') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("Hb")?(dict[item["id_patient"]]["Hb"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("Hb")?(dict[item["id_patient"]]["Hb"]["isStale"] ? dict[item["id_patient"]]["Hb"]["hex"] : "#42f445") : null}}>
                                {item["Hb"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RBC")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'RBC')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBC',item["RBC"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBC') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("RBC")?(dict[item["id_patient"]]["RBC"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RBC")?(dict[item["id_patient"]]["RBC"]["isStale"] ? dict[item["id_patient"]]["RBC"]["hex"] : "#42f445") : null}}>
                                {item["RBC"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RBCF")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'RBCF')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBCF',item["RBCF"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBCF') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("RBCF")?(dict[item["id_patient"]]["RBCF"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RBCF")?(dict[item["id_patient"]]["RBCF"]["isStale"] ? dict[item["id_patient"]]["RBCF"]["hex"] : "#42f445") : null}}>
                                {item["RBCF"]}
                            </td>

                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("CVP")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'CVP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'CVP',item["CVP"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'CVP') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("CVP")?(dict[item["id_patient"]]["CVP"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("CVP")?(dict[item["id_patient"]]["CVP"]["isStale"] ? dict[item["id_patient"]]["CVP"]["hex"] : "#42f445") : null}}>
                                {item["CVP"]}
                            </td>
                           
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("MONO")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'MONO')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'MONO',item["MONO"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'MONO') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("MONO")?(dict[item["id_patient"]]["MONO"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("MONO")?(dict[item["id_patient"]]["MONO"]["isStale"] ? dict[item["id_patient"]]["MONO"]["hex"] : "#42f445") : null}}>
                                {item["MONO"]}
                            </td>
                            <td 
                                className="td"
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("EOS")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'EOS')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'EOS',item["EOS"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'EOS') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("EOS")?(dict[item["id_patient"]]["EOS"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("EOS")?(dict[item["id_patient"]]["EOS"]["isStale"] ? dict[item["id_patient"]]["EOS"]["hex"] : "#42f445") : null}}>
                                {item["EOS"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("LY")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'LY')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LY',item["LY"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LY') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("LY")?(dict[item["id_patient"]]["LY"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("LY")?(dict[item["id_patient"]]["LY"]["isStale"] ? dict[item["id_patient"]]["LY"]["hex"] : "#42f445") : null}}>
                                {item["LY"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RDW")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'RDW')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RDW',item["RDW"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RDW') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("RDW")?(dict[item["id_patient"]]["RDW"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RDW")?(dict[item["id_patient"]]["RDW"]["isStale"] ? dict[item["id_patient"]]["RDW"]["hex"] : "#42f445") : null}}>
                                {item["RDW"]}
                            </td>
                            <td
                                className="td" 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("TC")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["id_patient"],'TC')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TC',item["TC"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TC') : null} 
                                style={{color: dict[item["id_patient"]].hasOwnProperty("TC")?(dict[item["id_patient"]]["TC"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("TC")?(dict[item["id_patient"]]["TC"]["isStale"] ? dict[item["id_patient"]]["TC"]["hex"] : "#42f445") : null}}>
                                {item["TC"]}
                            </td>

                            
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table> </div>}
            
            <Popup contentStyle={contentStyle} onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
          <div className="table-wrapper-scroll-y row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Value</th>
                <th scope="col">Probability</th>
                <th scope="col">RepairType</th>

              </tr>
            </thead>
            <tbody>{this.state.repairCell.map(function (item, key) {

              return (

                <tr key={key} >
                  <td>{key + 1}</td>


                  <td 
                    onClick={(e) =>  this.handleClickRow(e,key,item["value"],item["id"],item["prop"]) } 
                    style={{background: this.state.checkedRow === key? "#4286f4": null}}  
                    onContextMenu={(e) =>  this.handleClickRow(e,key,item["value"],item["id"],item["prop"]) } 
                     
                    >{item["value"]} 
                                 
                  </td>
                    
                  <td >{item["prob"]} %</td>
                  <td>{item["kindRepair"]}</td>
                  
                </tr>
              )

            }.bind(this))}</tbody>
          </table>
         
          {this.state.isRightClickedInRepair === true ? this.state.arrayGraph : null}
        
         
          
          
          </div>
          <input onClick={this.apply} id="apply" className="btn btn-primary" type="button" value="Apply"></input>
        </Popup>
            
        </div> : null }
            </div>
        )

    }

}