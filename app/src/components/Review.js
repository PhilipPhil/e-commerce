import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class Review extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    if (this.props.review) {
      if(values.comment){
        this.props.editReview(this.props.dealId, values.rating, values.comment, this.props.review._id)
      } else {
        this.props.editReview(this.props.dealId, values.rating, '', this.props.review._id)
      }
    }
    else {
      this.props.postReview(this.props.dealId, values.rating, values.comment)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row py-2 d-flex justify-content-center">
            <div className="col-12 col-md-8">
              <h4>Reviews</h4>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                <Row className="form-group">
                  <Label htmlFor="rating" md={12} className="d-flex justify-content-start">Rating</Label>
                  <Col md={12}>

                    <Control.select model=".rating" id="rating" name="rating" className="form-control" validators={{ required }}>
                      <option></option>
                      <option value="5" style={{ "color": "black" }}>5 ⭐⭐⭐⭐⭐</option>
                      <option value="4" style={{ "color": "black" }}>4 ⭐⭐⭐⭐</option>
                      <option value="3" style={{ "color": "black" }}>3 ⭐⭐⭐</option>
                      <option value="2" style={{ "color": "black" }}>2 ⭐⭐</option>
                      <option value="1" style={{ "color": "black" }}>1 ⭐</option>
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
                      className="form-control" rows="2" validators={{ maxLength: maxLength(10000) }} />
                    <Errors className="text-danger" model=".comment" show="touched"
                      messages={{
                        maxLength: 'Too long\n'
                      }}></Errors>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col className="d-flex justify-content-end">
                    {this.props.review
                      ?
                      <React.Fragment>
                        <Button onClick={() => {this.props.deleteReview(this.props.review._id)}} color="secondary" className="btn btn-sm">Remove</Button>
                        &nbsp;
                        <Button type="submit" color="primary" className="btn btn-sm">Edit</Button>
                      </React.Fragment>
                      :
                      <Button type="submit" color="primary" className="btn btn-sm">Post</Button>
                    }
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