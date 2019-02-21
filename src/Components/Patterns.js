import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Patterns.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
import { Graph } from 'react-d3-graph';
const data = {
  nodes: [{ id: 'Temperature' }, { id: 'Humidity' }, { id: 'AirPressure' },{ id: 'Voltage' }],
};
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
  height: 550,
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
  getLinks = (data) =>  {
    for (var i=0; i<3; i++) {
      var attr1 = data[i]["attr1"]
      var attr2 = data[i]["attr2"]
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
        window.console.log('asdasasdasdd')
        window.console.log(this.props.patterns)
        
        window.console.log(data)
        arrayLinks = []
    this.getLinks(this.props.patterns)
    data["links"] = arrayLinks
    
        
        return (
          <div>
         {this.props.isRepaired === false?    <Graph 
    id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
    data={data}
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
    className="TableFregAge"
  
/>: null}
       </div>
        )

    }

}