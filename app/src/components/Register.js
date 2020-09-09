import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Reaptcha from 'reaptcha';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onVerify = this.onVerify.bind(this);
    }

    onVerify = (recaptchaResponse) => {
        this.setState({
            verified: true
        });
    };

    handleSubmit(values) {
        this.props.registerUser(values)
        this.props.toggleRegister()
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row py-4 d-flex justify-content-center">
                        <div className="col-12">
                            <h4>Register</h4>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                                <Row className="form-group">
                                    <Label htmlFor="name" md={12}>Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".name" id="name" name="name"
                                            className="form-control"
                                            placeholder="Name"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(30)
                                            }} />
                                        <Errors className="text-danger" model=".name" show="touched"
                                            messages={{
                                                required: 'Required\n',
                                                minLength: 'Minimum length is 3 characters\n',
                                                maxLength: 'Maximum length is 30 characters\n'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="username" md={12}>Email</Label>
                                    <Col md={12}>
                                        <Control.text model=".username" id="username" name="username"
                                            className="form-control"
                                            placeholder="Email"
                                            validators={{
                                                required, validEmail
                                            }} />
                                        <Errors className="text-danger" model=".username" show="touched"
                                            messages={{
                                                required: 'Required\n',
                                                validEmail: 'Email is not valid\n'
                                            }}></Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="password" md={12}>Password</Label>
                                    <Col md={12}>
                                        <Control.password model=".password" id="password" name="password"
                                            className="form-control"
                                            placeholder="Password"
                                            validators={{
                                                required, minLength: minLength(6), maxLength: maxLength(12)
                                            }} />
                                        <Errors className="text-danger" model=".password" show="touched"
                                            messages={{
                                                required: 'Required\n',
                                                minLength: 'Minimum length is 6 characters\n',
                                                maxLength: 'Maximum length is 12 characters\n'
                                            }}></Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col className="text-left">
                                        <Label htmlFor="company" className="form-check-label">
                                            <Control.checkbox model=".company" id="company" name="company"
                                                className="form-group" /> Are you a business?</Label>
                                    </Col>

                                </Row>
                                <Row className="form-group">
                                    <Col className="text-left" style={{ position: 'relative' }}>
                                        <Reaptcha sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onVerify={this.onVerify} />
                                    </Col>

                                </Row>
                                <Row className="form-group">
                                    <Col className="text-right">
                                        <Button type="submit" color="primary" className="btn btn-sm" disabled={!this.state.verified}>
                                            Register
                                    </Button>
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

export default Register;   