import React, { Component } from 'react';
import * as constClass from '../Const/utils'
import '../CSS/LastUpdate.css'
import Popup from "reactjs-popup";
import { Graph } from 'react-d3-graph';
import go from "../../node_modules/gojs/release/go"
import Loader from 'react-loader-spinner'
import cloneDeep from 'lodash/cloneDeep';
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
      semanticStrokeWidth: true,
      renderLabel: true,
      labelProperty: "label"
  },
  directed: true,
  staticGraph: false,
  height: 400,
  width: 300
};
// const contentStyle = {
//   height: "40vh",
//   width: "26%"
  
// };
const contentStyle = {
  
  width: "75%"
  
};
const contentStyle2 = {
  
  height: "50%",
  
};
const colWidth = {
  width: "100%",
  
};
var myDiagram = null
var arrayKeys = []
var arrayLinks =  []
var arrayWeights = []
var numClick = 1
var count2 = 0
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
var coOccur = "<->"  
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
            arrayGraph: [],
            arrayRelations: [],
            numRelations: 0,
            isSpinner: true,
            imrRepair: [],
            showPopUpIMR: false,
            isClickedValueIMR: false,
            dictStaleIMR:{},
            clickApply: false,
            lastUpdateIMR: [],
            isCLickedRepairValIMR: false
            
            
            
        }
        this.myRef = React.createRef();
        this.handleClickCell = this.handleClickCell.bind(this)
        this.handleClickCellIMR = this.handleClickCellIMR.bind(this)
        this.handleClickRepair = this.handleClickRepair.bind(this)
        this.handleClickCellFalse = this.handleClickCellFalse.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.closePopUpIMR = this.closePopUpIMR.bind(this)
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
        console.log("^()")
        console.log(repairs)
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
       
        if (id==="1" && prop==="TMP" && count2 === 0) {
          var addMoreRow = {}
          addMoreRow.value = 38
          addMoreRow.prob = 3.27
          array.push(addMoreRow)
          var sum = 0
          for (var l=0; l<array.length; l++ ){
            if (l !== 0) {
              sum += array[l]["prob"] / 2
            }
          }
          console.log("sum")
          console.log(100 - sum)
          for (var k=0; k<array.length; k++ ){
            if (k === 0) {
              array[k]["value"] = 37
              array[k]["prob"] = (100-sum) * 2
              console.log("sum2")
              console.log(100-sum)
              array[k]["prob"] =  Math.round(array[k]["prob"] * 100) / 100
            }
            if (k === 1) {
              array[k]["value"] = 36.5
              
              array[k]["prob"] /= 2
              array[k]["prob"] =  Math.round(array[k]["prob"] * 100) / 100
            }
            else {
              array[k]["prob"] /= 2
              array[k]["prob"] =  Math.round(array[k]["prob"] * 100) / 100
            }
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
         
          if (sensorID === "1" && prop === "TMP") {
            array[0]["kindRepair"] = "MLR"
            array[1]["kindRepair"] = "BCR"
            
          }
          else {
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
    handleClickCellIMR(e,sensorID,prop,currentVal) {
      window.console.log("e.target.value")
      window.console.log(currentVal)
      currentValue = currentVal
        
        if (e.nativeEvent.which === 1) {
            console.log('Left click'); // left click
          } else if (e.nativeEvent.which === 3) {
              e.preventDefault()
             
            console.log("right click IMR")
            var url = constClass.LOCAL_BACKEND+ "imr?id=" + sensorID + "&prop="+ prop + "&order=1" + "&delta=" + this.props.valDeltaIMR + "&maxNumIterations=" + this.props.maxNumIterations
        window.console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    window.console.log(result)
                    var temp = result['imrRepair'].split('_')
                    console.log('--temp--')
                    console.log(temp)
                   this.setState({
                    showPopUpIMR: true,
                    imrRepair: temp,
                    currentSensorId: sensorID,
                currentProp: prop
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
    closePopUp() {
      numClick = 1
      count2 += 1
        this.setState({
          showPopUp: false,
          checkedRow: 999,
          isRightClickedInRepair: false,
          arrayGraph: [],
        
        })
      }
      closePopUpIMR() {
      
          this.setState({
            showPopUpIMR: false,
            isCLickedRepairValIMR: false
          
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
     
      console.log()
      for (var i=0; i<data.length;i++) {
        var temp = data[i]["key"]
        
        if ( temp === value) {
          return true
        }
      }
      return false
    }
    parseAnElement = (data, Xposition, Yposition,index) => {
      
      var key0 = data[0]["from"]
      var key1 = data[0]["to"]
      var key2 = data[1]["to"]
      
      
      var val_key0 = data[0]["from_val"]
      var val_key1 = data[0]["to_val"]
      var val_key2 = data[1]["to_val"]
      var weight_0_1 = data[0]["weight"]
      var weight_1_2 = data[1]["weight"]
      weight_0_1 = Math.round(weight_0_1 * 100) / 100
      weight_1_2 = Math.round(weight_1_2 * 100) / 100
      var relation_0_1 = data[0]["relation"]
      var relation_1_2 = data[1]["relation"]


      


     

    
      
      key0 = key0 + ": " + val_key0
      key1 = key1 + ": " + val_key1
      key2 = key2 + ": " + val_key2

    
    
      
        var addedSpace1 = " ".repeat(index)
        var addedSpace2 = " ".repeat(index+1)
        var addedSpace3 = " ".repeat(index+2)
     
    
      
      

      key0 = key0 + addedSpace1
      key1 = key1 + addedSpace2
      key2 = key2 + addedSpace3
      
      
      



      var temp = {}
      temp.from = key0
      temp.to = key1
      temp.text = weight_0_1
      if (relation_0_1 === "0") {
        temp.fromArrow = ""
        temp.toArrow = ""
        temp.dash = null
      }
      else if (relation_0_1 === "1") {
        temp.fromArrow = ""
        temp.toArrow = "OpenTriangle"
        temp.dash = null
      }
      else if (relation_0_1 === "2") {
        temp.fromArrow = ""
        temp.toArrow = "OpenTriangle"
        temp.dash = [8,3]
      }
     

      var temp2 = {}
      temp2.from = key1
      temp2.to = key2
      temp2.text = weight_1_2
      if (relation_1_2 === "0") {
        temp2.fromArrow = ""
        temp2.toArrow = ""
        temp2.dash = null
      }
      else if (relation_1_2 === "1") {
        temp2.fromArrow = ""
        temp2.toArrow = "OpenTriangle"
        temp2.dash = null
      }
      else if (relation_1_2 === "2") {
        temp2.fromArrow = ""
        temp2.toArrow = "OpenTriangle"
        temp2.dash = [8,3]
      }

      arrayLinks.push(temp)
      arrayLinks.push(temp2)
      
        var key = {}
        key.key = key0
        var loc = Xposition.toString() + " " + Yposition.toString()
        key.loc = loc
        key.color = "lightblue"
        arrayKeys.push(key)
      
     
        var key = {}
        key.key = key1
       
        Yposition += 100
        var loc = Xposition.toString() + " " + Yposition.toString()
        key.loc = loc
        key.color = "lightblue"
        arrayKeys.push(key)
      
     
        var key = {}
        key.key = key2
        Yposition += 100
        var loc = Xposition.toString() + " " + Yposition.toString()
        key.loc = loc
        key.color = "lightblue"
        arrayKeys.push(key)
      
      
      // for (var i=0; i<data.length; i++) {
        
      //     var temp = data[i]
      //     var from = temp["from"]
      //     var to = temp["to"]
          
          
      //     var relation = temp["relation"]
      //     var from_val = temp["from_val"]
      //     var to_val = temp["to_val"]
         
      //     from = from + ":"  + from_val
      //     to = to + ":" + to_val
      //     var nodes = dataReturn.nodes
      //     var links = dataReturn.links
      //     if (this.isNodeExistInData(nodes, from) === false) {
           
      //       var key = {}
      //       key.key = from
           
      //       nodes.push(id)
           
      //     }
      //     if (this.isNodeExistInData(nodes, to) === false) {
      //       var id = {}
      //       id.id = to
            
      //       nodes.push(id)
      //       dataReturn.nodes = this.decorateGraphNodesWithInitialPositioning(nodes)
      //     }
      //     if (relation === "0") {
      //       var sourceTarget = {}
      //       sourceTarget.source = from
      //       sourceTarget.target = to
            
      //       var sourceTarget2 = {}
      //       sourceTarget2.source = to
      //       sourceTarget2.target = from
          
      //       if (i == 0) {
      //         sourceTarget.value = weight0
      //         sourceTarget2.value = weight0
      //       }
      //       else {
      //         sourceTarget.value = weight1
      //         sourceTarget2.value = weight1
      //       }
      //       links.push(sourceTarget)
      //       links.push(sourceTarget2)
      //     }
      //     else if (relation === "1") {
      //       var sourceTarget = {}
      //       sourceTarget.source = from
      //       sourceTarget.target = to
      //       sourceTarget.label = "test"
      //       if (i == 0) {
      //         sourceTarget.value = weight0
      //       }
      //       else {
      //         sourceTarget.value = weight1
      //       }
      //       links.push(sourceTarget)
      //     }
      //     else if (relation === "2") {
      //       var sourceTarget = {}
      //       sourceTarget.source = from
      //       sourceTarget.target = to
            
      //       sourceTarget.color = "#f44259"
      //       if (i == 0) {
      //         sourceTarget.value = weight0
      //       }
      //       else {
      //         sourceTarget.value = weight1
      //       }
      //       // sourceTarget.className = 'dottedLink'
      //       links.push(sourceTarget)
      //     }
      //     dataReturn.links = links
      // }
      // return dataReturn
    }
    
    
    parseDataGraph = (data,value,idSensor,prop) => {
      
      arrayKeys = []
      arrayLinks = []
      arrayWeights = []
      var Xposition = 140
      var Yposition = 500
      var index = 0
      var length = 0
      if (data.length >= 4) {
        length = 4
      }
      else {
        length = data.length
      }
        for (var i=0; i<length; i++) {
           
          this.parseAnElement(data[i],Xposition,Yposition,index)
          index += 3
          if (this.props.kindDataset === constClass.CLINICAL) {
            Xposition += 140
          }
          else {
            Xposition += 180
          }
         
          Yposition = 500
    }
    
      console.log("arrayKeys")
      console.log(arrayKeys)
      console.log("arrayLinks")
      console.log(arrayLinks)


      var key = {}
      key.key = " "
      var loc = "120" + " " + "430"
      key.loc = loc
      key.color = "#ffffff"
      arrayKeys.push(key)

      var key2 = {}
      key2.key = " +causality"
      var loc2 = "180" + " " + "430"
      key2.loc = loc2
      key2.color = "#ffffff"
      arrayKeys.push(key2)

      var key3 = {}
      key3.key = "  "
      var loc3 = "310" + " " + "430"
      key3.loc = loc3
      key3.color = "#ffffff"
      arrayKeys.push(key3)

      var key4 = {}
      key4.key = " -causality"
      var loc4 = "370" + " " + "430"
      key4.loc = loc4
      key4.color = "#ffffff"
      arrayKeys.push(key4)


      var key5 = {}
      key5.key = "   "
      var loc5 = "500" + " " + "430"
      key5.loc = loc5
      key5.color = "#ffffff"
      arrayKeys.push(key5)

      var key6 = {}
      key6.key = " co-occurence"
      var loc6 = "560" + " " + "430"
      key6.loc = loc6
      key6.color = "#ffffff"
      arrayKeys.push(key6)

      console.log("idSensor89")
      console.log(value)
      console.log(idSensor)
      console.log(prop)
      

      if (idSensor === "1" && prop === "TMP" && value === 37 ) {
        console.log(">?>?")
        var key7 = {}
      key7.key = "RBC:4.6"
      var loc7 = "560" + " " + "500"
      key7.loc = loc7
      key7.color = "lightblue"
        arrayKeys.push(key7)

        var key8 = {}
      key8.key = "Hb:144.7"
      var loc8 = "560" + " " + "600"
      key8.loc = loc8
      key8.color = "lightblue"
        arrayKeys.push(key8)

        var key9 = {}
        key9.key = "TMP:37"
        var loc9 = "560" + " " + "700"
        key9.loc = loc9
        key9.color = "lightblue"
          arrayKeys.push(key9)

          var temp4 = {}
          temp4.from = "RBC:4.6"
          temp4.to = "Hb:144.7"
          temp4.text = "0.94"
          temp4.fromArrow = ""
          temp4.toArrow = ""
          temp4.dash = null
          arrayLinks.push(temp4)

          var temp5 = {}
          temp5.from = "Hb:144.7"
          temp5.to = "TMP:37"
          temp5.text = "0.39"
          temp5.fromArrow = ""
          temp5.toArrow = "OpenTriangle"
          temp5.dash = [8.3]
          arrayLinks.push(temp5)

          


      }

      

      var temp = {}
      temp.from = " "
      temp.to = " +causality"
      temp.text = ""
      temp.fromArrow = ""
      temp.toArrow = "OpenTriangle"
      temp.dash = null
      arrayLinks.push(temp)


      var temp2 = {}
      temp2.from = "  "
      temp2.to = " -causality"
      temp2.text = ""
      temp2.fromArrow = ""
      temp2.toArrow = "OpenTriangle"
      temp2.dash = [8.3]
      arrayLinks.push(temp2)

      var temp3 = {}
      temp3.from = "   "
      temp3.to = " co-occurence"
      temp3.text = ""
      temp3.fromArrow = ""
      temp3.toArrow = ""
      temp3.dash = null
      arrayLinks.push(temp3)
      


      myDiagram.model = new go.GraphLinksModel(
        arrayKeys,
        
       arrayLinks
         
         
         );
      
         myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.isReadOnly = true
        myDiagram.allowMove = false
        myDiagram.allowHorizontalScroll = false
         myDiagram.allowVerticalScroll= false 

         this.setState({
           numRelations: length
         })
         console.log("miDiagramModel")
         console.log(myDiagram.model)
       numClick += 1
   
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
            
              this.parseDataGraph(result["relations"],value,idSensor,prop)
              

            },
    
            (error) => {
              window.console.log(error)
            }
          )
    }
   
    creatGraph = (value,idSensor,prop) => {
      console.log("numClick")
      console.log(numClick)
      
      if (numClick === 1) {
        var $ = go.GraphObject.make;  // for conciseness in defining templates
        myDiagram = $(go.Diagram, "myDiagramDiv");
        // define a simple Node template
        myDiagram.nodeTemplate =
          $(go.Node, "Auto",  // the Shape will go around the TextBlock
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
              // Shape.fill is bound to Node.data.color
              new go.Binding("fill", "color")),
            $(go.TextBlock,  "Diagram.isReadOnly == true",
              { 
                margin: 6,
                font: "bold 18pt serif",
                
              
              },  // some room around the text
              // TextBlock.text is bound to Node.data.key
              new go.Binding("text", "key")),
          );
  
          myDiagram.linkTemplate =
          $(go.Link,  "Diagram.isReadOnly == true",
            $(go.Shape,  // the link shape
                new go.Binding("strokeDashArray","dash"),
                // the first element is assumed to be main element: as if isPanelMain were true
                { stroke: "black", strokeWidth: 2 }),
              $(go.Shape,  // the "from" arrowhead
                new go.Binding("fromArrow", "fromArrow"),
                { scale: 2, fill: "#D4B52C" }),
              $(go.Shape,  // the "from" arrowhead
                new go.Binding("toArrow", "toArrow"),
                { scale: 2, fill: "#D4B52C" }),
            
            $(go.TextBlock, { 
              font: "17pt helvetica, arial, sans-serif",
              segmentOffset: new go.Point(0, -25) }, new go.Binding("text", "text")),
          
          );   
      }

      this.getDataGraphFromServer(value,idSensor,prop)
      
      // but use the default Link template, by not setting Diagram.linkTemplate
      // create the model data that will be represented by Nodes and Links
    
  }
  getDataGraphFromServer = (value,idSensor,prop) => {
    this.getDataGraph(value,idSensor,prop)
    // var test1 =  [
    //   { key: "A:1      ", loc: "120 220", color: "lightblue" },
    //   { key: "A:1     ", loc: "220 220", color: "lightblue" },
    
    //   { key: "C:3", loc: "120 420", color: "lightgreen" },
  
    // ]
    // var test2 =  [
    //   { from: "A:1      ", to: "C:3", text: "0.67", fromArrow:"", toArrow:"", dash: null},
    //   { from: "A:1     ", to: "C:3", text: "0.6", fromArrow:"", toArrow:"", dash: null},
     
    // ]
  
  }
  createArrayButton = (length) => {
    var res = []
    for (var i=0; i<this.state.numRelations; i++) {
        var temp 
        if ( i === 0) {
          temp = <input
          style = {{width:70, height:70,  marginLeft : 270, fontSize: 25 }}
          name="isGoing"
          type="checkbox"
          className="click"
          checked={this.state.isGoing}
          onChange={this.handleInputChange} />
        }
        else {
          temp = <input
          style = {{width:70, height:70,  marginLeft : 70 }}
          name="isGoing"
          type="checkbox"
          className="click"
          checked={this.state.isGoing}
          onChange={this.handleInputChange} />
        }
        res.push(temp)
    }
    return res
  }
    handleClickRow = (e,key,value,idSensor,prop) => {
       

        if (e.nativeEvent.which === 1) {
          this.setState({
            checkedRow: key,
            valueToChange: Math.round(value * 100) / 100,
            isRightClickedInRepair: true,
            arrayGraph: []
        },() => this.creatGraph(value,idSensor,prop))
      
        } else if (e.nativeEvent.which === 3) {
            e.preventDefault()
            console.log("right - click")
            console.log(idSensor)
            console.log(prop)
            
          
        }
      






        
    }
    handleClickRowIMR = (e,value) => {
       

      if (e.nativeEvent.which === 1) {
        this.setState({
          isCLickedRepairValIMR: true,
          valueToChange: Math.round(value * 100) / 100,
         
      })
    
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
          var y = cloneDeep(this.state.data)
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

    applyIMR = () => {
      console.log("--qwe--")
      console.log(this.state.dictStaleIMR)
      if (this.state.valueToChange !== 0) {
        var x = cloneDeep(this.state.dictStaleIMR)
        x[this.state.currentSensorId][this.state.currentProp]["isStale"] = false
        var y = cloneDeep(this.state.lastUpdateIMR)
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
            dictStaleIMR: x,
            lastUpdateIMR: y,
            showPopUpIMR: false,
            
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
        data: arrayPatients.slice(),
        lastUpdateIMR: arrayPatients.slice()
      })
    }

  }

  parseObjectIMR(data) {
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
      return arrayPatients
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
              this.imrAllCells()
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
            var probability = data[j][2]
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
            dictStale: dict,
            isSpinner: false
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
            dictStale: dict,
            isSpinner: false
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
            dictStale: dict,
            isSpinner: false
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
        var y = [...this.state.data]
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

      

      imrAllCells() {
        var url = constClass.LOCAL_BACKEND+ "imrall?&order=1" + "&delta=" + this.props.valDeltaIMR + "&maxNumIterations=" + this.props.maxNumIterations
        console.log(url)
      
    
        // this.props.history.push('/freq')
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              console.log("imrAllCells")
              console.log(result)
              var arrayPatients = this.parseObjectIMR(result['imrRepairAllCells'])
              this.compareWithLastUpdate(arrayPatients)
              this.setState({
                clickApply: false
              })
            },
    
            (error) => {
              window.console.log(error)
            }
          )
      }
    
    compareWithLastUpdate(imrRepairs) {
      var lastUpdate = this.state.data
      // var imrRepairs = this.state.dataIMR
      var dict = {};
          for (var i = 0; i < valid_id_Mimic.length; i++) {
            dict[valid_id_Mimic[i]] = {}
      
          }
      console.log('6789fuck1')
      console.log(lastUpdate)
      for (var i = 0; i<lastUpdate.length; i++) {
        for (var j in lastUpdate[i]) {
          var currentInLastUpdate = lastUpdate[i]
          var currentInImrRepairs = imrRepairs[i]
          var id_patient = currentInImrRepairs['id_patient']
          var diff = (Math.abs(currentInImrRepairs[j] - currentInLastUpdate[j])) / 100
          if (diff > 0.05) {
            var temp = dict[id_patient]
            var temp2 = {}
            temp2['hex'] = '#fc0303'
            temp2['isStale'] = true
            temp[j] = temp2

            dict[id_patient] = temp
          }
        }
      }
      this.setState({
        dictStaleIMR: dict
      })

    }
    
    componentDidMount() {
      //  this.init()
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
     cleanStaleCells = (numberStaleCells) => {
       
      
      var numCellToClean = arrayStaleCells.length - numberStaleCells
      window.console.log("numCellToClean")
      window.console.log(numCellToClean)
      var tempArray = arrayStaleCells

     for (var i=0; i<tempArray.length; i++) {
          for (var j=i+1; j<tempArray.length; j++) {
            if (tempArray[i][2] > tempArray[j][2]) {
                var temp = tempArray[i]
                tempArray[i] = tempArray[j]
                tempArray[j] = temp 
            }
          }
        }

      
       
        window.console.log("tempArray:")
        window.console.log(tempArray)
        var x = this.state.dictStale
        var y = [...this.state.data]
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
      if (nextProps.numberStaleCells !== this.props.numberStaleCells ) {
        window.console.log("arrayStae:")
        window.console.log(arrayStaleCells.length)
      //  this.staleCleanMost()
        // window.console.log("testfuck")
        // var x = this.getValueToRepair("2","HDL")
        // window.console.log(x)
        console.log(nextProps.arrayNeedClean)
        console.log(this.props.arrayNeedClean)
        this.cleanStaleCells(nextProps.numberStaleCells)
      }

      if (nextProps.isClickedApplyIMRAll !== this.props.isClickedApplyIMRAll) {
        this.setState({
          clickApply: true
        }, () => this.imrAllCells())
        
       
        
      }
      // else if (nextProps.isRefreshed !== this.props.isRefreshed || nextProps.isRefreshed === true) {
      //   this.stale2()

     
    
    
      // }
     
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
        console.log("isCompare:")
        console.log(this.props.isCompare)

        console.log("this.state.lastUpdateIMR:")
        console.log(this.state.lastUpdateIMR)

        console.log("this.state.dictStaleIMR:")
        console.log(this.state.dictStaleIMR)

        var arrayButton = this.createArrayButton(this.state.repairCell.length)

        console.log("arrayKeys%^%^")
        console.log(arrayKeys)
        console.log("arrayLinks")
        console.log(arrayLinks)
     
        var dict = this.state.dictStale
        var dictIMR = this.state.dictStaleIMR
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
          
            <div id="newLastUpdate">
           
          {/* {this.state.isSpinner === true ? <div className="loader">
              <Loader 
         type="ThreeDots"
         color="#00BFFF"
         height="100"	
         width="100"
      />  
      </div> : null}   */}
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
                                style={{color: dict[item["sensorID"]].hasOwnProperty("Temperature")?(dict[item["sensorID"]]["Temperature"]["isStale"] ? "#ffffff" : "#000000") : null ,cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["sensorID"]].hasOwnProperty("Temperature")?(dict[item["sensorID"]]["Temperature"]["isStale"] ? dict[item["sensorID"]]["Temperature"]["hex"] : "#42f445") : null}}>
                                {item["Temperature"]}
                                </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Humidity")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Humidity')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity',item["Humidity"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity') : null} 
                                style={{color: dict[item["sensorID"]].hasOwnProperty("Humidity")?(dict[item["sensorID"]]["Humidity"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Humidity")?(dict[item["sensorID"]]["Humidity"]["isStale"] ? dict[item["sensorID"]]["Humidity"]["hex"] : "#42f445") : null}} >
                                {item["Humidity"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("AirPressure")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'AirPressure')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressure',item["AirPressure"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressur') : null} 
                                style={{color: dict[item["sensorID"]].hasOwnProperty("AirPressure")?(dict[item["sensorID"]]["AirPressure"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("AirPressure")?(dict[item["sensorID"]]["AirPressure"]["isStale"] ? dict[item["sensorID"]]["AirPressure"]["hex"] : "#42f445") : null}} >
                                {item["AirPressure"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Voltage")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Voltage')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage',item["Voltage"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage') : null} 
                                style={{color: dict[item["sensorID"]].hasOwnProperty("Voltage")?(dict[item["sensorID"]]["Voltage"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Voltage")?(dict[item["sensorID"]]["Voltage"]["isStale"] ? dict[item["sensorID"]]["Voltage"]["hex"] : "#42f445") : null }} >
                                {item["Voltage"]}
                            </td>
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table> :
            
            <div id="tableMimic">  
            <table className="table table-striped" id="lastUpdate">
                <thead>
                <tr>
              <th scope="col">ID</th>
              <th scope="col">TMP</th>
              <th scope="col">SpO2</th>
              <th scope="col">HR</th>
              <th scope="col">DBP</th>
              <th scope="col">SBP</th>
              <th scope="col">WBC</th>
              <th scope="col">RR</th>
             
             
              <th scope="col">RBC</th>
              <th scope="col">RBCF</th>
              <th scope="col">MONO</th>
              <th scope="col">WT</th>
              <th scope="col">LDL</th>
              <th scope="col">HDL</th>
              <th scope="col">ABE</th>
              <th scope="col">ACO2</th>
              <th scope="col">APH</th>
              <th scope="col">Hb</th>
                           
              <th scope="col">CVP</th>
             
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
            
            
            <Popup contentStyle={this.state.isRightClickedInRepair === true ? contentStyle : null} onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
          <div className={this.state.isRightClickedInRepair === false ? "table-wrapper-scroll-y" :"table-wrapper-scroll-y2"}>
          <table className={this.state.isRightClickedInRepair === false ?"table table-striped paddingBetweenCols" : "table table-striped"}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Attribute</th>
                <th scope="col">Value</th>
                <th scope="col">Probability</th>
                <th scope="col">Repair</th>

              </tr>
            </thead>
            <tbody>{this.state.repairCell.map(function (item, key) {

              return (

                <tr key={key} >
                  <td>{key + 1}</td>

                  <td > {this.state.currentProp} </td>

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

          
         
 
          {this.state.isRightClickedInRepair === true ?
          <div> 
             <div id="myDiagramDiv" style={{width:950, height:450}}></div> 
            
             </div>
             : null}
          

         
          
          {this.state.isRightClickedInRepair === true ? arrayButton
       : null}
       <br></br>
         <input  onClick={this.apply} className={this.state.isRightClickedInRepair === false ? "btn btn-primary apply" : "btn btn-primary applyBigger" } type="button" value="Apply"></input>
        
          </div>
         
          <br></br>
        
        </Popup>
            
        </div> : null }
        
            </div>
            <div>
                {Object.keys(this.state.dictStaleIMR).length !== 0 && Object.keys(this.state.dictStale).length !== 0 ? 
            <div>
              <br></br>
              <br></br>
              <h1> IMR algorithm </h1>
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
                                style={{color: dict[item["sensorID"]].hasOwnProperty("Temperature")?(dict[item["sensorID"]]["Temperature"]["isStale"] ? "#ffffff" : "#000000") : null ,cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["sensorID"]].hasOwnProperty("Temperature")?(dict[item["sensorID"]]["Temperature"]["isStale"] ? dict[item["sensorID"]]["Temperature"]["hex"] : "#42f445") : null}}>
                                {item["Temperature"]}
                                </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Humidity")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Humidity')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity',item["Humidity"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity') : null} 
                                style={{color: dict[item["sensorID"]].hasOwnProperty("Humidity")?(dict[item["sensorID"]]["Humidity"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Humidity")?(dict[item["sensorID"]]["Humidity"]["isStale"] ? dict[item["sensorID"]]["Humidity"]["hex"] : "#42f445") : null}} >
                                {item["Humidity"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("AirPressure")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'AirPressure')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressure',item["AirPressure"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressur') : null} 
                                style={{color: dict[item["sensorID"]].hasOwnProperty("AirPressure")?(dict[item["sensorID"]]["AirPressure"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("AirPressure")?(dict[item["sensorID"]]["AirPressure"]["isStale"] ? dict[item["sensorID"]]["AirPressure"]["hex"] : "#42f445") : null}} >
                                {item["AirPressure"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Voltage")? "true" : null}
                                onInput={e => this.handleOnInput(e)}
                                onBlur={(e) => this.handleOnBlur(e,item["sensorID"],'Voltage')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage',item["Voltage"]) : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage') : null} 
                                style={{color: dict[item["sensorID"]].hasOwnProperty("Voltage")?(dict[item["sensorID"]]["Voltage"]["isStale"] ? "#ffffff" : "#000000") : null, cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Voltage")?(dict[item["sensorID"]]["Voltage"]["isStale"] ? dict[item["sensorID"]]["Voltage"]["hex"] : "#42f445") : null }} >
                                {item["Voltage"]}
                            </td>
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table> :
            
            <div id="tableMimicIMR">  
            <table className="table table-striped" id="lastUpdateIMR">
                <thead>
                <tr>
              <th scope="col">ID</th>
              <th scope="col">TMP</th>
              <th scope="col">SpO2</th>
              <th scope="col">HR</th>
              <th scope="col">DBP</th>
              <th scope="col">SBP</th>
              <th scope="col">WBC</th>
              <th scope="col">RR</th>
             
             
              <th scope="col">RBC</th>
              <th scope="col">RBCF</th>
              <th scope="col">MONO</th>
              <th scope="col">WT</th>
              <th scope="col">LDL</th>
              <th scope="col">HDL</th>
              <th scope="col">ABE</th>
              <th scope="col">ACO2</th>
              <th scope="col">APH</th>
              <th scope="col">Hb</th>
                           
              <th scope="col">CVP</th>
             
              <th scope="col">EOS</th>
              <th scope="col">LY</th>
              <th scope="col">RDW</th>
              <th scope="col">TC</th>
            </tr>
                </thead>
                <tbody>{this.state.lastUpdateIMR.map(function (item, key) {

                    return (

                        <tr key={key} >
                          
                            <td>{item["id_patient"]}</td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("TMP")?(dictIMR[item["id_patient"]]["TMP"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'TMP',item["TMP"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("TMP")?(dictIMR[item["id_patient"]]["TMP"]["isStale"] ? dictIMR[item["id_patient"]]["TMP"]["hex"] : "#42f445") : null}}>
                                {item["TMP"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("SpO2")?(dictIMR[item["id_patient"]]["SpO2"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'SpO2',item["SpO2"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("SpO2")?(dictIMR[item["id_patient"]]["SpO2"]["isStale"] ? dictIMR[item["id_patient"]]["SpO2"]["hex"] : "#42f445") : null}}>
                                {item["SpO2"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("HR")?(dictIMR[item["id_patient"]]["HR"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'HR',item["HR"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("HR")?(dictIMR[item["id_patient"]]["HR"]["isStale"] ? dictIMR[item["id_patient"]]["HR"]["hex"] : "#42f445") : null}}>
                                {item["HR"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("DBP")?(dictIMR[item["id_patient"]]["DBP"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'DBP',item["DBP"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("DBP")?(dictIMR[item["id_patient"]]["DBP"]["isStale"] ? dictIMR[item["id_patient"]]["DBP"]["hex"] : "#42f445") : null}}>
                                {item["DBP"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("SBP")?(dictIMR[item["id_patient"]]["SBP"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'SBP',item["SBP"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("SBP")?(dictIMR[item["id_patient"]]["SBP"]["isStale"] ? dictIMR[item["id_patient"]]["SBP"]["hex"] : "#42f445") : null}}>
                                {item["SBP"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("WBC")?(dictIMR[item["id_patient"]]["WBC"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'WBC',item["WBC"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("WBC")?(dictIMR[item["id_patient"]]["WBC"]["isStale"] ? dictIMR[item["id_patient"]]["WBC"]["hex"] : "#42f445") : null}}>
                                {item["WBC"]}
                            </td>

                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("RR")?(dictIMR[item["id_patient"]]["RR"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'RR',item["RR"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("RR")?(dictIMR[item["id_patient"]]["RR"]["isStale"] ? dictIMR[item["id_patient"]]["RR"]["hex"] : "#42f445") : null}}>
                                {item["RR"]}
                            </td>
                            
                           
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("RBC")?(dictIMR[item["id_patient"]]["RBC"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'RBC',item["RBC"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("RBC")?(dictIMR[item["id_patient"]]["RBC"]["isStale"] ? dictIMR[item["id_patient"]]["RBC"]["hex"] : "#42f445") : null}}>
                                {item["RBC"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("RBCF")?(dictIMR[item["id_patient"]]["RBCF"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'RBCF',item["RBCF"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("RBCF")?(dictIMR[item["id_patient"]]["RBCF"]["isStale"] ? dictIMR[item["id_patient"]]["RBCF"]["hex"] : "#42f445") : null}}>
                                {item["RBCF"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("MONO")?(dictIMR[item["id_patient"]]["MONO"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'MONO',item["MONO"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("MONO")?(dictIMR[item["id_patient"]]["MONO"]["isStale"] ? dictIMR[item["id_patient"]]["MONO"]["hex"] : "#42f445") : null}}>
                                {item["MONO"]}
                            </td>
                            <td 
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("WT")?(dictIMR[item["id_patient"]]["WT"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'WT',item["WT"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("WT")?(dictIMR[item["id_patient"]]["WT"]["isStale"] ? dictIMR[item["id_patient"]]["WT"]["hex"] : "#42f445") : null}}>
                                {item["WT"]}
                            </td>
                            <td 
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("LDL")?(dictIMR[item["id_patient"]]["LDL"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'LDL',item["LDL"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("LDL")?(dictIMR[item["id_patient"]]["LDL"]["isStale"] ? dictIMR[item["id_patient"]]["LDL"]["hex"] : "#42f445") : null}}>
                                {item["LDL"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("HDL")?(dictIMR[item["id_patient"]]["HDL"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'HDL',item["HDL"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("HDL")?(dictIMR[item["id_patient"]]["HDL"]["isStale"] ? dictIMR[item["id_patient"]]["HDL"]["hex"] : "#42f445") : null}}>
                                {item["HDL"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("ABE")?(dictIMR[item["id_patient"]]["ABE"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'ABE',item["ABE"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("ABE")?(dictIMR[item["id_patient"]]["ABE"]["isStale"] ? dictIMR[item["id_patient"]]["ABE"]["hex"] : "#42f445") : null}}>
                                {item["ABE"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("ACO2")?(dictIMR[item["id_patient"]]["ACO2"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'ACO2',item["ACO2"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("ACO2")?(dictIMR[item["id_patient"]]["ACO2"]["isStale"] ? dictIMR[item["id_patient"]]["ACO2"]["hex"] : "#42f445") : null}}>
                                {item["ACO2"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("APH")?(dictIMR[item["id_patient"]]["APH"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'APH',item["APH"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("APH")?(dictIMR[item["id_patient"]]["APH"]["isStale"] ? dictIMR[item["id_patient"]]["APH"]["hex"] : "#42f445") : null}}>
                                {item["APH"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("Hb")?(dictIMR[item["id_patient"]]["Hb"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'Hb',item["Hb"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("Hb")?(dictIMR[item["id_patient"]]["Hb"]["isStale"] ? dictIMR[item["id_patient"]]["Hb"]["hex"] : "#42f445") : null}}>
                                {item["Hb"]}
                            </td>
                          

                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("CVP")?(dictIMR[item["id_patient"]]["CVP"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'CVP',item["CVP"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("CVP")?(dictIMR[item["id_patient"]]["CVP"]["isStale"] ? dictIMR[item["id_patient"]]["CVP"]["hex"] : "#42f445") : null}}>
                                {item["CVP"]}
                            </td>
                           
                            
                            <td 
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("EOS")?(dictIMR[item["id_patient"]]["EOS"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'EOS',item["EOS"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("EOS")?(dictIMR[item["id_patient"]]["EOS"]["isStale"] ? dictIMR[item["id_patient"]]["EOS"]["hex"] : "#42f445") : null}}>
                                {item["EOS"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("LY")?(dictIMR[item["id_patient"]]["LY"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'LY',item["LY"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("LY")?(dictIMR[item["id_patient"]]["LY"]["isStale"] ? dictIMR[item["id_patient"]]["LY"]["hex"] : "#42f445") : null}}>
                                {item["LY"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("RDW")?(dictIMR[item["id_patient"]]["RDW"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'RDW',item["RDW"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("RDW")?(dictIMR[item["id_patient"]]["RDW"]["isStale"] ? dictIMR[item["id_patient"]]["RDW"]["hex"] : "#42f445") : null}}>
                                {item["RDW"]}
                            </td>
                            <td
                                className="td" 
                                
                                onContextMenu={(e) => dictIMR[item["id_patient"]].hasOwnProperty("TC")?(dictIMR[item["id_patient"]]["TC"]["isStale"] === true? (this.props.isRepaired === true ? this.handleClickCellIMR(e,item["id_patient"],'TC',item["TC"]) : null):null):null} 
                                
                                style={{ background: dictIMR[item["id_patient"]].hasOwnProperty("TC")?(dictIMR[item["id_patient"]]["TC"]["isStale"] ? dictIMR[item["id_patient"]]["TC"]["hex"] : "#42f445") : null}}>
                                {item["TC"]}
                            </td>

                            
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table> </div>}
            
            
           

        <Popup contentStyle={this.state.isRightClickedInRepair === true ? contentStyle : null} onClose={this.closePopUpIMR} open={this.state.showPopUpIMR} position="right center">
          <div className={this.state.isRightClickedInRepair === false ? "table-wrapper-scroll-y" :"table-wrapper-scroll-y2"}>
          <table className={this.state.isRightClickedInRepair === false ?"table table-striped paddingBetweenCols" : "table table-striped"}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Attribute</th>
                <th scope="col">Value</th>
                <th scope="col">Repair</th>

              </tr>
            </thead>
            <tbody>

                <tr >
                  <td>1</td>

                  <td > {this.state.imrRepair[0]} </td>

                  <td 
                    >{this.state.imrRepair[1]} 
                                 
                  </td>
                  <td  
                  onClick={(e) =>  this.handleClickRowIMR(e,this.state.imrRepair[2]) } 
                  style={{background: this.state.isCLickedRepairValIMR == true? "#4286f4": null}}  
                 
                    >
                    {this.state.imrRepair[2]} 
                  </td>
                 
                  <td>IMR</td>
                  
                </tr>
              

          </tbody>
          </table>

          
         
       
        
          

         
          
          {this.state.isRightClickedInRepair === true ? arrayButton
       : null}
       <br></br>
         <input  onClick={this.applyIMR} className={this.state.isRightClickedInRepair === false ? "btn btn-primary apply" : "btn btn-primary applyBigger" } type="button" value="Apply"></input>
        
          </div>
         
          <br></br>
        
        </Popup>
            
        </div> : null }
        
            </div>
            {this.state.clickApply == true ?  <div>
   <div className="loaderIMR">
   <Loader 
type="ThreeDots"
color="#466bae"
height="100"	
width="100"
/>  

</div> 
<div className="loaderTextIMR">
<b> IMR is running...</b>
<div/>

</div>
 </div> : null}
            </div>
  

    
        )

    }

}