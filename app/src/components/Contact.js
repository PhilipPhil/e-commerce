import React, { Component } from 'react';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col
} from 'reactstrap';

class Contact extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            subject: '',
            email: '',
            message: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
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
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="subject" md={2}>Subject</Label>
                                    <Col md={10}>
                                        <Input type="select" id="subject" name="subject"
                                            value={this.state.subject}
                                            onChange={this.handleInputChange}>
                                            <option value="" disabled>Please Choose</option>
                                            <option>Question</option>
                                            <option>Payment</option>
                                            <option>Technical</option>
                                            <option>Other</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type="email" id="email" name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="message" md={2}>Message</Label>
                                    <Col md={10}>
                                        <Input type="textarea" id="message" name="message"
                                            rows="12"
                                            value={this.state.message}
                                            onChange={this.handleInputChange}>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="secondary">
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