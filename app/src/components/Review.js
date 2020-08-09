import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Review extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row py-2 d-flex justify-content-center">
            <div className="col-12 col-md-8">
              <h4>Review</h4>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                <Row className="form-group">
                  <Label htmlFor="rating" md={12} className="d-flex justify-content-start">Rating</Label>
                  <Col md={12}>
                    <Control.select model=".rating" id="rating" name="rating" className="form-control" validators={{ required }}>
                      <option>⭐⭐⭐⭐⭐</option>
                      <option>⭐⭐⭐⭐</option>
                      <option>⭐⭐⭐</option>
                      <option>⭐⭐</option>
                      <option>⭐</option>
                    </ Control.select>
                    <Errors className="text-danger" model=".rating" show="touched"
                      messages={{
                        required: 'Required\n'
                      }}>
                    </Errors>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="comment" md={12} className="d-flex justify-content-start">Comment</Label>
                  <Col md={12}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                      className="form-control" />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col className="d-flex justify-content-end">
                    <Button type="submit" color="outline-secondary" className="btn btn-sm">POST</Button>
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

export default Review;   