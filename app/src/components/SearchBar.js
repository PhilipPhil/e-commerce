import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Control, Form } from 'react-redux-form';

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


        <Form model="searchform" onSubmit={(values) => this.handleSubmit(values)}>

          <Row className="justify-content-center mb-4" 
          style={{ paddingLeft: "15px", paddingRight:"15px" }}
          >

            <Col className="col-12 text-center mb-2">
              <h1>Deal Alchemist <img style={{ "vertical-align": "sub" }} src='/assets/images/logo.png' height="60" width="60" alt='Deal Alchemist' /></h1>
            </Col>

            <Control.text model=".company" id="company" name="company" placeholder="Company name..." class="form-control col-12 col-md-5" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0, boxShadow: 'none' }} />

            <Control.select model=".city" id="city" name="city" class="form-control col-3 col-md-2" style={{ borderRadius: 0, borderRight: 0, boxShadow: 'none' }}>
              <option value="any">Any City</option>
              <option value="Any">Global Only</option>
              <option>Vancouver</option>
              <option disabled>More soon</option>
            </ Control.select>

            <Control.select model=".category" id="category" name="category" class="form-control col-3 col-md-2" style={{ borderRadius: 0, borderRight: 0, boxShadow: 'none' }}>
              <option value="any">Any Category</option>
              <option>Food</option>
              <option>Entertainment</option>
              <option>Nightlife</option>
              <option value="Health-Fitness">Health &amp; Fitness</option>
              <option value="Beauty-Spa">Beauty &amp; Spa</option>
              <option>Rentals</option>
              <option>Other</option>
            </ Control.select>

            <Control.select model=".rating" id="rating" name="rating" class="form-control col-3 col-md-2" style={{ borderRadius: 0, borderRight: 0, boxShadow: 'none' }}>
              <option value={0}>Any Rating</option>
              <option value={4}>4 and up </option>
              <option value={3}>3 and up </option>
              <option value={2}>2 and up </option>
              <option value={1}>1 and up </option>
            </ Control.select>

            <Button type="submit" color="primary" className="form-control col-3 col-md-1" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}><i class="fa fa-search" /></Button>
          </Row>
        </Form>
        <hr class="featurette-divider" />
      </React.Fragment>
    );


  }

}

export default SearchBar;