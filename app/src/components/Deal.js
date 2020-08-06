import React from 'react';
import StarRatings from 'react-star-ratings';

function Deal(props) {
  return (
    <React.Fragment>

      <div className="container py-5">

        <div class="row featurette">
          <div class="col-md-6">
            <img class="featurette-image img-fluid mx-auto" src={props.item.mainimage} alt={props.item.company} />
          </div>
          <div class="col-md-6 align-self-center text-center">
            <img class="featurette-image img-fluid mx-auto" src={props.item.logoimage} alt="Company Logo" />
            <h3>{props.item.company}</h3>
            <p class="lead">{props.item.shortdescription}</p>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <p class="small">{props.item.longdescription}</p>
          </div>
        </div>

        <div class="row">
          <div class="col text-center">
            <p>Google Maps</p>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row">
          <div class="col text-center">
            <StarRatings rating={props.item.rating} starSpacing="2px" />
          </div>

        </div>



      </div>
    </React.Fragment>
  );
}

export default Deal;   