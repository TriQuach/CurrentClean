import React, {Component} from 'react';
import Slider from '../Components/Slider'
import TableFregAge from '../Components/TableFregAge'
import Data from '../Components/Data'
import Param from '../Components/Param'
import '../CSS/SliderTableWrapper.css'
import { Redirect } from 'react-router'
import Popup from "reactjs-popup";
import { Progress } from 'react-sweet-progress';

import "react-sweet-progress/lib/style.css";
import go from "../../node_modules/gojs/release/go"
import * as constClass from '../Const/utils.js'
import $ from 'jquery'; 
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";




class Question {
    constructor(data, start, end, beta) {
        this.data = data;
        this.start = start;
        this.end = end;
        this.beta = beta;
        
      }
}
var myDiagram = null
export default class SliderTableWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: 0,
            endTime: 0,
            typeRequest: constClass.AGE,
            valBeta: 0.6,
            typeRadio:'',
            data:[],
            nolectedData: false,
            showPopUp: false,
            valDelta: 69,
            isClicked: false,
            isClicked2: false,
            percent: 10
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeBeta = this.handleChangeBeta.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.handleChangeRadio = this.handleChangeRadio.bind((this))
        this.handleClickIdentify = this.handleClickIdentify.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }
    handleChange(e) {
        window.console.log(e.target.value[0])
        window.console.log(e.target.value[1])
        
        this.setState({
            startTime: e.target.value[0],
            endTime: e.target.value[1],    
        }) 
        // window.console.log(e.target.value[0])
    }  
    closePopUp() {
        this.setState({
          showPopUp: false
    
    
        })
      }
    
    handleChangeBeta(e,typeParam) {
       if (typeParam === constClass.BETA) {
        this.setState({
            valBeta: e.target.value
        })
       }
       else if (typeParam === constClass.DELTA) {
           window.console.log(e.target.value)
           this.setState({
               valDelta: e.target.value
           })
       }
        
    }
   
    handleChangeRadio(value) {
        window.console.log(value)
        if (value === "sensor") {
            this.setState({
                typeRadio: value,
                startTime: 1522932390,
                endTime: 1522987200
            }) 
        }
        else if (value === "medical") {
            this.setState({
                typeRadio: value,
                startTime: 1466410104,
                endTime: 1466558522
            }) 
        }
        
        
    }
    componentDidMount() {
        // this.init()
    }



    sendRequest(idRequest) {
        if (this.state.typeRadio === constClass.SENSOR) {
            window.console.log(this.state.data.length)
            var startTime = this.state.startTime
            var endTime = this.state.endTime
            // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            var url = constClass.LOCAL_BACKEND + idRequest+"?start="+startTime+"&end=" + endTime+ "&dataset=" + constClass.SENSOR
            window.console.log(url)
            // this.props.history.push('/freq')
            fetch(url)
            .then(res => res.json())
            .then(
              (result) => {
                window.console.log("result123")
                    window.console.log(result)
                    this.setState({
                        data:result
                    })
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                window.console.log(error)
              }
            )
        } else if (this.state.typeRadio === constClass.CLINICAL) {
            window.console.log("sendRequest clinical")
            window.console.log(this.state.data.length)
            var startTime = this.state.startTime
            var endTime = this.state.endTime
            // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            var url = constClass.LOCAL_BACKEND + idRequest+"?start="+startTime+"&end=" + endTime + "&dataset=" + constClass.CLINICAL
            window.console.log(url)
            // this.props.history.push('/freq')
            fetch(url)
            .then(res => res.json())
            .then(
              (result) => {
                window.console.log("result123")
                    window.console.log(result)
                    this.setState({
                        data:result
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
    handleClick(e) {
        // window.console.log(e.target.getAttribute('id'))
        
        if (e.target.getAttribute('id') !== constClass.OK)
            this.setState({
                typeRequest: e.target.getAttribute('id'),
            },() => this.sendRequest(this.state.typeRequest)) 
        else {
            this.sendRequest(this.state.typeRequest)
        }
           
       
        
    }
    init() {
        var $ = go.GraphObject.make;  // for conciseness in defining templates
        myDiagram = $(go.Diagram, "myDiagramDiv");
        // define a simple Node template
        myDiagram.nodeTemplate =
          $(go.Node, "Auto",  // the Shape will go around the TextBlock
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
              // Shape.fill is bound to Node.data.color
              new go.Binding("fill", "color")),
            $(go.TextBlock,
              { margin: 6 },  // some room around the text
              // TextBlock.text is bound to Node.data.key
              new go.Binding("text", "key")),
          );
  
          myDiagram.linkTemplate =
          $(go.Link,
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
            
            $(go.TextBlock, { segmentOffset: new go.Point(0, -25) }, new go.Binding("text", "text")),
          
          );   

          myDiagram.model = new go.GraphLinksModel(
            [
              { key: " ", loc: "120 220", color: "#ffffff" },
              { key: "  :+ve", loc: "220 220", color: "#ffffff" },
            
            ],
            [
              { from: " ", to: "  :+ve",text:"0.5406", fromArrow:"", toArrow:"OpenTriangle", dash: [8,3]},
              
            ]);
    }
    handleClickIdentify(e) {
        if (this.state.typeRadio !== '') {
            var question = new Question(this.state.typeRadio, this.state.startTime,this.state.endTime,this.state.valBeta)
            // this.props.history.push('/stale')
            var url = ""
            if(this.state.typeRadio === constClass.SENSOR) {
                 url = "/stale/deepdive_test?beta=" + question.beta + "&data=" + question.data + "&start=" + question.start + "&end=" + question.end +"&delta=20"
            
            } else if (this.state.typeRadio === constClass.CLINICAL) {
                url = "/stale/deepdive_test?beta=" + question.beta + "&data=" + question.data + "&start=" + question.start + "&end=" + question.end +"&delta=" + this.state.valDelta
            
            }
            this.props.history.push({
                pathname: url,
                data: question // your data array of objects
              })
        } else {
            this.setState({
                showPopUp: true
            })
        }
        
    }
    handleClickIdentify(e) {
        if (this.state.typeRadio !== '') {
            var question = new Question(this.state.typeRadio, this.state.startTime,this.state.endTime,this.state.valBeta)
            // this.props.history.push('/stale')
            var url = ""
            if(this.state.typeRadio === constClass.SENSOR) {
                 url = "/stale/deepdive_test?beta=" + question.beta + "&data=" + question.data + "&start=" + question.start + "&end=" + question.end +"&delta=20"
            
            } else if (this.state.typeRadio === constClass.CLINICAL) {
                url = "/stale/deepdive_test?beta=" + question.beta + "&data=" + question.data + "&start=" + question.start + "&end=" + question.end +"&delta=" + this.state.valDelta
            
            }
            this.props.history.push({
                pathname: url,
                data: question // your data array of objects
              })
        } else {
            this.setState({
                showPopUp: true
            })
        }
        
    }
   
    handleTest =() => {
      this.setState({
        percent: this.state.percent + 10
      })
    }
    handleTest2 =() => {
     
    }

   
    
    render(){
     
        return (
            <div className="row">
               
                <div id="firstcol">
                    <Data onChange={this.handleChangeRadio}/>
                    <Slider 
                        onChange={this.handleChange}
                        startTime={this.state.startTime}
                        endTime = {this.state.endTime}
                        onClick={this.handleClick}
                        typeRadio={this.state.typeRadio}
                    />
                    <Param 
                        valBeta={this.state.valBeta}
                        onChange={this.handleChangeBeta}
                        typeRadio={this.state.typeRadio}
                        valDelta={this.state.valDelta}
                    />
                    <input onClick={this.handleClickIdentify} id="identify" className="btn btn-primary biggerFontSizeButton" type="button" value="Identify stale cells"></input>
                    {/* <input onClick={this.handleTest} id="identify" className="btn btn-primary" type="button" value="Identify stale cells"></input>
                    */}
                    {/* <div id="myDiagramDiv" style={{width:400, height:400}}></div> */}
                   
                    
         
            
                </div>
                             
                <TableFregAge 
                    start={this.state.startTime} 
                    end={this.state.endTime} 
                    typeRequest={this.state.typeRequest} 
                    onClick={this.handleClick} 
                    data={this.state.data} 
                    typeRadio={this.state.typeRadio}/>
               
                <Popup className="pop" onClose={this.closePopUp} open={this.state.showPopUp} position="right center">
                <div className="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div>
        </Popup>

         
        </div>
        )
    }
}