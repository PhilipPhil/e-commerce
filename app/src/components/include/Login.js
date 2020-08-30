import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    this.props.loginUser(values);
    // alert('Current State is: ' + JSON.stringify(values));
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row py-2 d-flex justify-content-center">
            <div className="col-12">
              <h4>Login</h4>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                <Row className="form-group">
                  <Label htmlFor="username" md={12}>Email</Label>
                  <Col md={12}>
                    <Control.text model=".username" id="username" name="username"
                      className="form-control"
                      placeholder="Email" />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="password" md={12}>Password</Label>
                  <Col md={12}>
                    <Control.password model=".password" id="password" name="password"
                      className="form-control"
                      placeholder="Password" />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col className="d-flex justify-content-end">
                    <Button type="submit" color="primary" className="btn btn-sm">Login</Button>
                  </Col>
                </Row>

              </LocalForm>
            </div>
          </div>
        </div>
      </React.Fragment>
    );


  }

}

export default Login;   