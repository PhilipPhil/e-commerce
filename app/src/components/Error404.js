import React from 'react';
import { Link } from 'react-router-dom';


function Error404(props) {
  return (
    <React.Fragment>
      <img className="d-block w-100 top-img" src="assets/images/1200x400.jpg" alt="First slide" />
      <div className="container">
        <div className="row py-4">
          <div className="col text-center">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <p>Sorry, an error has occured, Requested page not found!</p>
            <div>
              <Link to='/'><i class="fa fa-home" aria-hidden="true" /> Take Me Home</Link>
                &nbsp; &middot; &nbsp;
              <Link to='/contact'><i class="fa fa-envelope" /> Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Error404;   