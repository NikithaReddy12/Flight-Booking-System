import React, { Component } from 'react'
import StripeButton from './StripeButton'
import jsPDF from "jspdf"

class PaymentMethod extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             total: " ",

        }
        this.flight= this.props.location.state.flight
        this.flights=this.props.location.state.flights
        this.fromCheckIn=this.props.location.state.fromCheckIn
    }

    submitHandler=(e) => {
        e.preventDefault()
        this.props.history.push({
            pathname: `/stripe`,
            state:{total: this.state.total , flights: this.flights}
        })
    }

    generatePDF=()=>{
        var doc= new jsPDF("p","pt","a4");
         doc.html(document.querySelector("#content"),{
           callback:function(pdf){
            var pageCount=doc.internal.getNumberOfPages();
            pdf.deletePage(pageCount);
             pdf.save("mypdf.pdf");
     }
     });
     };

    render() {
        return (
            <div className="content">
            <div className="container">
            <div className= "text-container">
            <h1 className="text-payment" style={{color:'black'}}>Payment Confirmation</h1>
                <p className="label-group">First Name: {this.flight.firstname}</p>
                <p className="label-group">Last Name: {this.flight.lastname}</p>
                <p className="label-group">Number of seats: {this.flight.quantity}</p>
                <p className="label-group">Total: {(parseInt(this.flights.fare)*parseInt(this.flight.quantity))}</p>
                <StripeButton className="label-group" price= {(parseInt(this.flights.fare)*parseInt(this.flight.quantity))} newBooking={this.flight}/>
    <button onClick={this.generatePDF} type="primary">Generate pdf</button>
          </div>
            </div>
            </div>
        )
    }
}

export default PaymentMethod