import React from 'react';
import { Link } from 'react-router-dom';


function Error(props) {
  return (
    <React.Fragment>
      <img className="d-block w-100 top-img" src="assets/images/error.gif" alt="First slide" />
      <div className="container">
        <div className="row py-4 mb-4">
          <div className="col text-center">
            <h1>Oops!</h1>
            <h4>{props.errMess}</h4>
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

export default Error;   