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
                <BreadcrumbItem active>{this.props.deal.company}</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>

          <div class="row featurette mb-4">
            <div class="col-md-6 text-center">
              <img class="featurette-image img-fluid mx-auto" src={this.props.deal.mainimage} alt={this.props.deal.company} style={{ "max-height": "100vh" }} />
            </div>
            <div class="col-md-6 align-self-center text-center">
              <a href={this.props.deal.website}>
                <img class="featurette-image img-fluid mx-auto" src={this.props.deal.logoimage} alt="Company Logo" style={{ "max-height": "129px", "max-width": "241px" }} />
              </a>
              <h3>{this.props.deal.company}</h3>
              <p>{this.props.deal.description}</p>
              <a href="#review-section" style={{ "text-decoration": "none", color: "#212529" }}>
                <div class="row text-center justify-content-center mb-2">

                  <StarRatings rating={this.props.deal.rating} starSpacing="2px" starRatedColor="gold" />
                  <h1>&nbsp;{this.props.deal.rating.toFixed(1)}</h1>
                </div>
              </a>
              <Button className="btn btn-outline-danger btn-sm" type="submit" color="outline-danger" outline ><i class="fa fa-heart" /></Button> &nbsp;
            <a className="btn btn-outline-secondary btn-sm" href={this.props.deal.website}>Visit {this.props.deal.company} Website <i className="fa fa-external-link" /></a>


            </div>
          </div>

          <hr class="featurette-divider" />

          <div class="row">
            <div class="col">
              <p class="small"><b>THE FINE PRINT:</b> {this.props.deal.fineprint}</p>
              <p class="small"><b>CITY:</b> {this.props.deal.city} <b>CATEGORY:</b> {this.props.deal.category}</p>
            </div>
          </div>

          <hr class="featurette-divider" />

          <div class="row">
            <div class="col text-center">
              <p>Google Maps</p>
              <p class="small"><b>ADDRESS:</b> {this.props.deal.address} </p>
            </div>
          </div>


          <hr class="featurette-divider" />

          <div class="row" id="review-section">
            <div class="col text-center">
              <Review />
            </div>
          </div>

          <div class="row" id="review-section">
            <div class="col text-center">
              Comments
          </div>
          </div>

        </div>
      </React.Fragment>

    )
  }

}


export default Deal;   