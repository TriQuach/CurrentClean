import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Slider.css'
import * as constClass from '../Const/utils.js'
export default class Slider extends Component {

    secondsToHms(d) {
        d = Number(d);

        var numyears = Math.floor(d / 31536000); // 1 year = 31536000
        var nummonths = Math.floor((d % 31536000) / 2628000);
        var numdays = Math.floor(((d % 31536000) % 2628000) / 86400);
        var numhours = Math.floor((((d % 31536000) % 2628000) % 86400) / 3600);
        var numminutes = Math.floor((((d % 31536000) % 86400) % 3600) / 60);
        var numsecs = d - (numyears * 31536000 + nummonths * 2628000 + numdays * 86400 + numhours * 3600 + numminutes * 60)

        var yearDisplay = numyears > 0 ? numyears + (numyears === 1 ? "y" : "y") : "";
        var monthDisplay = nummonths > 0 ? nummonths + (nummonths === 1 ? "mo" : "mos") : "";
        var dayDisplay = numdays > 0 ? numdays + (numdays === 1 ? "d " : "d ") : "";
        var hoursDisplay = numhours > 0 ? numhours + (numhours === 1 ? "h" : "h") : "";
        var minsDisplay = numminutes > 0 ? numminutes + (numminutes === 1 ? "min" : "mins") : "";
        var secsDisplay = numsecs > 0 ? numsecs + (numsecs === 1 ? "s" : "s") : "";





        return yearDisplay + monthDisplay + dayDisplay + hoursDisplay + minsDisplay + secsDisplay;
    }
    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }
    render() {
       var start = this.timeConverter(this.props.startTime)
        var end = this.timeConverter(this.props.endTime)
        return (
            <div id="slider">
                <h1 id="value">Value</h1>
                <ReactBootstrapSlider
                    value={[this.props.startTime, this.props.endTime]}
                    max={1522987200}
                    min={1522932390}
                    change={this.props.onChange}
                    tooltip="hide"
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