import './App.css';
import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Searchpage from './components/Searchpage';
import About from './components/About';

import Availableflights from './components/Availableflights';
import Bookingticket from './components/Bookingticket';
import { Switch, Route,Link } from 'react-router-dom';

import CheckIn from './components/Checkin';
import PaymentMethod from './components/PaymentMethod';

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/register";
import Home from "./components/home";
import Profile from "./components/profile";
import BoardUser from "./components/board-user";
//import BoardModerator from "./components/board-moderator";
import BoardAdmin from "./components/board-admin";
//import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import StripeButton from './components/StripeButton';


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      //showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      //showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }


  render() {


    const { currentUser, showAdminBoard } = this.state;

    return (
      <div className="header" >
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
           <h2>HappyAirlines!</h2> 
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home             
                 </Link>
            </li>

            <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About   
                 </Link>
            </li>
            {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )} */}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/checkin"} className="nav-link">
                  Checkin
                </Link>
              </li>
            )}
          </div>
          </div>
      
          {currentUser ? (
            <div className="navbar-nav ml-auto">
                <li className="nav-item">
              <Link to={"/search"} className="nav-link">
                  Search
                </Link>
              </li>


              <li className="nav-item">
                <Link to={"/profile"} className="nav-link" style={{"marginLeft": "700px"}}>
                  {currentUser.username}
                </Link>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link"  onClick={this.logOut}>
                  LogOut
                </a>
              </li>

            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path ="/search" component={Searchpage}/>
            <Route path="/availableflights" component={Availableflights}/>
            <Route path="/bookingtickets"  component={Bookingticket}/>
            <Route path="/login"  component={Login}/>
            <Route path="/checkin"  component={CheckIn}/>
            <Route path="/payment"  component={PaymentMethod}/>
            <Route path="/stripe"  component={StripeButton}/>

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
