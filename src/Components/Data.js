import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Data.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
export default class Slider extends Component {

  render() {
    return (
      <div id="data">
        <h3 id="data"> Dataset</h3>
        <div className="moveUp">
        <RadioGroup
          name="fruit"
          onChange={this.props.onChange}
        >
          <div>
            <label className="largeSize">
              <Radio value="sensor" />  Sensor
        </label >
            <label className="largeSize" id="clinical" >
              <Radio value="medical" />  Clinical
        </label>
          </div>

          <label className="largeSize">
            <Radio value="upload" />  Upload your Data
        </label>
        <input id={constClass.UPLOAD} className="btn btn-primary" type="button" value="Upload"></input>


       
          <input type="file" />
        


        </RadioGroup>
        </div>
      </div>


    )

  }

}