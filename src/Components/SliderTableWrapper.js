import React, {Component} from 'react';
import Slider from '../Components/Slider'
import TableFregAge from '../Components/TableFregAge'
import '../CSS/SliderTableWrapper.css'
export default class SliderTableWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startTime: 100,
            endTime: 200,
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
    handleClick() {
        alert(this.state.startTime)
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
                <TableFregAge/>
            </div>
        )
    }
}