import React, {Component} from 'react';
import Slider from '../Components/Slider'
import TableFregAge from '../Components/TableFregAge'
import Data from '../Components/Data'
import Param from '../Components/Param'
import '../CSS/SliderTableWrapper.css'
import { Redirect } from 'react-router'
import Popup from "reactjs-popup";
import * as constClass from '../Const/utils.js'
import $ from 'jquery'; 


class Question {
    constructor(data, start, end, beta) {
        this.data = data;
        this.start = start;
        this.end = end;
        this.beta = beta;
        
      }
}
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
            valDelta: 1
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
                startTime: 1550784503,
                endTime: 1550785783
            }) 
        }
        
        
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
                    <input onClick={this.handleClickIdentify} id="identify" className="btn btn-primary" type="button" value="Identify stale cells"></input>
            
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