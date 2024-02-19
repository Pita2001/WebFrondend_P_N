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

import Admin from './sajatosztalyok/Admin'
import Kereses from "./sajatosztalyok/Kereses"
import Proba from './sajatosztalyok/Proba'
import AdminProba from './sajatosztalyok/AdminProba'
import Marka from './sajatosztalyok/Marka'
import Diagramfilm from './sajatosztalyok/Diagramfilm'
import Torles from './sajatosztalyok/Torles'
import Torles_marka from './sajatosztalyok/Torles_marka'


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
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Proba"} className="nav-link">
                Proba
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/Marka"} className="nav-link">
                Marka
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
                <Link to={"/Admin"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}

            {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/Torles"} className="nav-link">
                Torles
              </Link>
            </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_marka"} className="nav-link">
                Torles_marka
                </Link>
              </li>
              )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/AdminProba"} className="nav-link">
                  AdminProba
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Diagramfilm"} className="nav-link">
                  Diagramfilm
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
           
            <Route path="/Admin" component={Admin} />
            <Route path="/Kereses" component={Kereses} />
            <Route path="/Proba" component={Proba} />
            <Route path="/AdminProba" component={AdminProba} />
            <Route path="/Marka" component={Marka} />
            <Route path="/Diagramfilm" component={Diagramfilm} />
            <Route path="/Torles" component={Torles} />
            <Route path="/Torles_marka" component={Torles_marka} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
