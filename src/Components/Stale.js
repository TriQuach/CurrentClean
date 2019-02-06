import React, {Component} from 'react';
import LastUpDate from '../Components/LastUpDate'

class Sensor {
    constructor(sensorID, temperature, humidity, airPressure, voltage) {
      this.sensorID = sensorID;
      this.temperature = temperature;
      this.humidity = humidity;
      this.airPressure = airPressure;
      this.voltage = voltage;
    }
  }
export default class Test extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          data: []
        }
      this.parseObject = this.parseObject.bind(this)
    
      }
      

    parseObject(data) {
        window.console.log(data)
        var arraySensors = []
        
        var arrayValue = []
        var i;
        var count = 0
        for (i = 0; i < data.length; i++) { 
            
            var sensor_attr = data[i]["sensor_attr"]
            var sensorID = sensor_attr.split("_"); 
            var value = data[i]["value"]
            arrayValue.push(value)
            count += 1
            if (count === 4) {
                var sensor = new Sensor(sensorID[0],arrayValue[0],arrayValue[1],arrayValue[2],arrayValue[3])
                arraySensors.push(sensor)
                count = 0
                arrayValue = []
            }
}       
        window.console.log(arraySensors)
        this.setState({
            data: arraySensors
        })
    }

    componentDidMount() {
        var url = "http://172.17.49.192:5000/lastupdate"
        window.console.log(url)
        // this.props.history.push('/freq')
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
                // window.console.log(result["lastupdate"])
                // this.setState({
                //     data: result["lastupdate"]
                // })
                this.parseObject(result["lastupdate"])
          },
       
          (error) => {
            window.console.log(error)
          }
        )
      }


    render(){
        return (
           <LastUpDate data={this.state.data}/>
            
        )
        
    }
   
}