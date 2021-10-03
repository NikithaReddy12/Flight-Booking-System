import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from 'react'
import authService from '../services/auth.service';

class CheckIn extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             booking_id: " ",
             firstname: '',
             lastname: '',
             gender: '',
             seat_type:'',
             seat_no: '',
             quantity:'',
             flight_id: " ",
             checkin: {},
             flight_name: " ",
             departure_date: " ",
             source: " ",
             destination: " ",
             depart_time: " ",
             time_arrival: " ",
             flight: {}
        }
        this.from_booking=this.props.location.state
    }

    idHandler= (event) => {
        this.setState({
            booking_id:event.target.value
        })
    }

    submitHandler= (e) => {
        e.preventDefault()
        console.log(this.from_booking)
        axios.get("http://localhost:8091/checkin/checkindetails/"+this.state.booking_id)
        .then(response => 
            {console.log(response.data)
            this.setState({checkin: response.data
            })
        })
        .catch(err => console.log(err))

    }

       deleteHandler= (e) => {
        e.preventDefault()
        axios.delete("http://localhost:8091/checkin/delete/"+this.state.booking_id)
        .then(response => 
            {console.log(response.data)
            this.setState({checkin: response.data
            })
        })
        .catch(err => console.log(err))

    }


    flightHandler= (e) => {
        e.preventDefault()
        axios.get("http://localhost:8080/search/list/"+this.state.checkin.flight_id)
        .then(response => 
            {console.log(response.data)
            this.setState({flight:response.data
            });
        })
        .catch(err => console.log(err))

    }

    payHandler=(e) => {
        e.preventDefault()
        console.log(this.state.checkin)
        console.log(this.state.flight)
        this.props.history.push({
            pathname: '/payment',
            state: {flight: this.state.checkin, flights:this.state.flight, fromCheckIn:true}
        })
    }


    
    render() {
        return (
            <div>
                <h1 className="text-center">CheckIn Details</h1>   
                    <label>Booking Id: <input type="number" name="booking_id" id="booking_id" value={this.state.booking_id} onChange={this.idHandler}></input></label>&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-primary" onClick={this.submitHandler}>Booking Details</button>
                    <button className="btn btn-primary" onClick={this.deleteHandler} style={{marginLeft:"10px"}}>Delete Booking</button>

                    {Object.keys(this.state.checkin).length>0 ? 
                    (<table className="table table-striped table-bordered" style={{ marginTop: 20}}>       
                <thead className="checkinstyle"> 
                    <tr>
                <td>Booking id</td>      
                <td>First Name </td>
                <td>Last Name</td>
                <td>Gender</td>
                <td>Seat No</td>
                <td>Quantity</td>
                <td>Flight Details</td>
                </tr>
                </thead> 

                <tbody>
                  <tr key = {this.state.checkin.booking_id}>
                    <td>{this.state.checkin.booking_id}</td>
                    <td>{this.state.checkin.firstname}</td>
                    <td>{this.state.checkin.lastname}</td>
                    <td>{this.state.checkin.gender}</td>
                    <td>{this.state.checkin.seat_no}</td>
                    <td>{this.state.checkin.quantity}</td>
                    <td><button className="btn btn-primary" onClick={this.flightHandler}>Flight Details</button></td>
                    
                    </tr>
          </tbody>
          </table>):(<div></div>)}

          {Object.keys(this.state.flight).length>0 ? 
                    (<table className="table table-striped table-bordered" style={{ marginTop: 20}}>       
                    <thead className="checkinstyle">
                <tr>  
                <td>Flight Id</td>         
                <td>Flight Name</td>
                <td>Date of Departure</td>
                <td>Starting City</td>
                <td>Destination City</td>
                <td>Departure Time</td>
                <td>Arrival Time</td>
                <td>Fare</td>
                </tr>
                </thead>  


                <tbody>
                  <tr key = {this.state.checkin.flight_id}>
                    <td>{this.state.checkin.flight_id}</td>
                    <td>{this.state.flight.flight_name}</td>
                    <td>{this.state.flight.departure_date}</td>
                    <td>{this.state.flight.source}</td>
                    <td>{this.state.flight.destination}</td>
                    <td>{this.state.flight.depart_time}</td>
                    <td>{this.state.flight.time_arrival}</td>
                    <td>{this.state.flight.fare}</td>
                    </tr>
                </tbody>
                </table>):(<div></div>)}
                <button className="btn btn-primary" onClick={this.payHandler} style={{marginLeft:"10px"}}>pay</button>
            </div>
        )
    }
}


export default CheckIn