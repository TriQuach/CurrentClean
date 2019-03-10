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
                     <b className="largeSize">δ:</b>
                        <b id="boldDelta"> 20 seconds </b>
                        <br></br>
                        <b id="hide">asdsad</b>
                </div>
            } else if (typeRadio === constClass.CLINICAL || typeRadio == constClass.UPLOAD) {
                theta =
                    <div>
                        <b className="largeSize">δ:</b>
                        <b id="boldDelta"> {this.props.valDelta} seconds </b>
                        <br></br>
                         <ReactBootstrapSlider
                            value={this.props.valDelta}
                            max={100}
                            min={1}
                            step={1}
                            id="deltaSlider"
                            change={ e => this.props.onChange(e,'delta')}
                        />
                    </div>
            }

        }
        return (
            <div id="param">
                <h2 id="param"> Parameters</h2>
                <div className="moveUp " id="wrap">
                <div className="block">
                <b className="largeSize">β:</b>
                <b id="boldBeta"> {this.props.valBeta}</b>
                <br></br>
                 <ReactBootstrapSlider
                    value={this.props.valBeta}
                    max={1}
                    min={0}
                    step={0.1}
                    id="betaSlider"
                    change={ e => this.props.onChange(e,'beta')}
                />
                </div>
                <div className="block" id="blockDelta">
                {theta}
                </div>
                </div>

            </div>
        )

    }

}