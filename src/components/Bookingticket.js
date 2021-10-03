import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './search.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import authService from '../services/auth.service';
class Bookingticket extends Component{
    constructor(props){
        super(props)

        this.state = {
            currentUser: authService.getCurrentUser(),
            firstname: '',
            lastname: '',
            gender: '',
            seat_type: '',
            seat_no: '',
            quantity: '',
            isFlightCreated: false
    }
    this.flights=this.props.location.state.flights
    }
    fnameHandler=(e) =>{
        const firstname = document.getElementById("firstname").value
        this.setState({
            firstname: e.target.value
        })
        console.log("First name: "+firstname)
    }

    lnameHandler=(e) => {
        const lastname = document.getElementById("lastname").value
        this.setState({
            lastname: e.target.value
        })
        console.log("Last name: "+lastname)
    }

    genderHandler=(e) => {
        const gender = document.getElementById("gender").value
        this.setState({
            gender: e.target.value
        })
        console.log("Gender: "+gender)
    }
    seatnoHandler = (e) => {
        const seat_no = document.getElementById("seat_no").value;
        this.setState({
            seat_no: e.target.value
        });
        console.log("Seat number: "+seat_no)
    }
    quantityHandler = (e) => {
        const quantity = document.getElementById("quantity").value;
        this.setState({
            quantity: e.target.value
        });
        console.log("Quantity: "+quantity)
    }
   
    confirmHandler=(event) => {
        event.preventDefault()

    const newBooking = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        gender: this.state.gender,
        seat_no: this.state.seat_no,
        quantity: this.state.quantity,
        flight_id: this.props.location.state.flights.flight_id
    };

    console.log(newBooking)

       axios.post('http://localhost:8090/book/bookticket', newBooking)
       .then(response => response)
       .catch(error => console.log(error));
       

            window.alert("Flight is confirmed.");
            this.setState({
                firstname: '',
                lastname: '',
                gender: '',
                seat_type: '',
                seat_no: '',
                quantity: '',
                isFlightCreated: true
        });
        this.props.history.push({
            pathname: '/payment',
            state: {flight:newBooking, flights:this.flights, fromCheckIn:false}
          });
        
    };

    render(){
        if(this.state.isFlightCreated){
            return <Redirect to='/availablleflights'/>
        }
    }
    render() {
        // const styling={
        //     color: "white",
        //     backgroundColor: "black",
        //     textAlign: "center"
        // }
        return (
            <div className = "container" >
            <div className = "row" >
                <div className = "card col-md-4 offset-md-4 offset-md-4" style={{background:"black",borderRadius:"50px"}}>  
                <h1 className="text-center" style={{color:"white"}}>Booking</h1>
                <h1 className="text-center" style={{color:"white"}}>{this.props.location.state.flights.flight_name}</h1>

                <div className = "card-body" >
                <form className="bookingstyle">
                <div className="forms">

                <label className = "text-center"> First Name: <input type="text" required pattern="[a-zA-Z]+" oninvalid="setCustomValidity('Please enter alphabets only. ')"
                name="firstname" id="firstname"
                value={this.state.firstname} onChange={this.fnameHandler}></input></label><br/><br/>

                <label> Last Name:  <input type="text" required pattern="[a-zA-Z]+" oninvalid="setCustomValidity('Please enter alphabets only. ')"
                name="lastname" id="lastname"
                value={this.state.lastname} onChange={this.lnameHandler}></input></label><br/><br/>

                <label name="gender" style={{marginRight:"30px"}}>Gender: </label>
                <select name="gender" id="gender" style={{marginRight:"110px"}}
                value={this.state.gender} onChange={this.genderHandler}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    </select><br/><br/>


                <label name="seat_no" style={{marginRight:"30px"}}>SeatNo: </label>
                <select name="seat_no" id="seat_no" style={{marginRight:"130px"}}
                value={this.state.seat_no} onChange={this.seatnoHandler}>
                    <option value="1a">1a</option>
                    <option value="1b">1b</option>
                    <option value="10a">10a</option>
                    <option value="34b">34b</option>
                    <option value="53c">53c</option>
                    <option value="16a">16a</option>
                    <option value="6b">6b</option>
                    <option value="4a">4a</option>
                </select><br/><br/>

                <label style={{marginLeft:"1px"}}> Quantity: <input type="text" required pattern="[a-zA-Z]+" oninvalid="setCustomValidity('Please enter alphabets only. ')"
                name="quantity" id="quantity"
                value={this.state.quantityHandler} onChange={this.quantityHandler} style={{marginLeft:"15px"}}></input></label><br/><br/>

                    <button className="btn btn-info" type="submit"
                    onClick={this.confirmHandler}>
                        Pay
                    </button>
                    </div>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
        )
    }
}

export default Bookingticket