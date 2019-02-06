import React, {Component} from 'react';
import Slider from '../Components/Slider'
import TableFregAge from '../Components/TableFregAge'
import Data from '../Components/Data'
import Param from '../Components/Param'
import '../CSS/SliderTableWrapper.css'
import { Redirect } from 'react-router'
import * as constClass from '../Const/utils.js'
import $ from 'jquery'; 
export default class SliderTableWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: 1522932390,
            endTime: 1522987200,
            typeRequest: constClass.FREQUENCY,
            valBeta: 0.4,
            typeRadio:'',
            data:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeBeta = this.handleChangeBeta.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.sendRequest = this.sendRequest.bind(this)
        this.handleChangeRadio = this.handleChangeRadio.bind((this))
        this.handleClickIdentify = this.handleClickIdentify.bind(this)
    }
    handleChange(e) {
        this.setState({
            startTime: e.target.value[0],
            endTime: e.target.value[1],    
        }) 
        // window.console.log(e.target.value[0])
    }  
    handleChangeBeta(e) {
        window.console.log(e.target.value)
        this.setState({
            valBeta: e.target.value
        })
    }
    handleChangeRadio(value) {
        window.console.log(value)
        this.setState({
            typeRadio: value
        })
    }




    sendRequest(idRequest) {
        window.console.log(this.state.data.length)
        var startTime = this.state.startTime
        var endTime = this.state.endTime
        // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        var url = "http://127.0.0.1:5000/" + idRequest+"?start="+startTime+"&end=" + endTime
        window.console.log(url)
        // this.props.history.push('/freq')
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
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
        this.props.history.push('/stale')
    }
    
    render(){
        return (
            <div className="row">
                <div>
                    <Data onChange={this.handleChangeRadio}/>
                    <Slider 
                        onChange={this.handleChange}
                        startTime={this.state.startTime}
                        endTime = {this.state.endTime}
                        onClick={this.handleClick}
                    />
                    <Param 
                        valBeta={this.state.valBeta}
                        onChange={this.handleChangeBeta}
                        typeRadio={this.state.typeRadio}
                    />
                    <input onClick={this.handleClickIdentify} id="identify" className="btn btn-primary" type="button" value="Identify stale cells"></input>
            
                </div>
                             
                <TableFregAge start={this.state.startTime} end={this.state.endTime} typeRequest={this.state.typeRequest} onClick={this.handleClick} data={this.state.data}/>
            </div>
        )
    }
}