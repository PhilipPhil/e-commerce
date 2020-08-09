import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Link } from 'react-router-dom';

import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import Review from './Review'


class Deal extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <React.Fragment>

      <div className="container py-2">

        <div class="row">
          <div class="col" id="breadcrumb-col" >
            <Breadcrumb>
              <BreadcrumbItem><Link exact to="/">Deals</Link></BreadcrumbItem>
              <BreadcrumbItem active>{this.props.item.company}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        <div class="row featurette mb-4">
          <div class="col-md-6 text-center">
            <img class="featurette-image img-fluid mx-auto" src={this.props.item.mainimage} alt={this.props.item.company} style={{ "max-height": "100vh" }} />
          </div>
          <div class="col-md-6 align-self-center text-center">
            <img class="featurette-image img-fluid mx-auto" src={this.props.item.logoimage} alt="Company Logo" style={{ "max-height": "129px", "max-width": "241px" }} />
            <h3>{this.props.item.company}</h3>
            <p>{this.props.item.description}</p>
            <div class="row text-center justify-content-center mb-2">
            
              <StarRatings rating={this.props.item.rating} starSpacing="2px" starRatedColor="gold"/>
              <h1>&nbsp;{this.props.item.rating.toFixed(1)}</h1>
            </div>

            <Button className="btn btn-outline-danger btn-sm" type="submit" color="outline-danger" outline ><i class="fa fa-heart" /></Button> &nbsp;
            <a className="btn btn-outline-secondary btn-sm" href={this.props.item.website}>Visit {this.props.item.company} Website <i className="fa fa-external-link" /></a>


          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row">
          <div class="col">
            <p class="small"><b>THE FINE PRINT:</b> {this.props.item.fineprint}</p>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row">
          <div class="col text-center">
            <p>Google Maps</p>
          </div>
        </div>


        <hr class="featurette-divider" />

        <div class="row">
          <div class="col text-center">
            <Review />
          </div>
        </div>

      </div>
    </React.Fragment>

    )}

}
  

export default Deal;   