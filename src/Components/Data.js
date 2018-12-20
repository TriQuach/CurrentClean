import React, {Component} from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Data.css'
import * as constClass from '../Const/utils.js'
import {RadioGroup, Radio} from 'react-radio-group'
export default class Slider extends Component {
    
    render(){
        return (
            <div id="data">
                <h1 id="data"> Data</h1>
                <RadioGroup
        name="fruit"
        onChange={this.props.onChange}
        >
        <div>
        <label>
          <Radio value="sensor" />  Sensor
        </label>
        <label id="clinical" >
          <Radio value="clinical" />  Clinical
        </label>
        </div>
       
        <label>
          <Radio value="upload" />  Upload your Data
        </label>
        <input type="file"/>
        <input id={constClass.UPLOAD} className="btn btn-primary" type="button" value="Upload!"></input>
            
        
      
      </RadioGroup>
            </div>
          
            
        )
        
    }
   
}