/* eslint-disable */
import React, { Component } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';
import './GlobalVariable';
import { Redirect } from 'react-router';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Dropdown,
  Select,
} from "semantic-ui-react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      userType: "",
      firstName: "",
      lastName: "",
      password: "",
      emailId: "",
      contact: "",
      errors: {},
    };
    this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.loginEmp = this.loginEmp.bind(this);
    this.cancel = this.cancel.bind(this);
    this.home = this.home.bind(this);
    this.signUp = this.signUp.bind(this);
    
  }

  changeUserIdHandler = (event) => {
    this.setState({ userId: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ userType: event });
    console.log(event);
  };

  loginEmp = (e) => {
    e.preventDefault();
    if (this.validate()) {
      let employee = {
        userId: this.state.userId,
        userType: this.state.userType,
        password: this.state.password,
      };
      console.log("employee => " + JSON.stringify(employee));

      // step 5
      EmployeeService.login(employee).then((res) => {
        let s = res.data;
          global.sessionId=s.sessionId;
            console.log(s);
            let ss=s.user;
            global.userId=ss.userId;
            global.userType=ss.userType;
            global.firstName=ss.firstName;
            global.lastName=ss.lastName;
            global.contact=ss.contact;
            console.log('sessonId'+s.sessionId);
        if (s.booleanMsg) {
          const ut = this.state.userType;

          if (this.state.userType === "Candidate") {
            this.props.history.push("/LandingPage");
            alert("Login Successful");
          } else if (this.state.userType === "RMG") {
            this.props.history.push("/RMGHomeComponent");
            alert("Login Successful");
          } else if (this.state.userType === "Panelist") {
            this.props.history.push("/EmployeeHomeComponent");
            alert("Login Successful");
          } else {
            this.props.history.push("/POCHomeComponent");
            alert("Login Successful");
          }
        } else {
          this.state.err = 1;
          this.state.userId = "";
          this.state.password = "";
          this.state.userType = "";
          this.props.history.push("/login");
          alert("Login Failed");
        }
      });
    }
  };

  selectUserType = (e) => {
    this.setState({ userType: e.target.value });
  };

  cancel() {
    // this.props.history.push('/employees');
    this.setState.userId = "";
    this.setState.password = "";
    this.setState.userType = "";
  }

  validate() {
    let input = { userId: this.state.userId };
    let errors = {};
    let isValid = true;

    if (typeof input["userId"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["userId"])) {
        isValid = false;
        errors["userId"] = "Please enter valid email address.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  Login = (props) => {
    return <h2> {props.message} </h2>;
  };


  signUp = (e) => {
    e.preventDefault();
    this.props.history.push('/signup');
}

home = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
}

  render() {
    const err = this.state.err;
    return (
      <div >
                  <Navbar bg="dark" variant="dark" fixed="top">
                    <Container>
                      <img src="/images/logosymbol.png" width="30" height="30"/>
                        <Navbar.Brand href="#home"> Recruit Right</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>|</Nav.Link>
                            <Nav.Link onClick={this.home}>Home</Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav className="me-auto">
                            <Nav.Link>|</Nav.Link>
                            <Nav.Link onClick={this.signUp}>Sign Up</Nav.Link>
                        </Nav>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/logo.png" /> Log-In
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={this.state.userId}
                onChange={this.changeUserIdHandler}
                required="required"
              />
              <div className="text-danger">{this.state.errors.userId}</div>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.changePasswordHandler}
                required="required"
              />
              {/*<Select
              fluid
                placeholder='Choose UserType'
                selection
                options={UserTypeOptions}
                onChange={this.selectUserType.bind(this)} required="required"
              />*/}
              <div>
                <select
                  class="form-select"
                  value={this.state.userType}
                  onChange={this.selectUserType.bind(this)}
                  required="required"
                >
                  <option selected disabled value="">
                    Choose Option
                  </option>
                  <option>Candidate</option>
                  <option>RMG</option>
                  <option>Account POC</option>
                  <option>Panelist</option>
                </select>
              </div>
              <br></br>
              <Button
                color="teal"
                fluid
                size="large"
                disabled={!this.state.userId || !this.state.password || !this.state.userType}
                onClick={this.loginEmp}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Forgot Password?   <a href="/ForgotPassword">Click Here</a>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

export default Login;
