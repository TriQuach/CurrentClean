import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Patterns.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
import { Graph } from 'react-d3-graph';
import { ForceGraph2D, ForceGraph3D, ForceGraphVR } from 'react-force-graph';
const dataNodes = {
  "nodes": [],
}
var test= "<--->"
// const dataMimic = {
//   nodes: [{ id: 'WT' }, { id: 'LDL' }, { id: 'HDL' },{ id: 'HR' },{ id: 'DBP' }, { id: 'SBP' }, { id: 'CVP' },{ id: 'RR' },{ id: 'SpO2' }, { id: 'TMP' }, { id: 'ABE' },{ id: 'ACO2' },{ id: 'APH' }, { id: 'Hb' }, { id: 'RBC' },{ id: 'RBCF' },{ id: 'WBC' }, { id: 'MONO' }, { id: 'EOS' },{ id: 'LY' },{ id: 'RDW' }, { id: 'TC' }],
// };
var arrayLinks = []
var myData = {
  "nodes": [ 
      { 
        "id": "TMP",
        "name": "Temperature",
        "val": 1 ,
        "Label": "triquach"
      },
      { 
        "id": "RBC",
        "name": "Humidity",
        "val": 1 
      },
      { 
        "id": "Hb",
        "name": "Voltage",
        "val": 1 
      },
      { 
        "id": "SpO2",
        "name": "Voltage",
        "val": 1 
      }
      
  ],
  "links": [
      {
          "source": "RBC",
          "target": "TMP",
          "name": "test",
          "color": "#f4429e"
      },
      {
        "source": "TMP",
        "target": "RBC"
    },
    {
      "source": "Hb",
      "target": "TMP"
  },
  {
    "source": "TMP",
    "target": "Hb"
},
{
  "source": "SpO2",
  "target": "Hb"
},
{
  "source": "Hb",
  "target": "SpO2"
},
    
     
  ]
}

export default class Patterns extends Component {
  constructor(props) {
    super(props)
   
}
checkNodesInGraph = (data,value) => {
  
    for (var i=0; i<data.length; i++) {
      var temp = data[i]["id"]
      if (temp === value)
        return true
    }
    return false
  
}
  getLinks = (data) =>  {
    for (var i=0; i<3; i++) {
      var attr1 = data[i]["attr1"]
      var attr2 = data[i]["attr2"]
      if (this.checkNodesInGraph(dataNodes["nodes"],attr1) === false) {
        window.console.log("nodes")
        window.console.log(dataNodes["nodes"])
        window.console.log("nodes")
        var temp = dataNodes["nodes"]
        var id = {}
        id["id"] = attr1
        id["name"] = attr1

        temp.push(id)
        dataNodes["nodes"] = temp
      } 
      if (this.checkNodesInGraph(dataNodes["nodes"],attr2) === false) {
        window.console.log("nodes")
        window.console.log(data["nodes"])
        var temp = dataNodes["nodes"]
        var id = {}
        id["id"] = attr2
        id["name"] = attr2
        temp.push(id)
        dataNodes["nodes"] = temp
      } 
      var relation = data[i]["relation"]
      var temp = {}
      temp["source"] = attr1
      temp["target"] = attr2
      if (relation === "2") {
        temp["color"] = "#f44265"
      }
      if (relation === "0") {
        var temp2 = {}
        temp2["source"] = attr2
        temp2["target"] = attr1
        arrayLinks.push(temp2)
      }
      arrayLinks.push(temp)
    }
  }
  
  

    render() {
      
        arrayLinks = []
        dataNodes["nodes"] = []
    this.getLinks(this.props.patterns)
   
      dataNodes["links"] = arrayLinks
      window.console.log("arrayLinks:")
      window.console.log(dataNodes)
      window.console.log("arrayLinks:")
   
   
    
        
        return (
          <div>
         {this.props.isRepaired === true?    
         <div id="graph"> 
         <b className="b">---->: Postivie causality</b>
         <br></br>
         <b className="b" > {test} : Co-Occurrence</b>
         <br></br>
         <b className="b" style={{color:"#f44265"}}> ----> : Negative causality</b>
     
         <ForceGraph2D
    graphData={myData}
    linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        width={350}
        height={600}
       


  />  
    
  
</div>: null}
       </div>
        )

    }

}