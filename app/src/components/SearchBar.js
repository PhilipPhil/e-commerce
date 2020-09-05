import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.setFilter(values);
  }

  render() {
    return (
      <React.Fragment>


        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

          <Row className="form-group justify-content-center mb-4" style={{"backgroundColor": "rgb(0, 123, 255,0.06)" ,"border": "1px solid rgba(0,0,0,.125)", "padding": "15px", "border-radius":".05rem"}}>

          <Col className="col-12 text-center">
              <h1>Deal Alchemist <img style={{"vertical-align": "sub"}} src='/assets/images/logo.png' height="60" width="60" alt='Deal Alchemist'/></h1>
            </Col>

            <Col className="col-12 col-xl-7 py-2">
              <Control.text model=".company" id="company" name="company" placeholder="Company name..."
                className="form-control" />
            </Col>
            <Col className="col-12 col-sm-6 col-md-auto py-2">
              <Control.select model=".city" id="city" name="city" className="form-control">
                <option value="any">Any City</option>
                <option>Vancouver</option>
                <option>Toronto</option>
              </ Control.select>
            </Col>
            <Col className="col-12 col-sm-6 col-md-auto py-2">
              <Control.select model=".category" id="category" name="category" className="form-control">
                <option value="all">All Categories</option>
                <option>Food</option>
                <option>Entertainment</option>
                <option>Nightlife</option>
                <option value="Health-Fitness">Health &amp; Fitness</option>
                <option value="Beauty-Spa">Beauty &amp; Spa</option>
                <option>Rentals</option>
                <option>Other</option>
              </ Control.select>
            </Col>
            <Col className="col-xl-auto py-2 text-right">
              <Button type="submit" color="primary">Search</Button>
            </Col>
          </Row>

        </LocalForm>

      </React.Fragment>
    );


  }

}

export default SearchBar;