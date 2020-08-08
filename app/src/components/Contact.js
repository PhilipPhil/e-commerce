import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

class Contact extends Component {


    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
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
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                
                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".name" type="text" id="name" name="name"
                                            className="form-control"
                                            placeholder="Name"/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="subject" md={2}>Subject</Label>
                                    <Col md={10}>
                                        <Control.select model=".subject" type="select" id="subject" name="subject"
                                            className="form-control">
                                            <option value="" disabled>Please choose</option>
                                            <option>Question</option>
                                            <option>Payment</option>
                                            <option>Technical</option>
                                            <option>Other</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Control.text model=".email" type="text" id="email" name="email"
                                            className="form-control"
                                            placeholder="Email" />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Message</Label>
                                    <Col md={10}>
                                        <Control.text model=".message" type="textarea" id="message" name="message"
                                            rows="12"
                                            className="form-control" />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="outline-secondary">
                                            Send
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

export default Contact;   