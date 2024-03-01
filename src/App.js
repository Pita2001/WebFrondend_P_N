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



import AdminProba from './sajatosztalyok/AdminProba'
import Marka from './sajatosztalyok/Marka'
import Diagramfilm from './sajatosztalyok/Diagramfilm'
import Torles from './sajatosztalyok/Torles'
import Torles_marka from './sajatosztalyok/Torles_marka'


//Nikié

import Marka_2 from './sajatosztalyok/Marka_2'
import Diagram_film_N from "./sajatosztalyok/Diagram_film_N";
import ProbaAdmin_2 from './sajatosztalyok/ProbaAdmin_2'
import Torles_2 from './sajatosztalyok/Torles_2'
import Torles_marka_2 from './sajatosztalyok/Torles_marka_2'



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
            Záródoga
          </Link>
          <div className="navbar-nav mr-auto">
 

            <li className="nav-item">
              <Link to={"/Marka"} className="nav-link">
                Autó márka
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Marka_2"} className="nav-link">
                Motor márka
              </Link>
            </li>

            

                     

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator
                </Link>
              </li>
            )}



            {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/Torles"} className="nav-link">
                Autó modell törlés
              </Link>
            </li>
            )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/Torles_2"} className="nav-link">
                Motor modell törlés
              </Link>
            </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_marka"} className="nav-link">
                Autó márka törlés
                </Link>
              </li>
              )}

          {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_marka_2"} className="nav-link">
                Motor márka törlés
                </Link>
              </li>
              )}  

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/AdminProba"} className="nav-link">
                  Műszaki adatok autokról
                </Link>
              </li>
            )}

        {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/ProbaAdmin_2"} className="nav-link">
                  Műszaki adatok motorokról
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Diagramfilm"} className="nav-link">
                  Auto diagram
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Diagram_film_N"} className="nav-link">
                  Motor diagram
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
        
         
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
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
           


            <Route path="/AdminProba" component={AdminProba} />
            <Route path="/Marka" component={Marka} />
            <Route path="/Diagramfilm" component={Diagramfilm} />
            <Route path="/Torles" component={Torles} />
            <Route path="/Torles_marka" component={Torles_marka} />


            <Route path="/Marka_2" component={Marka_2} />
            <Route path="/Diagram_film_N" component={Diagram_film_N} />
            <Route path="/ProbaAdmin_2" component={ProbaAdmin_2} />
            <Route path="/Torles_2" component={Torles_2} />
            <Route path="/Torles_marka_2" component={Torles_marka_2} />
            


          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
