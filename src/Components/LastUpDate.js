import React, { Component } from 'react';
import * as constClass from '../Const/utils'
import '../CSS/LastUpdate.css'
import Popup from "reactjs-popup";
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
            savedDictStale:{}
            
        }
        this.handleClickCell = this.handleClickCell.bind(this)
        this.handleClickRepair = this.handleClickRepair.bind(this)
        this.handleClickCellFalse = this.handleClickCellFalse.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.handleClickBackButton = this.handleClickBackButton.bind(this)
     
    }
    componentWillReceiveProps(nextProps){
        window.console.log("zaqwe")
        if(nextProps.dictStale!==this.props.dictStale){
          //Perform some operation
         
          this.setState({
            dictStale: nextProps.dictStale,
            savedDictStale: nextProps.dictStale
            });
          
        }
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
        var repairs = this.props.repairs
        var array = []
        for (var i=0; i<repairs.length; i++ ) {
            var sensor_attr = repairs[i]["sensor_attr"]
            var id = sensor_attr.split("_")[0]
            var attr = sensor_attr.split("_")[1]
            if (id === sensorID && prop === attr) {
                array = repairs[i]["repair"]
            }
        }
        this.setState({
            repairs:array
        })
    }
    handleClickCell(e,sensorID,prop) {
        
        
        if (e.nativeEvent.which === 1) {
            console.log('Left click'); // left click
          } else if (e.nativeEvent.which === 3) {
              e.preventDefault()
            this.showRepairs(sensorID,prop)
            this.setState({
                showPopUp: true //right click
            })
          }
    }
    closePopUp() {
        this.setState({
          showPopUp: false
    
        })
      }
    handleClickCellFalse() {
        window.console.log("false")
    }
    checkUserInput(value,sensorID,prop) {
        var repairs = this.props.repairs
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
    
    
     
    
  
     


    handleOnBlur(e,sensorID,prop) {
        window.console.log("dictStale")
        window.console.log(this.state.dictStale)
        var temp = sensorID+ "_"+prop
        arrayCells.push(temp)
        if (this.checkUserInput(e.target.textContent,sensorID,prop)) {
            var x = this.state.dictStale
            x[sensorID][prop]["isStale"] = false
           
            
            this.setState({
                stales: x
            })
            
        }
        else {

            
            window.console.log("87")
            window.console.log(this.state.dictStale)
            var y = this.state.dictStale
            y[sensorID][prop]["isStale"] = true
            this.setState({
                stales: y
            })
        }
    }

    
    render() {
        
        window.console.log("this.state.dictStale")
        window.console.log(this.state.dictStale)
        window.console.log("this.state.dictStale")
        var dict = this.props.dictStale
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
                <tbody>{this.props.data.map(function (item, key) {

                    return (

                        <tr key={key} >
                            <td>{key + 1}</td>
                            <td>{item["sensorID"]}</td>

                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Temperature")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["sensorID"],'Temperature')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Temperature') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Temperature') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["sensorID"]].hasOwnProperty("Temperature")?(dict[item["sensorID"]]["Temperature"]["isStale"] ? dict[item["sensorID"]]["Temperature"]["hex"] : "#42f445") : null}}>
                                {item["temperature"]}
                                </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Humidity")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["sensorID"],'Humidity')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Humidity') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Humidity")?(dict[item["sensorID"]]["Humidity"]["isStale"] ? dict[item["sensorID"]]["Humidity"]["hex"] : "#42f445") : null}} >
                                {item["humidity"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("AirPressure")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["sensorID"],'AirPressure')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressure') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'AirPressur') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("AirPressure")?(dict[item["sensorID"]]["AirPressure"]["isStale"] ? dict[item["sensorID"]]["AirPressure"]["hex"] : "#42f445") : null}} >
                                {item["airPressure"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["sensorID"]].hasOwnProperty("Voltage")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["sensorID"],'Voltage')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["sensorID"],'Voltage') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null, background: dict[item["sensorID"]].hasOwnProperty("Voltage")?(dict[item["sensorID"]]["Voltage"]["isStale"] ? dict[item["sensorID"]]["Voltage"]["hex"] : "#42f445") : null }} >
                                {item["voltage"]}
                            </td>
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table> : <table className="table table-striped" id="age">
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
                <tbody>{this.props.data.map(function (item, key) {

                    return (

                        <tr key={key} >
                          
                            <td>{item["id_patient"]}</td>

                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("WT")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'WT')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WT') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WT') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("WT")?(dict[item["id_patient"]]["WT"]["isStale"] ? dict[item["id_patient"]]["WT"]["hex"] : "#42f445") : null}}>
                                {item["WT"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("LDL")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'LDL')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LDL') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LDL') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("LDL")?(dict[item["id_patient"]]["LDL"]["isStale"] ? dict[item["id_patient"]]["LDL"]["hex"] : "#42f445") : null}}>
                                {item["LDL"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("HDL")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'HDL')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HDL') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HDL') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("HDL")?(dict[item["id_patient"]]["HDL"]["isStale"] ? dict[item["id_patient"]]["HDL"]["hex"] : "#42f445") : null}}>
                                {item["HDL"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("HR")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'HR')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HR') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'HR') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("HR")?(dict[item["id_patient"]]["HR"]["isStale"] ? dict[item["id_patient"]]["HR"]["hex"] : "#42f445") : null}}>
                                {item["HR"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("DBP")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'DBP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'DBP') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'DBP') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("DBP")?(dict[item["id_patient"]]["DBP"]["isStale"] ? dict[item["id_patient"]]["DBP"]["hex"] : "#42f445") : null}}>
                                {item["DBP"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("SBP")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'SBP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SBP') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SBP') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("SBP")?(dict[item["id_patient"]]["SBP"]["isStale"] ? dict[item["id_patient"]]["SBP"]["hex"] : "#42f445") : null}}>
                                {item["SBP"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("CVP")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'CVP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'CVP') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'CVP') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("CVP")?(dict[item["id_patient"]]["CVP"]["isStale"] ? dict[item["id_patient"]]["CVP"]["hex"] : "#42f445") : null}}>
                                {item["CVP"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RR")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'RR')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RR') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RR') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RR")?(dict[item["id_patient"]]["RR"]["isStale"] ? dict[item["id_patient"]]["RR"]["hex"] : "#42f445") : null}}>
                                {item["RR"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("SpO2")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'SpO2')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SpO2') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'SpO2') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("SpO2")?(dict[item["id_patient"]]["SpO2"]["isStale"] ? dict[item["id_patient"]]["SpO2"]["hex"] : "#42f445") : null}}>
                                {item["SpO2"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("TMP")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'TMP')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TMP') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TMP') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("TMP")?(dict[item["id_patient"]]["TMP"]["isStale"] ? dict[item["id_patient"]]["TMP"]["hex"] : "#42f445") : null}}>
                                {item["TMP"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("ABE")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'ABE')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ABE') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ABE') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("ABE")?(dict[item["id_patient"]]["ABE"]["isStale"] ? dict[item["id_patient"]]["ABE"]["hex"] : "#42f445") : null}}>
                                {item["ABE"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("ACO2")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'ACO2')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ACO2') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'ACO2') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("ACO2")?(dict[item["id_patient"]]["ACO2"]["isStale"] ? dict[item["id_patient"]]["ACO2"]["hex"] : "#42f445") : null}}>
                                {item["ACO2"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("APH")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'APH')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'APH') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'APH') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("APH")?(dict[item["id_patient"]]["APH"]["isStale"] ? dict[item["id_patient"]]["APH"]["hex"] : "#42f445") : null}}>
                                {item["APH"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("Hb")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'Hb')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'Hb') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'Hb') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("Hb")?(dict[item["id_patient"]]["Hb"]["isStale"] ? dict[item["id_patient"]]["Hb"]["hex"] : "#42f445") : null}}>
                                {item["Hb"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RBC")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'RBC')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBC') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBC') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RBC")?(dict[item["id_patient"]]["RBC"]["isStale"] ? dict[item["id_patient"]]["RBC"]["hex"] : "#42f445") : null}}>
                                {item["RBC"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RBCF")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'RBCF')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBCF') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RBCF') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RBCF")?(dict[item["id_patient"]]["RBCF"]["isStale"] ? dict[item["id_patient"]]["RBCF"]["hex"] : "#42f445") : null}}>
                                {item["RBCF"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("WBC")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'WBC')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WBC') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'WBC') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("WBC")?(dict[item["id_patient"]]["WBC"]["isStale"] ? dict[item["id_patient"]]["WBC"]["hex"] : "#42f445") : null}}>
                                {item["WBC"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("MONO")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'MONO')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'MONO') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'MONO') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("MONO")?(dict[item["id_patient"]]["MONO"]["isStale"] ? dict[item["id_patient"]]["MONO"]["hex"] : "#42f445") : null}}>
                                {item["MONO"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("EOS")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'EOS')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'EOS') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'EOS') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("EOS")?(dict[item["id_patient"]]["EOS"]["isStale"] ? dict[item["id_patient"]]["EOS"]["hex"] : "#42f445") : null}}>
                                {item["EOS"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("LY")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'LY')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LY') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'LY') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("LY")?(dict[item["id_patient"]]["LY"]["isStale"] ? dict[item["id_patient"]]["LY"]["hex"] : "#42f445") : null}}>
                                {item["LY"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("RDW")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'RDW')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RDW') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'RDW') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("RDW")?(dict[item["id_patient"]]["RDW"]["isStale"] ? dict[item["id_patient"]]["RDW"]["hex"] : "#42f445") : null}}>
                                {item["RDW"]}
                            </td>
                            <td 
                                contenteditable={this.props.isRepaired === true && dict[item["id_patient"]].hasOwnProperty("TC")? "true" : null}
                                onBlur={(e) => this.props.onBlur(e,item["id_patient"],'TC')}
                                onContextMenu={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TC') : null} 
                                onClick={(e) => this.props.isRepaired === true ? this.handleClickCell(e,item["id_patient"],'TC') : null} 
                                style={{ cursor: this.props.isRepaired === true?  'pointer' : null,background: dict[item["id_patient"]].hasOwnProperty("TC")?(dict[item["id_patient"]]["TC"]["isStale"] ? dict[item["id_patient"]]["TC"]["hex"] : "#42f445") : null}}>
                                {item["TC"]}
                            </td>

                            
                        </tr>
                    )

                }.bind(this))}</tbody>
            </table>}
            
            <Popup onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
          <div className="table-wrapper-scroll-y">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Value</th>
                <th scope="col">Probability</th>

              </tr>
            </thead>
            <tbody>{this.state.repairs.map(function (item, key) {

              return (

                <tr key={key} >
                  <td>{key + 1}</td>


                  <td >{item["value"]}</td>
                  <td >{item["prob"]} %</td>
                </tr>
              )

            })}</tbody>
          </table>
          </div>
        </Popup>
            <input onClick={this.props.onClick}  id="repair" className="btn btn-primary" type="button" value="Repair"></input>
            <input id="return" onClick={this.props.onClick} className="btn btn-primary" type="button" value="Return"></input>
            
            </div>
        )

    }

}