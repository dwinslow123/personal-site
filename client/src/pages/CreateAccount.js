import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, Form, Col, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Login.css";

export default class CreateAccount extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleSetusername = this.handleSetusername.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  handleSetusername(e) {
    this.setState({username: e.target.value});
  }
  handleSetPassword(e) {
    this.setState({password: e.target.value});
  }
  createUser(e) {
    e.preventDefault();
    const userToSave = {username: this.state.username, password: this.state.password};
    axios.post('http://localhost:3030/new-user', userToSave)
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
              onChange={this.handleSetusername}
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
          <Button bsSize="large" type="submit" onClick={this.createUser}>Login</Button>
          <br /> 
          <Link to="/">Already a member? Login here.</Link>
        </FormGroup>
      </Form>
    )
  }
}