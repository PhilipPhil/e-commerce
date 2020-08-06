import React from 'react';

function Deal(props) {
  return (
    <React.Fragment>

      <div className="container">

        <div class="row featurette py-5">
          <div class="col-md-6">
            <img class="featurette-image img-fluid mx-auto" src="../assets/images/PintMainImage.jpg" alt="Generic placeholder image"/>
          </div>
          <div class="col-md-6 align-self-center text-center">
            <img class="featurette-image img-fluid mx-auto" src="../assets/images/Pintlogo.jpg" alt="Generic placeholder image" />
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


        <p>Review Section</p>

      </div>
    </React.Fragment>
  );
}

export default Deal;   