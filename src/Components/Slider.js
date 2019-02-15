import React, {Component} from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Slider.css'
import * as constClass from '../Const/utils.js'
export default class Slider extends Component {
    
    secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
        return hDisplay + mDisplay + sDisplay; 
    }
    
    render(){
        var start = this.secondsToHms(this.props.startTime)
        var end = this.secondsToHms(this.props.endTime)
        
        return (
            <div id="slider">
                <h1 id="value">Value</h1>
           <ReactBootstrapSlider
                value={[this.props.startTime,this.props.endTime]}
                max={1522987200}
                min={1522932390} 
                change={this.props.onChange}
            />
            <div id="startTime">
            <form>
                
            <b> Start Time: </b>
            <b id="startTime"> {start}</b>
            <br></br>
            <b id="endTime"> End Time: </b>
            <b> {end}</b>
            <br></br>
            <input id={constClass.OK} onClick={this.props.onClick} className="btn btn-primary" type="button" value="Ok"></input>
            {/* <a href="#" onClick={this.props.onClick} id={constClass.FREQUENCY}>Frequency</a>   */}
  
</form>
</div>
            </div>
            
        )
        
    }
   
}