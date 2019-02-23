import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Patterns.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
import { Graph } from 'react-d3-graph';
const dataNodes = {
  nodes: [],
}
var test= "<---->"
// const dataMimic = {
//   nodes: [{ id: 'WT' }, { id: 'LDL' }, { id: 'HDL' },{ id: 'HR' },{ id: 'DBP' }, { id: 'SBP' }, { id: 'CVP' },{ id: 'RR' },{ id: 'SpO2' }, { id: 'TMP' }, { id: 'ABE' },{ id: 'ACO2' },{ id: 'APH' }, { id: 'Hb' }, { id: 'RBC' },{ id: 'RBCF' },{ id: 'WBC' }, { id: 'MONO' }, { id: 'EOS' },{ id: 'LY' },{ id: 'RDW' }, { id: 'TC' }],
// };
var arrayLinks = []
const myConfig = {
  nodeHighlightBehavior: true,
  node: {
      color: 'lightgreen',
      size: 200,
      highlightStrokeColor: 'blue'
  },
  link: {
      highlightColor: 'lightblue'
  },
  directed: true,
  height: 200,
  width: 500,
  automaticRearrangeAfterDropNode: true,
  focusZoom: 5,
  collapsible: true
};
const onClickGraph = function() {
  
};

const onClickNode = function(nodeId) {
  
};

const onRightClickNode = function(event, nodeId) {
 
};

const onMouseOverNode = function(nodeId) {
 
};

const onMouseOutNode = function(nodeId) {
 
};

const onClickLink = function(source, target) {
  
};

const onRightClickLink = function(event, source, target) {
 
};

const onMouseOverLink = function(source, target) {
 
};

 

const onMouseOutLink = function(source, target) {

};
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
        temp.push(id)
        dataNodes["nodes"] = temp
      } 
      if (this.checkNodesInGraph(dataNodes["nodes"],attr2) === false) {
        window.console.log("nodes")
        window.console.log(data["nodes"])
        var temp = dataNodes["nodes"]
        var id = {}
        id["id"] = attr2
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
    this.getLinks(this.props.patterns)
   
      dataNodes["links"] = arrayLinks
      window.console.log("arrayLinks:")
      window.console.log(arrayLinks)
      window.console.log("arrayLinks:")
   
   
    
        
        return (
          <div>
         {this.props.isRepaired === false?    
         <div id="graph"> 
         <b className="b">---->: Postivie causality</b>
         <br></br>
         <b className="b" > {test} : Co-Occurrence</b>
         <br></br>
         <b className="b" style={{color:"#f44265"}}> ----> : Negative causality</b>
     
         <Graph 
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={dataNodes}
    config={myConfig}
    onClickNode={onClickNode}
    onRightClickNode={onRightClickNode}
    onClickGraph={onClickGraph}
    onClickLink={onClickLink}
    onRightClickLink={onRightClickLink}
    onMouseOverNode={onMouseOverNode}
    onMouseOutNode={onMouseOutNode}
    onMouseOverLink={onMouseOverLink}
    onMouseOutLink={onMouseOutLink}
    
  
/></div>: null}
       </div>
        )

    }

}