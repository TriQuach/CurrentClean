import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Param.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
export default class Slider extends Component {

    render() {
        let theta
        let typeRadio = this.props.typeRadio
        if (typeRadio !== '') {
            if (typeRadio === constClass.SENSOR) {
                theta = <div>
                    <b className="b">δ</b> <b>20 seconds</b>
                </div>
            } else if (typeRadio === constClass.CLINICAL || typeRadio == constClass.UPLOAD) {
                theta =
                    <div>
                        <b className="b">δ</b> <ReactBootstrapSlider
                            value={this.props.valDelta}
                            max={1}
                            min={0}
                            step={0.01}
                            change={ e => this.props.onChange(e,'delta')}
                        />
                    </div>
            }

        }
        return (
            <div id="param">
                <h1 id="param"> Parameters</h1>
                <b className="b">β</b> <ReactBootstrapSlider
                    value={this.props.valBeta}
                    max={1}
                    min={0}
                    step={0.1}
                    change={ e => this.props.onChange(e,'beta')}
                />
                <br></br>
                {theta}

            </div>
        )

    }

}