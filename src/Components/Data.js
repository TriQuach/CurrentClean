import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Data.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
export default class Slider extends Component {

  render() {
    return (
      <div id="data">
        <h2 id="data"> Data</h2>
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
            <Radio value="upload" />  Upload your data
        </label>
        

       
          <input type="file" />
          <input id={constClass.UPLOAD} className="btn btn-primary biggerFontSizeButton" type="button" value="Upload"></input>



        </RadioGroup>
        </div>
      </div>


    )

  }

}