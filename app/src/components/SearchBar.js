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
    console.log('Current State is: ' + JSON.stringify(values));
    alert('Current State is: ' + JSON.stringify(values));
  }

  render() {
    return (
      <React.Fragment>


        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

          <Row className="form-group justify-content-center mb-4" style={{"border": "2px solid #2E2E2E", "padding": "15px", "border-radius":"15px"}}>

            <Col className="col-12 col-md-7 py-2">
              <Control.text model=".name" id="name" name="name" placeholder="Search.."
                className="form-control" />
            </Col>
            <Col className="col-auto py-2">
              <Control.select model=".city" id="city" name="city" className="form-control">
                <option>Any City</option>
                <option>Toronto</option>
                <option>Montreal</option>
                <option>Vancouver</option>
              </ Control.select>
            </Col>
            <Col className="col-auto py-2">
              <Control.select model=".category" id="category" name="category" className="form-control">
                <option>All Categories</option>
                <option>Food</option>
                <option>Entertainment</option>
                <option>Night Life</option>
                <option>Fitness</option>
                <option>Recreation</option>
              </ Control.select>
            </Col>
            <Col className="col-auto text-right py-2">
              <Button type="submit" color="primary">Search</Button>
            </Col>
          </Row>

        </LocalForm>

      </React.Fragment>
    );


  }

}

export default SearchBar;