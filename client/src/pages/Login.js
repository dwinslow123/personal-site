import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, Col, Form, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
    }
    this.handleSetUserName = this.handleSetUserName.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.loginWithUser = this.loginWithUser.bind(this);
  }
  handleSetUserName(e) {
    this.setState({ userName: e.target.value });
  }
  handleSetPassword(e) {
    this.setState({ password: e.target.value });
  }
  loginWithUser(e) {
    e.preventDefault();
    const user = { username: this.state.userName, password: this.state.password };
    axios.post('http://localhost:3030/login', user)
      .then((data) => {
        localStorage.setItem('uuID', data.data._id);
        setTimeout(() => {
          window.location = '/posts';
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalEmail" validationState="success">
          <Col componentClass={ControlLabel} sm={2}>
            User Name
          </Col>
          <Col sm={10}>
            <FormControl 
              className="form-control"
              onChange={this.handleSetUserName}
              placeholder="User Name"
              type="text"
              value={this.state.userName}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword" validationState="success">
          <Col componentClass={ControlLabel} sm={2}>
          Password
          </Col>
          <Col sm={10}>
            <FormControl
              className="form-control"
              onChange={this.handleSetPassword}
              placeholder="password"
              type="password"
              value={this.state.password}
            />
          </Col>
          <Button bsSize="large" type="submit" onClick={this.loginWithUser}>Login</Button>
          <br />
          <Link to="/create-user">No account? Sign up here!</Link>
        </FormGroup>
      </Form>
    )
  }
}
