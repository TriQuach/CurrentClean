import React, {Component} from 'react';
import Slider from '../Components/Slider'
import TableFregAge from '../Components/TableFregAge'
import '../CSS/SliderTableWrapper.css'
import * as constClass from '../Const/utils.js'
import $ from 'jquery'; 
export default class SliderTableWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: 100,
            endTime: 200,
            typeRequest: constClass.FREQUENCY
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleChange(e) {
        this.setState({
            startTime: e.target.value[0],
            endTime: e.target.value[1],    
        }) 
        window.console.log(e.target.value[0])
    }  
    
    handleClick(e) {
        window.console.log(e.target.getAttribute('id'))
        
        if (e.target.getAttribute('id') !== constClass.OK)
            this.setState({
                typeRequest: e.target.getAttribute('id')
            }) 
       
        
    }
    render(){
        return (
            <div className="row">
                <Slider 
                    onChange={this.handleChange}
                    startTime={this.state.startTime}
                    endTime = {this.state.endTime}
                    onClick={this.handleClick}
                />             
                <TableFregAge typeRequest={this.state.typeRequest} onClick={this.handleClick}/>
            </div>
        )
    }
}