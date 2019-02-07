import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../CSS/Patterns.css'
import * as constClass from '../Const/utils.js'
import { RadioGroup, Radio } from 'react-radio-group'
export default class Patterns extends Component {

    render() {
        window.console.log('asdasasdasdd')
        window.console.log(this.props.patterns)
        return (
            <table className="table table-striped TableFregAge">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">id</th>
              <th scope="col">attr1</th>
              <th scope="col">attr2</th>
              <th scope="col">relation</th>
              <th scope="col">time unit</th>
            </tr>
          </thead>
          <tbody>{this.props.patterns.map(function (item, key) {

            return (

              <tr key={key} >
                <td>{key + 1}</td>
                

                <td >{item["id"]}</td>
                <td >{item["attr1"]}</td>
                <td >{item["attr2"]}</td>
                <td >{item["relation"]}</td>
                <td >{item["time unit"]}</td>
                           
              </tr>
            )

          }.bind(this))}</tbody>
        </table>
        )

    }

}