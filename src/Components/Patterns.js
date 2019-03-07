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
    this.state = {
      patterns: [],  
        numStaleCells: 0
        
    }
 
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
 
  

  componentDidMount() {
    // this.patterns()
  
  }

  mapPatters(data) {
    data = data.slice(0,10)
   window.console.log("mapPatters")
   window.console.log(data)
   for(var i=0; i<data.length; i++) {
     if (data[i]["relation"] === "1") {
       data[i]["relation"] = "+ve"
     }
     else if (data[i]["relation"] === "2") {
       data[i]["relation"] = "-ve"
     }
     else {
       data[i]["relation"] = "co-occur"
     }
     if (data[i]["time unit"] === "1") {
        data[i]["time unit"] = "next"
     }
     else if (data[i]["time unit"] === "0") {
      data[i]["time unit"] = "same"
     }
     else {
      data[i]["time unit"] = "same"
     }
   }
   return data
  }
  

    render() {
      
        // arrayLinks = []
        // dataNodes["nodes"] = []
    // this.getLinks(this.state.patterns)
   
      // dataNodes["links"] = arrayLinks
      // window.console.log("arrayLinks:")
      // window.console.log(dataNodes)
      // window.console.log("arrayLinks:")
   
      var data = this.mapPatters(this.state.patterns)
      window.console.log("this.props.valBeta")
      window.console.log(this.props.valBeta)
      
    
        
        return (
          <div>
         {this.props.isRepaired === true?    
         <div id="graph"> 
         
          <b className="largeSizePattern">Remaining number of  </b> 
          <br></br>
          <b className="largeSizePattern">stale cells: {this.props.numberStaleCells}</b>
          <div id="sliderMostStaleCell">
                <b className="largeSizePattern">Clean the most stale cells: </b>
                <br></br>
                 <b className="largeSizePattern">  {this.props.mostVal} (cells)</b>
                 <br></br>
                 
                <ReactBootstrapSlider
                    value={this.props.mostVal}
                    max={this.props.numberStaleCells}
                    min={0}
                    change={e => this.props.onChange(e,"most")}
                    
                />
                <br></br>
                
                <input className="apply" onClick={() => this.props.onClick("most")} id="applyMost" className="btn btn-primary" type="button" value="Apply"></input>
            
               
            </div>
            <div id="sliderMostStaleCell">
                <b className="largeSizePattern"> Clean stale cells within </b>
                <br></br>
                <b className="largeSizePattern">currency probability range</b>
                <br></br>
                <ReactBootstrapSlider
                    value={[this.props.minProb, this.props.maxProb]}
                    max={this.props.valBeta}
                    min={0}
                    change={e => this.props.onChange(e,"range")}
                    
                />
                <br></br>
                
            
                 <div id="startTime">
                    <form>

                        <b className="largeSizePattern"> Start probability: </b>
                        <b className="largeSizePattern" id="startTime"> {this.props.minProb}%</b>
                        <br></br>
                        <b className="largeSizePattern" id="endTime"> End probability: </b>
                        <b className="largeSizePattern"> {this.props.maxProb}%</b>
                        <br></br>
            {/* <a href="#" onClick={this.props.onClick} id={constClass.FREQUENCY}>Frequency</a>   */}
            <input className="apply" onClick={() => this.props.onClick("range")} id="applyMost" className="btn btn-primary" type="button" value="Apply"></input>
                    </form>
                </div>
            
               
            </div>
  
</div>: null}
       </div>
        )

    }

}