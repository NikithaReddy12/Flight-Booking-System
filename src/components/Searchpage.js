import React,{ Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './search.css';
class Searchpage extends Component{
    
    constructor(props) {
        super(props)
      
        this.state = {
          source: "",
          destination: "",
          departure_date: "",
          flight: []
        }
      }
    
    changeHandler1 = (e) =>{
        this.setState({
            source: e.target.value
        });
    }
    
    changeHandler2 = (e) =>{
        this.setState({
            destination: e.target.value
        });
    }
    
    dateHandler = (e) =>{
        this.setState({
            departure_date: e.target.value
        });
    }
    
    
    submitHandler=(e) => {
      e.preventDefault()
        axios.get("http://localhost:8080/search/details/"+this.state.source+"/"+this.state.destination+"/"+this.state.departure_date)
        .then(response => 
          {console.log(response.data)
          this.setState({flight:response.data
          });
          this.props.history.push({
              pathname: '/availableflights',
              state: {flight: response.data}
          })
        })
        .catch(error => 
            console.log(error))
      }
    render() {
        return (
            <div className = "container" >
            <div className = "row" >
                <div className = "card col-md-4 offset-md-4 offset-md-4" style={{background:"black",borderRadius:"50px"}}>                
                   <center>                   
                <form className="style" onSubmit={this.submitHandler} style={{paddingBottom:"10px"}}
                    action="/">
               <h1 >Flight Search</h1>
                <label> Travelling from:
                    <input type="text" required pattern="[a-zA-Z]+" oninvalid="setCustomValidity('Please enter alphabets only. ')" name="source" value={this.state.source} onChange={this.changeHandler1}/>
                    </label> <br/><br/>
                <label> Going to:      
                <input type="text" style={{marginLeft:"40px"}} required pattern="[a-zA-Z]+" oninvalid="setCustomValidity('Please enter on alphabets only. ')" name="destination" value={this.state.destination} onChange={this.changeHandler2}/> </label>                
                <br/><br/>
                <label> Planning on: <input type="text" style={{marginLeft:"10px"}}  required pattern="^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
                name="departure_date" oninvalid="setCustomValidity('Please enter numbers only. ')" 
                placeholder="dd-mm-yyyy" value={this.state.departure_date} onChange={this.dateHandler}/></label><br/><br/>
                    <button className="btn btn-success"  type="submit"> Submit </button>
                    </form>
                    </center>
            </div>
            </div>
            </div>
        )
    }
}

export default Searchpage