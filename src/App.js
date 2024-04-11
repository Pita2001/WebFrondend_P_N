import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";


import { Nav, Navbar, NavDropdown } from "react-bootstrap";



import AutoAdatok from './sajatosztalyok/AutoAdatok'
import AutoMarka from './sajatosztalyok/AutoMarka'
import AutoModellTorles from './sajatosztalyok/AutoModellTorles'
import AutoMarkaTorles from './sajatosztalyok/AutoMarkaTorles'



//Nikié

import MotorMarkak from './sajatosztalyok/MotorMarkak'
import MotorAdatok from './sajatosztalyok/MotorAdatok'
import MotorModellTorles from './sajatosztalyok/MotorModellTorles'
import MotorMarkaTorles from './sajatosztalyok/MotorMarkaTorles'



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Link to={"/"} className="navbar-brand">
            Autók és motorok
          </Link>
          <div className="navbar-nav mr-auto">
 

            <li className="nav-item">
              <Link to={"/AutoMarka"} className="nav-link">
                Autó márka
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/MotorMarkak"} className="nav-link">
                Motor márka
              </Link>
            </li>

              <li className="nav-item">
                <Link to={"/AutoAdatok"} className="nav-link">
                  Műszaki adatok autokról
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/MotorAdatok"} className="nav-link">
                  Műszaki adatok motorokról
                </Link>
              </li>
            
          </div>



          </Nav>
        <Nav>
            
          {showAdminBoard && (
        <NavDropdown title="Törlések" id="collasible-nav-dropdown">

        <NavDropdown.Item href="/AutoMarkaTorles">
          Autó márka törlés
          </NavDropdown.Item>

        <NavDropdown.Item href="/MotorMarkaTorles">
        Motor márka törlés
        </NavDropdown.Item>
        
        <NavDropdown.Item href="/AutoModellTorles">
          Autó modellek törlése
        </NavDropdown.Item>

        <NavDropdown.Item href="/MotorModellTorles">
        Motor modellek törlése
        </NavDropdown.Item>
      </NavDropdown>
      )}
        
         


          
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
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
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
           


            <Route path="/AutoAdatok" component={AutoAdatok} />
            <Route path="/AutoMarka" component={AutoMarka} />
            <Route path="/AutoModellTorles" component={AutoModellTorles} />
            <Route path="/AutoMarkaTorles" component={AutoMarkaTorles} />

            

            <Route path="/MotorMarkak" component={MotorMarkak} />
            <Route path="/MotorAdatok" component={MotorAdatok} />
            <Route path="/MotorModellTorles" component={MotorModellTorles} />
            <Route path="/MotorMarkaTorles" component={MotorMarkaTorles} />
            

            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
