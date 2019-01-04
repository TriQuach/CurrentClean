import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Param.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
export default class Slider extends Component {

    render() {
        return (
            <div id="param">
                <h1 id="param"> Parameters</h1>
                <b className="b">β</b> <ReactBootstrapSlider
                    value={this.props.valBeta}
                    max={1}
                    min={0}
                    step={0.01}
                    change={this.props.onChange}
                />
            <br></br>
            	<b className="b">δ</b> <b>20 seconds</b>
            </div>
        )

    }

}