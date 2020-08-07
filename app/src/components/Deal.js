import React from 'react';
import StarRatings from 'react-star-ratings';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Link } from 'react-router-dom';

import {
  Card, CardImg, CardImgOverlay,
  CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';

function Deal(props) {
  return (
    <React.Fragment>

      <div className="container py-2">
        <div class="row">
          <div class="col" id="breadcrumb-col" >
            <Breadcrumb>
              <BreadcrumbItem><Link exact to="/">Deals</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.item.company}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        <div class="row featurette mb-4">
          <div class="col-md-6 text-center">
            <img class="featurette-image img-fluid mx-auto" src={props.item.mainimage} alt={props.item.company} style={{ "max-height": "100vh" }} />
          </div>
          <div class="col-md-6 align-self-center text-center">
            <img class="featurette-image img-fluid mx-auto" src={props.item.logoimage} alt="Company Logo" style={{ "max-height": "129px", "max-width": "241px" }} />
            <h3>{props.item.company}</h3>
            <p>{props.item.description}</p>
            <div class="row text-center justify-content-center mb-2">
              <StarRatings rating={props.item.rating} starSpacing="2px" />
              <h1>&nbsp;{props.item.rating}</h1>
            </div>
            <a className="btn btn-outline-secondary btn-sm" href={props.item.website}>Visit {props.item.company} Website <i className="fa fa-external-link" /></a>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row">
          <div class="col">
            <p class="small"><b>THE FINE PRINT:</b> {props.item.fineprint}</p>
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
            <p>Reviews</p>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Deal;   