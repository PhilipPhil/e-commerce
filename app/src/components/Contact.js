import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import Reaptcha from 'reaptcha';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => val && !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
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
        if (values.name.length > 0 &&
            values.subject.length > 0 &&
            values.email.length > 0 &&
            values.phone.length > 0 &&
            values.message.length > 0) {
            this.props.postEmailForm(values);
            this.props.resetEmailForm();
        } else {
            alert('Failed to send\nError: Empty elements')
        }
    }

    render() {
        return (
            <React.Fragment>
                <img className="d-block w-100 top-img" src="assets/images/contactus.gif" alt="Contact Us" />
                <div className="container">
                    <div className="row py-4 d-flex justify-content-center">
                        <div className="col-12 col-md-7 text-center mb-2">
                            <h2>Contact Us</h2>
                        </div>
                        <div className="col-12 col-md-7">
                            <Form model="emailform" onSubmit={(values) => this.handleSubmit(values)}>

                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Name</Label>
                                    <Col md={10}>
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
                                    <Label htmlFor="subject" md={2}>Subject</Label>
                                    <Col md={10}>
                                        <Control.select model=".subject" type="select" id="subject" name="subject"
                                            className="form-control"
                                            placeholder="Please choose"
                                            validators={{
                                                required
                                            }}>
                                            <option></option>
                                            <option>Make a post</option>
                                            <option>Technical</option>
                                            <option>Other</option>
                                        </Control.select>
                                        <Errors className="text-danger" model=".subject" show="touched"
                                            messages={{
                                                required: 'Required\n'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Control.text model=".email" id="email" name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            validators={{
                                                required, validEmail
                                            }} />
                                        <Errors className="text-danger" model=".email" show="touched"
                                            messages={{
                                                required: 'Required\n',
                                                validEmail: 'Email is not valid\n'
                                            }}></Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="phone" md={2}>Phone</Label>
                                    <Col md={10}>
                                        <Control.text model=".phone" id="phone" name="phone"
                                            className="form-control"
                                            placeholder="Phone number"
                                            validators={{
                                                required,
                                                isNumber,
                                                minLength: minLength(10),
                                                maxLength: maxLength(15)
                                            }} />
                                        <Errors className="text-danger" model=".phone" show="touched"
                                            messages={{
                                                required: 'Required\n',
                                                isNumber: 'Numbers only\n',
                                                minLength: 'Minimum 10 digit phone number\n',
                                                maxLength: 'Maximum 15 digits phone number\n'
                                            }}></Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Message</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="12"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(10), maxLength: maxLength(10000)
                                            }} />
                                        <Errors className="text-danger" model=".message" show="touched"
                                            messages={{
                                                required: 'Required\n',
                                                minLength: 'Message too short\n',
                                                maxLength: 'Message too long\n'
                                            }}>
                                        </Errors>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col className="text-lg-left offset-md-2">
                                        <Reaptcha sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onVerify={this.onVerify} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col className="text-right">
                                        <Button type="submit" color="primary" disabled={!this.state.verified}>
                                            Send
                                    </Button>
                                    </Col>
                                </Row>

                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );


    }

}

export default Contact;   