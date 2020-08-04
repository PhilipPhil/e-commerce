import React from 'react';

function About(props) {
  return (
    <React.Fragment>
      <img className="d-block w-100 top-img" src="assets/images/page4040.jpg" alt="First slide" />
      <div className="container">
        <div className="row py-4">
          <div className="col text-center">
            <h2>Deal Alchemist</h2>
            <h5>What are we about?</h5>
            <p>We are a company dedicated to getting you the best deals in your area.</p>
            <h5>Who are we?</h5>
            <p>Young staff based out of LA Cal and London.</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;   