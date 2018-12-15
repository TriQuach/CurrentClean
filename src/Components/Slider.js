import React, {Component} from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Slider.css'
import * as constClass from '../Const/utils.js'
export default class Slider extends Component {
    
    render(){
        return (
            <div id="slider">
           <ReactBootstrapSlider
                value={[this.props.startTime,this.props.endTime]}
                max={1522987200}
                min={1522932390} 
                change={this.props.onChange}
            />
            <div id="startTime">
            <form>
                
            <b> Start Time: </b>
            <b id="startTime"> {this.props.startTime}</b>
            <br></br>
            <b id="endTime"> End Time: </b>
            <b> {this.props.endTime}</b>
            <br></br>
            <input id={constClass.OK} onClick={this.props.onClick} className="btn btn-primary" type="button" value="Ok"></input>
          
  
</form>
</div>
            </div>
            
        )
        
    }
   
}