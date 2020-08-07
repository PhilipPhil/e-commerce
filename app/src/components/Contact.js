import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';

class Contact extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            subject: '',
            email: '',
            message: '',
            errors: {
                name: '',
                subject: '',
                email: '',
                message: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validate({ name, subject, email, message }) {
        const errors = {
            name: '',
            subject: '',
            email: '',
            message: ''
        }

        if ( name.length < 3) {
            errors.name = 'Name is too short.'
        } else if (name.length > 50) {
            errors.name = 'Name is too long.'
        }

        if (subject.length < 1) {
            errors.subject = 'Select a subject.'
        }

        if (message.length < 50) {
            errors.message = 'Message too short.'
        } else if(message.length > 5000) {
            errors.message = 'Message too long.'
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        if (!emailPattern.test(email)) {
            errors.email = 'Email is not valid.'
        }

        return errors
    }


    handleSubmit(event) {        

        event.preventDefault();

        const errors = this.validate(this.state)
        this.setState({
            errors: errors
        })

        if(errors.name.length > 0 || errors.subject.length > 0 || errors.message.length > 0 || errors.email.length > 0){
            return
        }

        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state)); 
    }

    render() {
        const errors = this.state.errors
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row py-4 d-flex justify-content-center">
                        <div className="col-12 col-md-7 text-center mb-2">
                            <h2>Contact Us</h2>
                        </div>
                        <div className="col-12 col-md-7">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="name" md={2}>Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="name" name="name"
                                            placeholder="Name"
                                            value={this.state.name}
                                            invalid={errors.name !== ''}
                                            onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.name}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="subject" md={2}>Subject</Label>
                                    <Col md={10}>
                                        <Input type="select" id="subject" name="subject"
                                            value={this.state.subject}
                                            invalid={errors.subject !== ''}
                                            onChange={this.handleInputChange}>
                                            <option value="" disabled>Please choose</option>
                                            <option>Question</option>
                                            <option>Payment</option>
                                            <option>Technical</option>
                                            <option>Other</option>
                                        </Input>
                                        <FormFeedback>{errors.subject}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type="text" id="email" name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            invalid={errors.email !== ''}
                                            onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.email}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="message" md={2}>Message</Label>
                                    <Col md={10}>
                                        <Input type="textarea" id="message" name="message"
                                            rows="12"
                                            value={this.state.message}
                                            invalid={errors.message !== ''}
                                            onChange={this.handleInputChange}>
                                        </Input>
                                        <FormFeedback>{errors.message}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="outline-secondary">
                                            Send
                                    </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );


    }

}

export default Contact;   