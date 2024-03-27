import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div id="kezdoSav" className="container">
        <header id="kezdoKocka" className="jumbotron">
          <h3>Üdvözöllek a <span class="OldalNev">{"japán autók és motorok"}</span> világában! 😄</h3>
        </header>
      </div>
    );
  }
}
