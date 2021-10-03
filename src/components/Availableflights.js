import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './search.css'
class Availableflights extends Component{
    constructor(props) {
        super(props);

        this.state = {
            flight: this.props.location.state.flight
        }
        //this.bookTicket=this.bookTicket.bind(this);
        }

        bookTicket = (flights) => {
            this.props.history.push({pathname: '/bookingtickets',
            state: {flights: flights}});
            console.log(flights)
        }

     render(){

         return(
             <div >
                 <h1 className="text-center">Available Flights</h1>
                 <table className="table table-striped table-bordered" style={{ marginTop: 20}}>              
                    <thead className="afstyle">
                     <tr>
                         <td>FlightId</td>
                         <td>Flight name</td>
                         <td>Flight Departure</td>
                         <td>Source</td>
                         <td>Destination</td>
                         <td>Departure time</td>
                         <td>Arrival time</td>
                         <td>Flight seats</td>
                         <td>Flight Fare</td>
                         <td>Booking</td>
                     </tr>
                 </thead>
                 <tbody>
                   {
                       this.state.flight.map(
                           flights =>
                           <tr key ={flights.flight_id}>                                  
                               <td>{flights.flight_id}</td>
                               <td>{flights.flight_name}</td>
                               <td>{flights.departure_date}</td>
                               <td>{flights.source}</td>
                               <td>{flights.destination}</td>
                               <td>{flights.depart_time}</td>
                               <td>{flights.time_arrival}</td>
                               <td>{flights.seats}</td>
                               <td>{flights.fare}</td>
                               <td><button className="btn btn-primary" onClick={() => {this.bookTicket(flights)}}>
                                   Book
                               </button></td>
                           </tr>
                       )
                   }
                 </tbody>
             </table>
             </div>
         )
     }
    }

export default Availableflights
